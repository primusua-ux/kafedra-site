-- ============================================================
-- Kafedra ZVI — початкова схема бази даних Supabase
-- ============================================================
-- Виконуйте у Supabase → SQL Editor → New query → Paste → Run.
-- Схема створює:
--   1) enum типів (role, status)
--   2) таблицю profiles (зв'язана з auth.users)
--   3) trigger на створення profile при signUp
--   4) RLS-політики (кожен бачить свій профіль, admin — усі)
--   5) таблицю materials для методичних матеріалів
--   6) storage bucket 'materials' + політики доступу

-- ========== ENUMS ==========
do $$ begin
  create type public.user_role as enum ('student', 'teacher', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.user_status as enum ('pending', 'approved', 'rejected');
exception when duplicate_object then null; end $$;

-- ========== PROFILES ==========
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  role        public.user_role   not null default 'student',
  status      public.user_status not null default 'pending',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists profiles_status_idx on public.profiles(status);
create index if not exists profiles_role_idx   on public.profiles(role);

-- ========== TRIGGER: auto-create profile on signup ==========
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  req_role public.user_role;
begin
  -- Беремо роль із user_metadata.requested_role, якщо вона student/teacher
  req_role := case lower(coalesce(new.raw_user_meta_data->>'requested_role', 'student'))
                when 'teacher' then 'teacher'::public.user_role
                else 'student'::public.user_role
              end;

  insert into public.profiles (id, email, full_name, role, status)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    req_role,
    'pending'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ========== RLS: profiles ==========
alter table public.profiles enable row level security;

drop policy if exists "profiles_self_read"      on public.profiles;
drop policy if exists "profiles_self_update"    on public.profiles;
drop policy if exists "profiles_admin_read_all" on public.profiles;
drop policy if exists "profiles_admin_write"    on public.profiles;

-- Користувач бачить/оновлює тільки свій профіль (крім полів role/status — див. тригер нижче)
create policy "profiles_self_read"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_self_update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Адмін бачить усіх і може редагувати
create policy "profiles_admin_read_all"
  on public.profiles for select
  using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin' and p.status = 'approved'
  ));

create policy "profiles_admin_write"
  on public.profiles for update
  using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin' and p.status = 'approved'
  ));

-- Захищаємо role/status від самостійної зміни користувачем
create or replace function public.lock_profile_role_status()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  caller_is_admin boolean;
begin
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin' and p.status = 'approved'
  ) into caller_is_admin;

  if not caller_is_admin then
    new.role   := old.role;
    new.status := old.status;
  end if;

  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_lock_role_status on public.profiles;
create trigger profiles_lock_role_status
  before update on public.profiles
  for each row execute function public.lock_profile_role_status();

-- ========== MATERIALS ==========
create table if not exists public.materials (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text,
  category     text,                  -- напр. 'lecture', 'methodical', 'literature'
  discipline   text,                  -- назва дисципліни
  file_path    text not null,         -- шлях у storage bucket 'materials'
  uploaded_by  uuid references public.profiles(id) on delete set null,
  visible_to   public.user_role not null default 'student', -- мінімальна роль для перегляду
  created_at   timestamptz not null default now()
);

alter table public.materials enable row level security;

drop policy if exists "materials_read_approved" on public.materials;
drop policy if exists "materials_teacher_write" on public.materials;
drop policy if exists "materials_teacher_update" on public.materials;
drop policy if exists "materials_teacher_delete" on public.materials;

-- Читати може будь-який approved користувач із відповідною роллю
create policy "materials_read_approved"
  on public.materials for select
  using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.status = 'approved'
      and (
        p.role = 'admin'
        or p.role = 'teacher'
        or (p.role = 'student' and materials.visible_to = 'student')
      )
  ));

-- Завантажувати можуть teacher/admin
create policy "materials_teacher_write"
  on public.materials for insert
  with check (exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.status = 'approved'
      and p.role in ('teacher', 'admin')
  ));

create policy "materials_teacher_update"
  on public.materials for update
  using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.status = 'approved'
      and (p.role = 'admin' or (p.role = 'teacher' and materials.uploaded_by = auth.uid()))
  ));

create policy "materials_teacher_delete"
  on public.materials for delete
  using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.status = 'approved'
      and (p.role = 'admin' or (p.role = 'teacher' and materials.uploaded_by = auth.uid()))
  ));

-- ========== STORAGE: materials bucket ==========
-- Виконати ОКРЕМО у Supabase → Storage → New bucket → name='materials', Public=false
-- Далі RLS-політики на storage.objects:

-- Читати файли — approved користувачі
drop policy if exists "storage_materials_read" on storage.objects;
create policy "storage_materials_read"
  on storage.objects for select
  using (
    bucket_id = 'materials'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.status = 'approved'
    )
  );

-- Завантажувати — тільки teacher/admin
drop policy if exists "storage_materials_upload" on storage.objects;
create policy "storage_materials_upload"
  on storage.objects for insert
  with check (
    bucket_id = 'materials'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.status = 'approved'
        and p.role in ('teacher', 'admin')
    )
  );

-- Видалення — teacher (свої) / admin
drop policy if exists "storage_materials_delete" on storage.objects;
create policy "storage_materials_delete"
  on storage.objects for delete
  using (
    bucket_id = 'materials'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.status = 'approved'
        and (p.role = 'admin' or p.role = 'teacher')
    )
  );

-- ============================================================
-- ПІСЛЯ ВИКОНАННЯ:
-- 1) Створіть першого адміна: зареєструйтесь через /register,
--    потім у SQL Editor виконайте:
--       update public.profiles
--          set role = 'admin', status = 'approved'
--        where email = 'your-email@example.com';
-- 2) Створіть bucket 'materials' (Private) у Storage вручну.
-- ============================================================

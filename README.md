# Сайт кафедри військової підготовки ЖВІ ім. С.П. Корольова

Корпоративний сайт кафедри військової підготовки за програмою підготовки офіцерів запасу Житомирського військового інституту імені С.П. Корольова.

## Стек

- **Next.js 16** (App Router, React 19, TypeScript)
- **TailwindCSS 4**
- **Supabase** — PostgreSQL + Auth + Storage (безкоштовний тариф)
- **Vercel** — хостинг (безкоштовний тариф)

## Структура розділів

| Розділ | URL | Доступ |
| --- | --- | --- |
| Головна | `/` | публічний |
| Про кафедру | `/about` | публічний |
| Вступнику | `/applicants` | публічний |
| Студенту | `/students` | `student` / `teacher` / `admin` |
| Викладачам | `/teachers` | `teacher` / `admin` |
| Адміністрування | `/admin` | `admin` |
| Вхід / Реєстрація | `/login`, `/register` | публічний |
| Очікування підтвердження | `/pending` | авторизовані зі `status = pending` |

## Швидкий старт (локально)

```bash
cd kafedra-site
npm install
cp .env.example .env.local
# Далі заповніть .env.local ключами зі свого Supabase-проекту
npm run dev
```

Відкрийте http://localhost:3000

## Налаштування Supabase (одноразово)

1. Створіть проєкт на https://supabase.com (регіон — **Central EU (Frankfurt)**).
2. У Dashboard → **Project Settings → API**:
   - скопіюйте `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - скопіюйте `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Вставте обидва значення у файл `.env.local`.
4. У Dashboard → **SQL Editor → New query** — вставте вміст файлу `supabase/schema.sql` і виконайте (`Run`).
5. У Dashboard → **Storage → New bucket**:
   - Name: `materials`
   - Public bucket: **вимкнено** (Private)
6. У Dashboard → **Authentication → Providers → Email**:
   - увімкніть "Confirm email" (рекомендовано) — підтвердження e-mail.
   - або вимкніть для швидкого тестування.

### Створення першого адміністратора

1. Запустіть `npm run dev`, перейдіть на `/register`, зареєструйтесь.
2. У Supabase → SQL Editor виконайте:
   ```sql
   update public.profiles
      set role = 'admin', status = 'approved'
    where email = 'ваш-email@домен';
   ```
3. Вийдіть і увійдіть знову — у шапці з’явиться кнопка **Адмін**.

Усі наступні користувачі реєструються зі статусом `pending`, і ви їх підтверджуєте через `/admin`.

## Деплой на Vercel (безкоштовно)

1. Ініціалізуйте git та запуште у GitHub:
   ```bash
   git init
   git add .
   git commit -m "initial"
   git branch -M main
   git remote add origin https://github.com/USERNAME/kafedra-site.git
   git push -u origin main
   ```
2. Зайдіть на https://vercel.com → **Add New → Project** → імпортуйте репозиторій.
3. У налаштуваннях Vercel → **Environment Variables** додайте:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy**. Отримаєте безкоштовний домен виду `kafedra-site.vercel.app`.

Будь-який `git push` у `main` автоматично передеплоює сайт.

## Структура проєкту

```
kafedra-site/
├── src/
│   ├── app/
│   │   ├── (auth)/            # login, register, Server Actions
│   │   ├── about/             # Про кафедру
│   │   ├── applicants/        # Вступнику
│   │   ├── students/          # Студенту (захищений)
│   │   ├── teachers/          # Викладачам (захищений)
│   │   ├── admin/             # Адмін-панель
│   │   ├── pending/           # Екран очікування
│   │   ├── layout.tsx         # Кореневий лейаут
│   │   ├── page.tsx           # Головна
│   │   └── globals.css        # Стилі + дизайн-токени
│   ├── components/            # Header, Footer, PageHero
│   └── lib/supabase/          # Клієнти Supabase + getProfile
├── proxy.ts                   # Middleware (Next.js 16) — оновлення сесії
├── supabase/schema.sql        # SQL-схема для Supabase
├── .env.example
└── README.md
```

## Логотип

Помістіть логотип кафедри/інституту у `public/logo.svg` (або `.png`), а далі
можемо замінити іконку `Shield` у `src/components/Header.tsx` і `Footer.tsx` на:
```tsx
<Image src="/logo.svg" alt="Логотип" width={40} height={40} />
```

## Дизайн

Темна військова палітра: темно-синій фон (`#0a1220`), золотий акцент (`#c9a24a`),
тактичні елементи (діагональні смуги, сітка, зрізані кути). Шрифт — **Rubik**
(підтримує кирилицю).

Токени знаходяться у `src/app/globals.css` (блок `@theme`).

## Подальший розвиток

- [ ] Наповнення сторінок вмістом (про кафедру, спеціальності, НПП)
- [ ] Підсторінки розділу "Студенту" (дисципліни, плани, розклад, матеріали)
- [ ] Форма завантаження методичних матеріалів у розділі "Викладачам"
- [ ] Календар подій
- [ ] Пошук по матеріалах
- [ ] Експорт розкладу у PDF/iCal
- [ ] Інтеграція e-mail-нотифікацій (Supabase Edge Functions)

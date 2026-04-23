"use client";

import { Trash2 } from "lucide-react";
import { deleteUser } from "./actions";

export default function DeleteButton({ id, name }: { id: string; name: string }) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!confirm(`Видалити користувача «${name}»?\nЦю дію неможливо скасувати.`)) {
      e.preventDefault();
    }
  }

  return (
    <form action={deleteUser} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        title="Видалити користувача"
        className="inline-flex items-center gap-1 px-3 py-1.5 border border-[--color-border-strong] text-xs uppercase tracking-wider hover:text-[--color-danger] hover:border-[--color-danger]"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </form>
  );
}

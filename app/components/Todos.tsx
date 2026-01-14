"use client";

import { useTodos } from "../hooks/useTodos";
import { Todo } from "@/app/types/Todo";

export default function Todos({ data: todos }: { data: Todo[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

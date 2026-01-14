"use client";

import { MouseEventHandler } from "react";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "@/app/types/Todo";

type TodosProps = {
  onDelete: (id: number) => void;
  data: Todo[];
};

export default function Todos({ data: todos, onDelete }: TodosProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.title}{" "}
          <button onClick={() => onDelete(todo.id!)}>delete</button>
        </li>
      ))}
    </ul>
  );
}

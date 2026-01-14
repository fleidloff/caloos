"use client";

import { MouseEventHandler } from "react";

type AddTodoProps = {
  onAdd: () => void;
};

export default function AddTodo({ onAdd }: AddTodoProps) {
  return <button onClick={onAdd}>add todo</button>;
}

"use client";

import { MouseEventHandler } from "react";

type AddTodoProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function AddTodo({ onClick }: AddTodoProps) {
  return <button onClick={onClick}>add todo</button>;
}

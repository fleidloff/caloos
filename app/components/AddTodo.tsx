"use client";

type AddTodoProps = {
  onAdd: (title: string) => void;
};

export default function AddTodo({ onAdd }: AddTodoProps) {
  return <button onClick={() => onAdd("title")}>add todo</button>;
}

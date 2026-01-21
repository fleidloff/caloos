"use client";

import { useTodos } from "../hooks/useTodos";
import { Todo } from "@/app/types/Todo";
import AddTodo from "./AddTodo";
import Todos from "./Todos";

export default function TodoContext() {
  const { todos, addTodo, deleteTodo } = useTodos();

  return (
    <>
      <Todos data={todos} onDelete={deleteTodo} />
      <AddTodo onAdd={addTodo} />
    </>
  );
}

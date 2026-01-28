"use client";

import { useEffect } from "react";
import { useTodos } from "../hooks/useTodos";
import AddTodo from "./AddTodo";
import Todos from "./Todos";

export default function TodoApp() {
  const { todos, addTodo, deleteTodo, updateTodo, fetchTodos, isReady } =
    useTodos();

  useEffect(() => {
    if (isReady) {
      fetchTodos();
    }
  }, [isReady]);

  return (
    <div className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
      <AddTodo onAdd={addTodo} />
      <Todos data={todos || []} onDelete={deleteTodo} onUpdate={updateTodo} />
    </div>
  );
}

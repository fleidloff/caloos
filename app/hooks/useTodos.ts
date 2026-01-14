import { useState } from "react";
import { Todo } from "@/app/types/Todo";

export function useTodos(initialTodos: Todo[]) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = async () => {
    const res = await fetch("/api/addTodo", {
      method: "POST",
      body: JSON.stringify({ title: "New todo" }),
    });
    const data = await res.json();
    setTodos(data);
  };

  const deleteTodo = async () => {
    const res = await fetch("/api/deleteTodo", {
      method: "POST",
      body: JSON.stringify({ id: 16 }),
    });
    const data = await res.json();
    setTodos(data);
  };

  return { todos, addTodo, deleteTodo };
}

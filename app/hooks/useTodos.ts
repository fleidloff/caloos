import { useEffect, useState } from "react";
import { Todo } from "@/app/types/Todo";
import { fetcher } from "@/app/lib/fetcher";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetcher("/api/todos", {
          method: "GET",
        });
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error("Failed to fetch todos", err);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    const res = await fetcher("/api/addTodo", {
      method: "POST",
      body: JSON.stringify({ title: "New todo" }),
    });
    const data = await res.json();
    setTodos(data);
  };

  const deleteTodo = async (id: number) => {
    const res = await fetcher("/api/deleteTodo", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setTodos(data);
  };

  return { todos, addTodo, deleteTodo };
}

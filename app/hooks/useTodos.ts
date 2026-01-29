"use client";

import { useEffect, useState } from "react";
import { Todo } from "@/app/types/Todo";
import { fetcher } from "@/app/lib/fetcher";
import { useRouter } from "next/navigation";
import { useSecret } from "@/app/hooks/useSecret";

export function useTodos() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const { secret, hasHydrated } = useSecret();
  const [isFetching, setIsFetching] = useState(false);

  const fetchTodos = async () => {
    setIsFetching(true);
    try {
      const res = await fetcher(
        "/api/todos",
        {
          method: "GET",
        },
        secret
      );
      if (res.status === 401) {
        router.replace("/login");
        return;
      }
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Failed to fetch todos", err);
    }
    setIsFetching(false);
  };

  const addTodo = async (
    title: string,
    dueDate: string | null
  ): Promise<void> => {
    const res = await fetcher(
      "/api/addTodo",
      {
        method: "POST",
        body: JSON.stringify({ title, due_date: dueDate }),
      },
      secret
    );
    if (res.status === 401) {
      router.replace("/login");
      return;
    }
    const data = await res.json();
    setTodos(data);
  };

  const updateTodo = async (todo: Todo): Promise<void> => {
    const res = await fetcher(
      "/api/updateTodo",
      {
        method: "POST",
        body: JSON.stringify(todo),
      },
      secret
    );
    if (res.status === 401) {
      router.replace("/login");
      return;
    }
    const data = await res.json();
    setTodos(data);
  };

  const deleteTodo = async (id: number) => {
    const res = await fetcher(
      "/api/deleteTodo",
      {
        method: "POST",
        body: JSON.stringify({ id }),
      },
      secret
    );
    if (res.status === 401) {
      router.replace("/login");
      return;
    }
    const data = await res.json();
    setTodos(data);
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    fetchTodos,
    isFetchingTodos: isFetching,
    isReady: hasHydrated,
  };
}

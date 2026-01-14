import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { Todo } from "@/app/types/Todo";

export function useTodos(initialTodos: Todo[]) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  useEffect(() => {
    // Subscribe to real-time changes
    const channel = supabase
      .channel("todos")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos" },
        (payload) => {
          setTodos((prev: Todo[]) => {
            switch (payload.eventType) {
              case "INSERT":
                return [...prev, payload.new];
              case "UPDATE":
                return prev.map((t) =>
                  t.id === payload.new.id ? payload.new : t
                );
              case "DELETE":
                return prev.filter((t) => t.id !== payload.old.id);
              default:
                return prev;
            }
          });
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { todos };
}

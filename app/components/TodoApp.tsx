"use client";

import { useEffect } from "react";
import { useTodos } from "../hooks/useTodos";
import AddTodo from "./AddTodo";
import Todos from "./Todos";
import { Button, Card, Flex, Text, Box, Spinner } from "@radix-ui/themes";

export default function TodoApp() {
  const {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    fetchTodos,
    isReady,
    isFetchingTodos,
  } = useTodos();

  useEffect(() => {
    if (isReady) {
      fetchTodos();
    }
  }, [isReady]);

  return (
    <div className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
      <AddTodo onAdd={addTodo} />
      {(!isReady || isFetchingTodos) && (
        <Box width="400px">
          <Card size="2">
            <Flex direction="row" gap="3">
              <Text as="div" weight="bold">
                loading <Spinner />
              </Text>
            </Flex>
          </Card>
        </Box>
      )}
      <Todos data={todos || []} onDelete={deleteTodo} onUpdate={updateTodo} />
    </div>
  );
}

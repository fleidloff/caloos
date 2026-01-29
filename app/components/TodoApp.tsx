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
    <Flex direction="column" align="stretch" width="100%">
      <AddTodo onAdd={addTodo} />
      {(!isReady || isFetchingTodos) && (
        <Box>
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
    </Flex>
  );
}

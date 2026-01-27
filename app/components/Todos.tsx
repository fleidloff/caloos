"use client";

import { Flex, Text, Box, Card, Avatar, IconButton } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import { Todo } from "@/app/types/Todo";

type TodosProps = {
  onDelete: (id: number) => void;
  data: Todo[];
};

export default function Todos({ data: todos, onDelete }: TodosProps) {
  return (
    <Flex direction="column" gap="1">
      {todos.map((todo, index) => (
        <Box key={todo.id} width="400px">
          <Card size="2">
            <Flex gap="4" align="center" justify="between">
              <Box flexGrow="1">
                <Text as="div" weight="bold">
                  {todo.title}
                </Text>
                <Text as="div" color="gray">
                  {todo.due_date && new Date(todo.due_date).toLocaleString()}
                </Text>
              </Box>
              <IconButton
                className="opacity-0 group-hover:opacity-100 transition"
                variant="ghost"
                color="red"
                onClick={() => onDelete(todo.id!)}
              >
                <TrashIcon />
              </IconButton>
            </Flex>
          </Card>
        </Box>
      ))}
    </Flex>
  );
}

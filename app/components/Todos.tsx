"use client";

import { Flex, Text, IconButton, Separator } from "@radix-ui/themes";
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
        <Flex key={todo.id} direction="column">
          <Flex
            align="center"
            justify="between"
            py="2"
            px="1"
            className="group"
          >
            <Flex direction="column" gap="1">
              <Text size="2" weight="medium">
                {todo.title}
              </Text>

              {todo.due_date && (
                <Text size="1" color="gray">
                  {new Date(todo.due_date).toLocaleDateString()}
                </Text>
              )}
            </Flex>

            <IconButton
              className="opacity-0 group-hover:opacity-100 transition"
              variant="ghost"
              color="red"
              onClick={() => onDelete(todo.id!)}
            >
              <TrashIcon />
            </IconButton>
          </Flex>

          {index < todos.length - 1 && <Separator size="4" />}
        </Flex>
      ))}
    </Flex>
  );
}

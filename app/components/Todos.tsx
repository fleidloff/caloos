"use client";

import { Flex } from "@radix-ui/themes";
import { Todo } from "@/app/types/Todo";
import TodoComponent from "./Todo";

type TodosProps = {
  onDelete: (id: number) => void;
  onUpdate: (data: Todo) => void;
  data: Todo[];
};

export default function Todos({ data: todos, onDelete, onUpdate }: TodosProps) {
  return (
    <Flex direction="column" gap="1">
      {todos.map((todo, index) => (
        <TodoComponent
          todo={todo}
          key={todo.id}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </Flex>
  );
}

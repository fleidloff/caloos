"use client";

import {
  Flex,
  Text,
  Box,
  Card,
  IconButton,
  TextField,
  Button,
} from "@radix-ui/themes";
import {
  TrashIcon,
  Pencil1Icon,
  CheckIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { Todo } from "@/app/types/Todo";
import { useState } from "react";
import { toDateInputValue } from "../lib/toDateInputValue";

type TodosProps = {
  onDelete: (id: number) => void;
  onUpdate: (data: Todo) => void;
  todo: Todo;
};

export default function TodoComponent({
  todo,
  onDelete,
  onUpdate,
}: TodosProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [draft, setDraft] = useState<Todo>(todo);

  // keep draft in sync if parent updates todo
  // (important when updates come from server)
  useState(() => {
    setDraft(todo);
  });

  const handleSave = () => {
    onUpdate(draft);
    setIsEditMode(false);
  };

  if (isEditMode) {
    return (
      <Box width="400px">
        <Card size="2">
          <Flex direction="column" gap="3">
            <TextField.Root
              size="3"
              value={draft.title ?? ""}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />

            <TextField.Root
              type="date"
              variant="soft"
              size="3"
              value={draft.due_date ? toDateInputValue(draft.due_date) : ""}
              onChange={(e) => setDraft({ ...draft, due_date: e.target.value })}
            />

            <Flex gap="2" justify="end">
              <Button
                variant="soft"
                color="gray"
                onClick={() => {
                  setDraft(todo);
                  setIsEditMode(false);
                }}
              >
                <Cross1Icon /> Cancel
              </Button>

              <Button color="green" onClick={handleSave}>
                <CheckIcon /> Save
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Box>
    );
  }

  // ---------------- View mode ----------------
  return (
    <Box width="400px">
      <Card size="2">
        <Flex gap="4" align="center" justify="between">
          <Box flexGrow="1">
            <Text as="div" weight="bold">
              {todo.title}
            </Text>
            <Text as="div" color="gray">
              {todo.due_date && new Date(todo.due_date).toLocaleDateString()}
            </Text>
          </Box>

          <IconButton
            variant="ghost"
            color="green"
            onClick={() => setIsEditMode(true)}
          >
            <Pencil1Icon />
          </IconButton>

          <IconButton
            variant="ghost"
            color="red"
            onClick={() => onDelete(todo.id!)}
          >
            <TrashIcon />
          </IconButton>
        </Flex>
      </Card>
    </Box>
  );
}

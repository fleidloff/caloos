"use client";

import { useState } from "react";

import { TextField, Text, Button, Box, Card, Flex } from "@radix-ui/themes";

type AddTodoProps = {
  onAdd: (title: string, dueDate: string | null) => Promise<void>;
};

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    await onAdd(title.trim(), dueDate);
    setTitle("");
    setDueDate(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card size="2" className="mb-4">
        <Flex gap="4" align="center" justify="start">
          <Box>
            <TextField.Root
              size="3"
              variant="surface"
              placeholder="Add todo…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box>
            <TextField.Root
              size="3"
              type="date"
              variant="soft"
              value={dueDate ?? ""}
              onChange={(e) => setDueDate(e.target.value || null)}
            />
          </Box>
          <Button disabled={!title.trim()} variant="solid" size="3">
            Add Todo
          </Button>
        </Flex>
      </Card>
    </form>
  );
}

"use client";

import { useState } from "react";

import { TextField, Text, Button, Box } from "@radix-ui/themes";

type AddTodoProps = {
  onAdd: (title: string) => Promise<void>;
};

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    await onAdd(title.trim());
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Box maxWidth="250px">
        <TextField.Root
          size="2"
          placeholder="Add todo…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Button disabled={!title.trim()} variant="solid">
        Add Todo
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { Text, TextField, Box, Button, Flex } from "@radix-ui/themes";
import { useSecret } from "@/app/hooks/useSecret";
import { useRouter } from "next/navigation";

export default function Login() {
  const { secret, setSecret } = useSecret();
  const [input, setInput] = useState(secret);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSecret(input);
    router.replace("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans">
      <Box className="p-6 rounded shadow-md bg-white dark:bg-zinc-900 w-full max-w-sm">
        <Text size="4" weight="bold" className="mb-4 block">
          Login Page
        </Text>

        <form onSubmit={handleSubmit}>
          <Box className="mb-4">
            <TextField.Root
              size="2"
              placeholder="Enter secret…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Box>

          <Flex justify="end">
            <Button type="submit" size="2" variant="solid">
              Save Secret
            </Button>
          </Flex>
        </form>

        {secret && (
          <Text size="2" className="mt-4 block">
            Current secret: {secret}
          </Text>
        )}
      </Box>
    </div>
  );
}

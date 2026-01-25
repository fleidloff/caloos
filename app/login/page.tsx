"use client";

import { useState } from "react";
import { Text, TextField, Box, Button, Flex } from "@radix-ui/themes";
import { useSecret } from "@/app/hooks/useSecret";
import { useRouter } from "next/navigation";

export default function Login() {
  const { setSecret } = useSecret();
  const router = useRouter();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      if (!data.secret) {
        throw new Error("No secret returned");
      }

      setSecret(data.secret);
      router.replace("/");
    } catch (err: any) {
      setError(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans">
      <Box className="p-6 rounded shadow-md bg-white dark:bg-zinc-900 w-full max-w-sm">
        <Text size="4" weight="bold" className="mb-4 block">
          Login Page
        </Text>

        <form onSubmit={handleSubmit}>
          <Box className="mb-3">
            <TextField.Root
              size="2"
              placeholder="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </Box>

          <Box className="mb-4">
            <TextField.Root
              size="2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>

          {error && (
            <Text size="2" color="red" className="mb-3 block">
              {error}
            </Text>
          )}

          <Flex justify="end">
            <Button type="submit" size="2" disabled={loading}>
              {loading ? "Logging in…" : "Login"}
            </Button>
          </Flex>
        </form>
      </Box>
    </div>
  );
}

"use client";

import { supabase } from "@/app/lib/supabaseClient";

export default function AddTodo() {
  const addTodo = async () => {
    const res = await fetch("/api/addTodo", {
      method: "POST",
      body: JSON.stringify({ title: "New todo" }),
    });
    const data = await res.json();
    console.log(data);
  };

  return <button onClick={addTodo}>add todo</button>;
}

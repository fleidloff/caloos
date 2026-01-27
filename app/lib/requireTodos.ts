import { supabaseServer } from "@/app/lib/supabaseServer";
import { Tables } from "@/app/types/Database";

export async function requireTodos(user: Tables<"user">) {
  const { data: todos, error } = await supabaseServer
    .from("todos")
    .select("*")
    .eq("user_id", user.id)
    .order("due_date", { ascending: true, nullsFirst: true })
    .order("id", { ascending: false });

  return { todos, error };
}

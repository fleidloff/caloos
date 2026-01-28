import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";
import { requireUser } from "@/app/lib/requireUser";
import { requireTodos } from "@/app/lib/requireTodos";
import { Todo } from "@/app/types/Todo";

export async function POST(req: NextRequest) {
  const todo: Todo = await req.json();
  const user = await requireUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { todos, error: listError } = await requireTodos(user);

  const { data: newTodo, error } = await supabaseServer
    .from("todos")
    .update(todo)
    .eq("user_id", user.id)
    .eq("id", todo.id)
    .select()
    .single();

  if (!newTodo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  const newTodos = todos?.map((t: Todo) => {
    if (t.id == null) return t;
    return t.id === newTodo.id ? newTodo : t;
  });

  return NextResponse.json(newTodos);
}

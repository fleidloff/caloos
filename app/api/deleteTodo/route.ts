import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";
import { requireUser } from "@/app/lib/requireUser";
import { requireTodos } from "@/app/lib/requireTodos";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  const user = await requireUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { todos, error: listError } = await requireTodos(user);

  const { error: deleteError } = await supabaseServer
    .from("todos")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json(todos!.filter((todo) => todo.id !== id));
}

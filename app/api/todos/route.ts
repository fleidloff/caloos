import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";
import { requireUser } from "@/app/lib/requireUser";
import { requireTodos } from "@/app/lib/requireTodos";

export async function GET(req: NextRequest) {
  const user = await requireUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { todos, error: listError } = await requireTodos(user);
  return NextResponse.json(todos);
}

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";
import { requireUser } from "@/app/lib/requireUser";

export async function GET(req: NextRequest) {
  const user = await requireUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: todos, error: listError } = await supabaseServer
    .from("todos")
    .select("*")
    .eq("user_id", user.id);

  return NextResponse.json(todos);
}

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";
import { requireUser } from "@/app/lib/requireUser";

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  const user = await requireUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: todos, error: listError } = await supabaseServer
    .from("todos")
    .select("*")
    .eq("user_id", user.id);

  const { data, error } = await supabaseServer
    .from("todos")
    .insert([{ title, user_id: user.id, due_date: null }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json([...todos!, data]);
}

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

export async function POST(req: NextRequest) {
  const { title } = await req.json();

  const { data, error } = await supabaseServer
    .from("todos")
    .insert([{ title, due_date: null }]);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: todos, error: listError } = await supabaseServer
    .from("todos")
    .select("*");

  return NextResponse.json(todos);
}

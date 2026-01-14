import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  const { error: deleteError } = await supabaseServer
    .from("todos")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  const { data: todos, error: listError } = await supabaseServer
    .from("todos")
    .select("*");

  return NextResponse.json(todos);
}

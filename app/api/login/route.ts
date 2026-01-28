import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { user, password } = await req.json();

  const hashedPassword = await hash(password);

  console.log(hashedPassword, password);
  const { data, error } = await supabaseServer
    .from("user")
    .select("*")
    .eq("name", user)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || !data.password_hash) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, data.password_hash);

  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const uuid = data.secret || crypto.randomUUID();

  const { error: updateError } = await supabaseServer
    .from("user")
    .update({ secret: uuid })
    .eq("id", data.id)
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ secret: uuid });
}

async function hash(password: string) {
  return await bcrypt.hash(password, 12);
}

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

export async function requireUser(req: NextRequest) {
  const secret = req.headers.get("x-secret") || "";

  const { data: user, error: userError } = await supabaseServer
    .from("user")
    .select("*")
    .eq("secret", secret)
    .single();

  return user;
}

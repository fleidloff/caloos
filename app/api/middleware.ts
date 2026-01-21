import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const secret = req.headers.get("x-secret") || "";

  const { data: user, error: userError } = await supabaseServer
    .from("user")
    .select("*")
    .eq("secret", secret)
    .single();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(user);
  res.headers.set("x-user-id", "" + user.id);

  return res;
}

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";
import { requireUser } from "@/app/lib/requireUser";
import { requireTodos } from "@/app/lib/requireTodos";

export async function POST(req: NextRequest) {
  const { title, due_date } = await req.json();
  const user = await requireUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { todos, error: listError } = await requireTodos(user);

  const { data: newTodo, error } = await supabaseServer
    .from("todos")
    .insert([{ title, user_id: user.id, due_date: due_date }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const newTodos = [...todos!];

  const index = newTodos.findIndex((todo) => {
    if (!newTodo.due_date) {
      return !!todo.due_date;
    }
    return (
      todo.due_date && newTodo.due_date && newTodo.due_date < todo.due_date
    );
  });

  if (index === -1) {
    newTodos.push(newTodo);
  } else {
    newTodos.splice(index, 0, newTodo);
  }

  return NextResponse.json(newTodos);
}

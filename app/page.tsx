import Image from "next/image";
import { supabaseServer } from "@/app/lib/supabaseServer";
import AddTodo from "@/app/components/AddTodo";
import Todos from "@/app/components/Todos";

export default async function Home() {
  const { data: todos, error } = await supabaseServer.from("todos").select("*");

  if (error) throw new Error(error.message);

  console.log(todos);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Todos data={todos} />
        <AddTodo />
      </main>
    </div>
  );
}

import TodoApp from "@/app/components/TodoApp";
import { Flex } from "@radix-ui/themes";

export default async function Home() {
  return (
    <div className="flex min-w-screen min-h-screen bg-zinc-50 font-sans dark:bg-black p-8 justify-center">
      <Flex align="stretch" justify="center" width="100%" maxWidth="800px">
        <TodoApp />
      </Flex>
    </div>
  );
}

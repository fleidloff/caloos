import { Tables } from "@/app/types/Database";

export type Todo = Tables<"todos"> & {
  id: number;
  title: string | null;
  due_date: string | null;
};

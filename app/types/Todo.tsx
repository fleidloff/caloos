import { Tables } from "@/app/types/Database";

export type Todo = Tables<"todos"> & {
  id: number;
  title: string;
  due_date: string | null;
};

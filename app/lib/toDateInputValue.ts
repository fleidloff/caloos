export function toDateInputValue(value?: string | null) {
  if (!value) return "";
  return value.split("T")[0];
}

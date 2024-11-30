import type { User } from "./data";

export type Toast = {
  id: string;
  message: string;
  kind: ToastKind;
};
export const toasts = $state<{ value: Toast[] }>({ value: [] });

export type ToastKind = "default" | "success" | "info" | "warning" | "error";
export function pushToast(message: string, kind: ToastKind, timeout: number) {
  const id = Math.random().toString();
  toasts.value.push({ id, message, kind });
  setTimeout(() => {
    toasts.value = toasts.value.filter((elem) => elem.id !== id);
  }, timeout);
}

export const logged_in_as = $state<{ value: User | null }>({ value: null });

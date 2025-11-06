import { SnackbarVariant } from "../types/snack-bar-variant";

export const snackBarColors: Record<SnackbarVariant, string> = {
  success: "bg-green-600",
  error: "bg-red-600",
  warning: "bg-yellow-500 text-black",
  info: "bg-blue-600",
  loading: "bg-gray-300",
};

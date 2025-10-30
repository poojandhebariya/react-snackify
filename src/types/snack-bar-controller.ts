import { SnackbarShowOptions } from "./snack-bar-options";

export interface SnackbarController {
  update: (options: Partial<SnackbarShowOptions>) => void;
  close: () => void;
}

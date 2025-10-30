import { SnackbarController } from "./snack-bar-controller";
import { SnackbarShowOptions } from "./snack-bar-options";

export type SnackbarContextType = {
  showSnackbar: (options: SnackbarShowOptions) => SnackbarController;
  hideSnackbar: (id: string) => void;
};

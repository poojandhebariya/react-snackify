import { SnackbarAction } from "./snack-bar-action";
import { SnackbarPosition } from "./snack-bar-position";
import { SnackbarVariant } from "./snack-bar-variant";

export interface SnackbarShowOptions {
  id?: string;
  classname?: string;
  message: string | React.ReactNode;
  variant?: SnackbarVariant;
  position?: SnackbarPosition;
  duration?: number;
  priority?: number;
  action?: SnackbarAction | SnackbarAction[];
  autoMorph?: {
    to?: SnackbarShowOptions;
    after?: number;
  };
}

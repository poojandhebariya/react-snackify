import { ReactNode } from "react";

export interface SnackbarAction {
  label: string;
  onClick: () => void;
  autoDismiss?: boolean;
  ariaLabel?: string;
  icon?: ReactNode;
}

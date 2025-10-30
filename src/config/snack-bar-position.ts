type PositionClassTop = {
  top: string;
  left?: string;
  right?: string;
  transform?: string;
};
type PositionClassBottom = {
  bottom: string;
  left?: string;
  right?: string;
  transform?: string;
};

export const snackbarPositionClasses: Record<
  string,
  PositionClassTop | PositionClassBottom
> = {
  "top-left": { top: "1rem", left: "1rem" },
  "top-center": { top: "1rem", left: "50%", transform: "-translate-x-1/2" },
  "top-right": { top: "1rem", right: "1rem" },
  "bottom-left": { bottom: "1rem", left: "1rem" },
  "bottom-center": {
    bottom: "1rem",
    left: "50%",
    transform: "-translate-x-1/2",
  },
  "bottom-right": { bottom: "1rem", right: "1rem" },
};

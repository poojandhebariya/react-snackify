import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { snackBarColors } from "./config/snack-bar-color";
import { SnackbarPosition } from "./types/snack-bar-position";
import { snackbarPositionClasses } from "./config/snack-bar-position";
import { SnackbarAction } from "./types/snack-bar-action";

export interface SnackbarProps {
  id: string;
  classname: string;
  message: string | React.ReactNode;
  variant: "success" | "error" | "info" | "warning";
  position: SnackbarPosition;
  action?: SnackbarAction | SnackbarAction[];
  onClose?: () => void;
  animationType?: "fade" | "slide" | "scale" | "grow";
  styleVariant?:
    | "default"
    | "neon-glow"
    | "holographic"
    | "bold-monochrome"
    | "vintage-paper"
    | "glassmorphism";
  icon?: React.ReactNode;
  duration?: number;
  index?: number;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  classname,
  message,
  variant,
  position,
  action,
  onClose,
  index = 0,
  animationType = "slide",
  styleVariant = "default",
  icon,
  duration = 3000,
}) => {
  const [exiting, setExiting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(duration);

  const [isPaused, setIsPaused] = useState(false);

  const handleClose = () => {
    setExiting(true);
    timeoutRef.current = setTimeout(() => {
      onClose?.();
    }, 300); // Match transition duration
  };

  const startTimer = (time: number) => {
    timerRef.current = setTimeout(() => {
      handleClose();
    }, time);
    startTimeRef.current = Date.now();
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current -= elapsed;
      setIsPaused(true);
    }
  };

  const resumeTimer = () => {
    if (!timerRef.current && remainingTimeRef.current > 0) {
      setIsPaused(false);
      startTimer(remainingTimeRef.current);
    }
  };

  useEffect(() => {
    if (duration > 0) {
      startTimer(duration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration]);

  const getAnimationClasses = (isExiting: boolean, type: string): string => {
    return `snackbar ${type}-${isExiting ? "exit" : "enter"}`;
  };

  const animationClass = getAnimationClasses(exiting, animationType);

  const offset = 60;
  const basePositionClass = snackbarPositionClasses[position];

  const top = "top" in basePositionClass ? basePositionClass.top : undefined;
  const bottom =
    "bottom" in basePositionClass ? basePositionClass.bottom : undefined;
  const left = basePositionClass.left;
  const right = basePositionClass.right;
  const transform = basePositionClass.transform;

  const transformMap: Record<string, string> = {
    "-translate-x-1/2": "translateX(-50%)",
  };

  const transformStyle = transform
    ? transformMap[transform] || undefined
    : undefined;

  const verticalOffsetStyle = top
    ? { top: `calc(${top} + ${index * offset}px)` }
    : bottom
    ? { bottom: `calc(${bottom} + ${index * offset}px)` }
    : {};

  const positionStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    left,
    right,
    transform: transformStyle,
    ...verticalOffsetStyle,
  };

  const actions = Array.isArray(action) ? action : action ? [action] : [];

  const getActionClass = () => {
    if (styleVariant === "bold-monochrome")
      return "bg-black text-white border border-white focus:ring-white";
    if (styleVariant === "vintage-paper")
      return "bg-gray-200 text-black border border-gray-400 focus:ring-gray-400";
    if (styleVariant === "glassmorphism") {
      const map: Record<string, string> = {
        success:
          "bg-white/20 text-green-400 border border-green-400/60 focus:ring-green-400",
        error:
          "bg-white/20 text-red-400   border border-red-400/60   focus:ring-red-400",
        info: "bg-white/20 text-blue-400  border border-blue-400/60  focus:ring-blue-400",
        warning:
          "bg-white/20 text-yellow-400 border border-yellow-400/60 focus:ring-yellow-400",
      };
      return (
        map[variant] ||
        "bg-white/20 text-white border border-white/60 focus:ring-white"
      );
    }
    return "bg-white/80 text-black focus:ring-gray-500";
  };

  return (
    <div style={positionStyle}>
      <div
        className={clsx(
          animationClass,
          "snackbar",
          `snackbar--${styleVariant}`,
          styleVariant === "glassmorphism" ? "" : snackBarColors[variant],
          classname
        )}
        onMouseEnter={pauseTimer}
        onMouseLeave={resumeTimer}
        role="alert"
        aria-live="polite"
      >
        {icon && <span className="snackbar__icon">{icon}</span>}
        <span className="snackbar__message">{message}</span>

        {actions.map((a, i) => (
          <button
            key={i}
            onClick={() => {
              a.onClick?.();
              if (a.autoDismiss !== false) handleClose();
            }}
            className={clsx("snackbar__action", getActionClass())}
            aria-label={a.ariaLabel || a.label}
          >
            {a.icon && <span className="mr-1">{a.icon}</span>}
            {a.label}
          </button>
        ))}

        <button
          onClick={handleClose}
          className="snackbar__close"
          aria-label="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L14 14M2 14L14 2"
              stroke={styleVariant === "vintage-paper" ? "#000" : "#fff"}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div
          className={`snackbar__progress-bar snackbar__progress-bar--${styleVariant}`}
          style={{
            animationDuration: `${duration}ms`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        />
      </div>
    </div>
  );
};

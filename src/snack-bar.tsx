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
    left,
    right,
    transform: transformStyle,
    ...verticalOffsetStyle,
  };

  const actionsArray = Array.isArray(action) ? action : action ? [action] : [];

  const getButtonStyles = () => {
    if (styleVariant === "bold-monochrome") {
      return "bg-black text-white border border-white focus:ring-white";
    } else if (styleVariant === "vintage-paper") {
      return "bg-gray-200 text-black border border-gray-400 focus:ring-gray-400";
    } else if (styleVariant === "glassmorphism") {
      switch (variant) {
        case "success":
          return "bg-white/20 text-green-400 border border-green-400/60 focus:ring-green-400";
        case "error":
          return "bg-white/20 text-red-400 border border-red-400/60 focus:ring-red-400";
        case "info":
          return "bg-white/20 text-blue-400 border border-blue-400/60 focus:ring-blue-400";
        case "warning":
          return "bg-white/20 text-yellow-400 border border-yellow-400/60 focus:ring-yellow-400";
        default:
          return "bg-white/20 text-white border border-white/60 focus:ring-white";
      }
    } else {
      return "bg-white opacity-80 text-black focus:ring-gray-500";
    }
  };

  return (
    <div className="fixed z-50" style={positionStyle}>
      <div
        className={clsx(
          animationClass,
          "px-4 py-3 rounded-sm shadow-lg flex items-center justify-between min-w-96",
          `snackbar--${styleVariant}`,
          styleVariant === "glassmorphism" ? variant : snackBarColors[variant],
          classname
        )}
        onMouseEnter={pauseTimer}
        onMouseLeave={resumeTimer}
        aria-live="polite"
        aria-label={`Notification: ${message}, disappears in ${
          duration / 1000
        } seconds`}
      >
        <span className="pr-4">
          {icon && <span className="flex-shrink-0">{icon}</span>}
        </span>

        <span className="flex-1 pr-4">{message}</span>
        {actionsArray.map((a, idx) => (
          <button
            key={idx}
            onClick={() => {
              a.onClick?.();
              if (a.autoDismiss !== false) {
                handleClose();
              }
            }}
            type="button"
            className={`ml-2 px-3 py-1 text-sm font-medium rounded-sm transition duration-150 ease-in-out hover:opacity-90 focus:outline-none focus:ring-1 active:scale-95 flex items-center ${getButtonStyles()}`}
            aria-label={a.ariaLabel || a.label}
          >
            {a.icon && <span className="mr-1">{a.icon}</span>}
            {a.label}
          </button>
        ))}
        <button
          onClick={handleClose}
          type="button"
          className="ml-2 p-1 text-white opacity-80 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-white"
          aria-label="Close snackbar"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L14 14M2 14L14 2"
              stroke={styleVariant === "vintage-paper" ? "black" : "white"}
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

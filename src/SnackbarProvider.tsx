import React, { useState, useCallback, useEffect } from "react";
import { Snackbar } from "./snack-bar";
import { SnackbarContext } from "./snackbarContext";
import { SnackbarVariant } from "./types/snack-bar-variant";
import { SnackbarPosition } from "./types/snack-bar-position";
import { SnackbarAction } from "./types/snack-bar-action";
import { SnackbarShowOptions } from "./types/snack-bar-options";
import { createPortal } from "react-dom";

type SnackbarItem = {
  id: string;
  classname: string;
  message: string | React.ReactNode;
  variant: SnackbarVariant;
  position: SnackbarPosition;
  duration: number;
  action?: SnackbarAction | SnackbarAction[];
  priority?: number;
  autoMorph?: {
    to?: SnackbarShowOptions;
    after?: number;
  };
};

interface SnackbarProviderProps {
  children: React.ReactNode;
  globalPosition: SnackbarPosition;
  animationType?: "fade" | "slide" | "scale" | "grow";
  styleVariant?:
    | "default"
    | "neon-glow"
    | "holographic"
    | "bold-monochrome"
    | "vintage-paper"
    | "glassmorphism";
  iconSet?: {
    success?: React.ReactNode;
    error?: React.ReactNode;
    warning?: React.ReactNode;
    info?: React.ReactNode;
    default?: React.ReactNode;
  };
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  animationType = "slide",
  styleVariant = "default",
  globalPosition,
  iconSet,
}) => {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  const hideSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  }, []);

  const showSnackbar = useCallback(
    (options: SnackbarShowOptions) => {
      const {
        id = Date.now().toString(),
        classname = "",
        message,
        variant = "info",
        position = options.position ?? globalPosition,
        duration = 3000,
        action,
        priority = 0,
        autoMorph,
      } = options;

      // Optional: Prevent duplicate by ID
      setSnackbars((prev) => {
        // Replace if same ID and new has higher or equal priority
        const existingIndex = prev.findIndex((snack) => snack.id === id);
        if (existingIndex !== -1) {
          if ((prev[existingIndex].priority ?? 0) > priority) {
            return prev; // skip lower-priority update
          }
          const updated = [...prev];
          updated[existingIndex] = {
            id,
            classname,
            message,
            variant,
            position,
            duration,
            action,
            priority,
            autoMorph,
          };
          return updated;
        }

        return [
          ...prev,
          {
            id,
            classname,
            message,
            variant,
            position,
            duration,
            action,
            priority,
            autoMorph,
          },
        ];
      });

      if (autoMorph?.to) {
        const { after = 2000, to } = autoMorph;
        setTimeout(() => {
          setSnackbars((prev) =>
            prev.map((snack) =>
              snack.id === id
                ? {
                    ...snack,
                    ...to,
                    id,
                  }
                : snack
            )
          );
        }, after);
      }

      return {
        update: (newOptions: Partial<SnackbarShowOptions>) => {
          setSnackbars((prev) =>
            prev.map((s) => (s.id === id ? { ...s, ...newOptions, id } : s))
          );
        },
        close: () => hideSnackbar(id),
      };
    },
    [hideSnackbar]
  );

  useEffect(() => {
    if (typeof document === "undefined") return;

    let el = document.getElementById("snackbar-portal-root");
    if (!el) {
      el = document.createElement("div");
      el.id = "snackbar-portal-root";
      document.body.appendChild(el);
    }
    setPortalEl(el);

    return () => {
      el?.parentNode?.removeChild(el);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && snackbars.length > 0) {
        // Dismiss the latest snackbar (topmost)
        const latest = snackbars[snackbars.length - 1];
        hideSnackbar(latest.id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [snackbars, hideSnackbar]);

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
        hideSnackbar,
      }}
    >
      {children}
      {portalEl &&
        createPortal(
          <div className="snackbar-lib">
            {snackbars.map((snackbar, index) => (
              <Snackbar
                key={`${snackbar.id}-${snackbar.variant}-${snackbar.message}-${snackbar.duration}`}
                id={snackbar.id}
                classname={snackbar.classname}
                message={snackbar.message}
                variant={snackbar.variant}
                position={snackbar.position}
                action={snackbar.action}
                onClose={() => hideSnackbar(snackbar.id)}
                animationType={animationType}
                styleVariant={styleVariant}
                icon={iconSet?.[snackbar.variant] ?? iconSet?.default}
                duration={snackbar.duration}
                index={index}
              />
            ))}
          </div>,
          portalEl
        )}
    </SnackbarContext.Provider>
  );
};

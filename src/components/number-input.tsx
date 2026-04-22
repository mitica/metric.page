"use client";

import { useCallback, useRef, useEffect, useState } from "react";

interface NumberInputProps {
  value: string | number;
  onChange: (value: string | number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  ariaLabel?: string;
}

export default function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  placeholder,
  ariaLabel,
}: NumberInputProps) {
  const numValue = Number(value) || 0;
  const inputRef = useRef<HTMLInputElement>(null);
  const repeatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStateRef = useRef<{
    startX: number;
    startValue: number;
    pointerId: number;
    moved: boolean;
  } | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const clamp = useCallback(
    (n: number) => {
      let v = n;
      if (typeof min === "number") v = Math.max(min, v);
      if (typeof max === "number") v = Math.min(max, v);
      return v;
    },
    [min, max],
  );

  // Round to step precision to avoid floating-point ugliness (e.g. 0.1 + 0.2)
  const roundToStep = useCallback(
    (n: number) => {
      const decimals = (String(step).split(".")[1] || "").length;
      return Number(n.toFixed(decimals));
    },
    [step],
  );

  const apply = useCallback(
    (n: number) => onChange(roundToStep(clamp(n))),
    [onChange, clamp, roundToStep],
  );

  const stopRepeat = useCallback(() => {
    if (repeatTimerRef.current) {
      clearTimeout(repeatTimerRef.current);
      repeatTimerRef.current = null;
    }
    if (repeatIntervalRef.current) {
      clearInterval(repeatIntervalRef.current);
      repeatIntervalRef.current = null;
    }
  }, []);

  // Hold-to-repeat with acceleration
  const startRepeat = useCallback(
    (direction: 1 | -1) => {
      stopRepeat();
      const startValue = numValue;
      let accumulator = direction * step;
      // Immediate first action
      apply(startValue + accumulator);

      repeatTimerRef.current = setTimeout(() => {
        let count = 0;
        const tick = () => {
          accumulator += direction * step;
          onChange(roundToStep(clamp(startValue + accumulator)));
          count++;
          // Accelerate at thresholds
          if (count === 10 || count === 25) {
            if (repeatIntervalRef.current) {
              clearInterval(repeatIntervalRef.current);
              repeatIntervalRef.current = setInterval(tick, count === 10 ? 40 : 16);
            }
          }
        };
        repeatIntervalRef.current = setInterval(tick, 100);
      }, 400);
    },
    [apply, numValue, step, stopRepeat, onChange, roundToStep, clamp],
  );

  useEffect(() => () => stopRepeat(), [stopRepeat]);

  // ===== Drag-to-scrub on the value display =====
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isEditing) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragStateRef.current = {
        startX: e.clientX,
        startValue: numValue,
        pointerId: e.pointerId,
        moved: false,
      };
      try {
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      } catch {}
    },
    [numValue, isEditing],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragStateRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;
      const deltaX = e.clientX - drag.startX;

      // Sensitivity: ~10px of drag per step
      const pixelsPerStep = 10;
      const stepDelta = Math.round(deltaX / pixelsPerStep);

      if (Math.abs(deltaX) > 4) {
        if (!drag.moved) {
          drag.moved = true;
          setIsDragging(true);
        }
        apply(drag.startValue + stepDelta * step);
      }
    },
    [apply, step],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragStateRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;
      try {
        (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
      } catch {}
      const wasDrag = drag.moved;
      dragStateRef.current = null;
      setIsDragging(false);
      // Tap (no movement) → enter edit mode
      if (!wasDrag) {
        setDraftValue(String(numValue));
        setIsEditing(true);
        requestAnimationFrame(() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        });
      }
    },
    [numValue],
  );

  // ===== Inline editing =====
  const commitEdit = useCallback(() => {
    if (draftValue === "" || draftValue === "-") {
      setIsEditing(false);
      return;
    }
    const parsed = Number(draftValue);
    if (!Number.isNaN(parsed)) apply(parsed);
    setIsEditing(false);
  }, [draftValue, apply]);

  const handleEditKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        commitEdit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsEditing(false);
      }
    },
    [commitEdit],
  );

  const formatted =
    Math.abs(numValue) >= 1000
      ? numValue.toLocaleString(undefined, { maximumFractionDigits: 4 })
      : roundToStep(numValue).toString();

  const atMin = typeof min === "number" && numValue <= min;
  const atMax = typeof max === "number" && numValue >= max;

  return (
    <div
      className="flex items-stretch gap-2 select-none"
      style={{ touchAction: "manipulation" }}
    >
      <StepperButton
        ariaLabel="Decrease"
        disabled={atMin}
        onHoldStart={() => startRepeat(-1)}
        onHoldEnd={stopRepeat}
      >
        −
      </StepperButton>

      {/* Value: drag horizontally to scrub, tap to edit */}
      <div
        className="flex-1 relative rounded-xl overflow-hidden"
        style={{
          backgroundColor: "var(--color-surface-elevated)",
          border: `1px solid ${isDragging ? "var(--color-accent)" : "var(--color-border)"}`,
          minHeight: 44,
          transition: "border-color 0.15s ease",
        }}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="number"
            inputMode="decimal"
            value={draftValue}
            onChange={(e) => setDraftValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleEditKeyDown}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            aria-label={ariaLabel}
            className="w-full text-center font-semibold bg-transparent outline-none"
            style={{
              color: "var(--color-text-primary)",
              fontSize: 18,
              border: 0,
              padding: 0,
              minHeight: 44,
              borderRadius: 0,
            }}
          />
        ) : (
          <div
            role="button"
            tabIndex={0}
            aria-label={ariaLabel ? `${ariaLabel}: ${formatted}` : `Value: ${formatted}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "+" || e.key === "=") {
                e.preventDefault();
                apply(numValue + step);
              } else if (e.key === "ArrowDown" || e.key === "-") {
                e.preventDefault();
                apply(numValue - step);
              } else if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setDraftValue(String(numValue));
                setIsEditing(true);
                requestAnimationFrame(() => inputRef.current?.focus());
              }
            }}
            className="w-full h-full flex items-center justify-center relative"
            style={{
              cursor: "ew-resize",
              minHeight: 44,
              userSelect: "none",
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
              touchAction: "none",
            }}
          >
            <span
              className="font-semibold tabular-nums"
              style={{
                color: "var(--color-text-primary)",
                fontSize: 18,
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              {formatted}
            </span>
            {/* Subtle drag-hint icon (right side) */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--color-text-secondary)",
                opacity: isDragging ? 0 : 0.6,
                transition: "opacity 0.15s",
                pointerEvents: "none",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="7 8 3 12 7 16" />
                <polyline points="17 8 21 12 17 16" />
                <line x1="3" y1="12" x2="21" y2="12" />
              </svg>
            </span>
          </div>
        )}
      </div>

      <StepperButton
        ariaLabel="Increase"
        disabled={atMax}
        onHoldStart={() => startRepeat(1)}
        onHoldEnd={stopRepeat}
      >
        +
      </StepperButton>
    </div>
  );
}

interface StepperButtonProps {
  children: React.ReactNode;
  ariaLabel: string;
  disabled?: boolean;
  onHoldStart: () => void;
  onHoldEnd: () => void;
}

function StepperButton({
  children,
  ariaLabel,
  disabled,
  onHoldStart,
  onHoldEnd,
}: StepperButtonProps) {
  const [pressed, setPressed] = useState(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.preventDefault();
    try {
      (e.currentTarget as HTMLButtonElement).setPointerCapture(e.pointerId);
    } catch {}
    setPressed(true);
    onHoldStart();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    try {
      (e.currentTarget as HTMLButtonElement).releasePointerCapture(e.pointerId);
    } catch {}
    if (pressed) {
      setPressed(false);
      onHoldEnd();
    }
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="flex-shrink-0 flex items-center justify-center font-semibold rounded-xl"
      style={{
        width: 44,
        minHeight: 44,
        fontSize: 22,
        lineHeight: 1,
        backgroundColor: pressed
          ? "var(--color-accent)"
          : "var(--color-surface-elevated)",
        color: disabled
          ? "var(--color-text-tertiary)"
          : pressed
            ? "#ffffff"
            : "var(--color-text-primary)",
        border: "1px solid var(--color-border)",
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        transition:
          "background-color 0.1s ease, color 0.1s ease, transform 0.05s ease",
        transform: pressed ? "scale(0.96)" : "scale(1)",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      {children}
    </button>
  );
}

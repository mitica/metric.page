"use client";

interface ToolSwitcherOption<T extends string> {
  value: T;
  label: string;
}

interface ToolSwitcherProps<T extends string> {
  label: string;
  value: T;
  options: ToolSwitcherOption<T>[];
  onChange: (value: T) => void;
}

export default function ToolSwitcher<T extends string>({
  label,
  value,
  options,
  onChange,
}: ToolSwitcherProps<T>) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-secondary">{label}</label>
      <div
        className="inline-flex w-full rounded-lg p-0.5"
        style={{ backgroundColor: "var(--color-surface-elevated)" }}
      >
        {options.map((opt) => {
          const isActive = value === opt.value;
          return (
            <div
              key={opt.value}
              role="button"
              tabIndex={0}
              onClick={() => onChange(opt.value)}
              onTouchEnd={(e) => {
                e.preventDefault();
                onChange(opt.value);
              }}
              className="flex-1 cursor-pointer select-none rounded-md px-3 py-2 text-center text-sm font-medium"
              style={{
                backgroundColor: isActive ? "var(--color-accent)" : "transparent",
                color: isActive ? "#ffffff" : "var(--color-text-secondary)",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
              }}
            >
              {opt.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

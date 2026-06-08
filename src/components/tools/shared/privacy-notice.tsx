"use client";

interface PrivacyNoticeProps {
  message: string;
}

export default function PrivacyNotice({ message }: PrivacyNoticeProps) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 text-xs text-text-secondary">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className="mt-0.5 shrink-0 text-accent"
      >
        <path
          d="M8 1.5L2.5 4v4c0 2.8 2 5.4 5.5 6.5 3.5-1.1 5.5-3.7 5.5-6.5V4L8 1.5z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 8L7 9.5L10.5 6"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
}

interface IconProps {
  className?: string;
}

export const SearchIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const FilterIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M4 7h16M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="9" cy="7" r="2" fill="var(--color-bark-800)" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="15" cy="17" r="2" fill="var(--color-bark-800)" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

export const BagIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M5 8.5h14l-1.1 11a1.6 1.6 0 0 1-1.6 1.5H7.7a1.6 1.6 0 0 1-1.6-1.5L5 8.5Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path d="M8.5 11V7a3.5 3.5 0 0 1 7 0v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const CloseIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const PlusIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const MinusIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const TrashIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M5 7h14M9.5 7V5.2A1.2 1.2 0 0 1 10.7 4h2.6a1.2 1.2 0 0 1 1.2 1.2V7m3 0-.8 12.2a1.6 1.6 0 0 1-1.6 1.5H8.7a1.6 1.6 0 0 1-1.6-1.5L6.3 7M10 11v5.5M14 11v5.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const StarIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3-4.7-4.4 6.4-.8L12 2.8z"
      fill="currentColor"
    />
  </svg>
);

export const ArrowRightIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M4 12h16m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BeanIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g transform="rotate(38 12 12)">
      <ellipse cx="12" cy="12" rx="6.2" ry="9.2" fill="currentColor" />
      <path
        d="M12 3.4c-3.1 3-3.1 5.8 0 8.6s3.1 5.6 0 8.6"
        fill="none"
        stroke="rgba(18,12,7,0.55)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export const FlameIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 3c.6 3.2-1.5 4.9-2.9 6.5C7.6 11.2 7 12.6 7 14.2A5 5 0 0 0 12 19a5 5 0 0 0 5-4.8c0-2.6-1.5-4.1-2.4-5.9C13.8 6.8 13.5 5 12 3Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path d="M12 19c-1.4-.8-2-2-1.6-3.5.3-1 1-1.7 1.6-2.5.6.8 1.3 1.5 1.6 2.5.4 1.5-.2 2.7-1.6 3.5Z" fill="currentColor" />
  </svg>
);

export const LeafIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M19.5 4.5C12 4 6.5 7.5 5.6 13.3c-.4 2.7.8 5 2.4 6.2 1-3.8 3-6.6 6.6-8.6-2.9 2.5-4.8 5.4-5.7 9.2 1 .4 2.2.6 3.4.4 5.6-.9 7.8-7.4 7.2-16Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export const TruckIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M3 7h11v9H3zM14 10h3.6L20.5 13v3H14z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="7" cy="17.5" r="1.7" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17" cy="17.5" r="1.7" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const CheckIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SpinnerIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.4" opacity="0.25" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const MountainIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M3.5 19 9 9l3 5.2L14.5 11 20.5 19h-17Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export const CupLogo = ({ className = "w-8 h-8" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <path
      d="M6 13h16v8a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6v-8Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M22 14.5h2.2a2.8 2.8 0 1 1 0 5.6H22"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path d="M10 3.5c-1.4 1.6-1.4 3 .1 4.4M15 3.5c-1.4 1.6-1.4 3 .1 4.4M20 3.5c-1.4 1.6-1.4 3 .1 4.4"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const LockIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="5.5" y="10.5" width="13" height="9.5" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

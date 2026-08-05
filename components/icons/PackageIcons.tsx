type IconProps = { size?: number; className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ClockIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function RouteIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M5 8.5v3a4 4 0 004 4h6a4 4 0 014 4" strokeDasharray="0.1 4.2" />
    </svg>
  );
}

export function GaugeIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M4 15a8 8 0 1116 0" />
      <path d="M12 15l4-5" />
      <path d="M12 15h.01" />
    </svg>
  );
}

export function UsersIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M2.5 20a6.5 6.5 0 0113 0" />
      <path d="M15.8 4.9a3.25 3.25 0 010 6.2" />
      <path d="M17.5 20a6.3 6.3 0 00-3.4-5.6" />
    </svg>
  );
}

export function UserCheckIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M2.5 20a6.5 6.5 0 0113 0" />
      <path d="M16.5 9.5l2 2 3.5-4" />
    </svg>
  );
}

export function SunriseIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M4 18h16" />
      <path d="M6.5 18a5.5 5.5 0 0111 0" />
      <path d="M12 8.5V5" />
      <path d="M6 10l1.8 1.8" />
      <path d="M18 10l-1.8 1.8" />
      <path d="M3 21h1.5M19.5 21H21" />
    </svg>
  );
}

export function MapPinIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M19 10.5c0 5.5-7 11-7 11s-7-5.5-7-11a7 7 0 0114 0z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.3 12.3l2.4 2.4 5-5.4" />
    </svg>
  );
}

export function XCircleIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" />
    </svg>
  );
}

export function BackpackIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M7 8.5V6a5 5 0 0110 0v2.5" />
      <path d="M6 8.5h12a2 2 0 012 2V19a2 2 0 01-2 2H6a2 2 0 01-2-2v-8.5a2 2 0 012-2z" />
      <path d="M9 12.5h6" />
      <path d="M9.5 8.5v-2M14.5 8.5v-2" />
    </svg>
  );
}

export function AlertTriangleIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M12 3.5l10 17.5H2z" />
      <path d="M12 10v4.2" />
      <path d="M12 17.3h.01" />
    </svg>
  );
}

export function HelpCircleIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.3 9.3a2.7 2.7 0 115 1.6c-.6.9-1.8 1.2-1.8 2.6" />
      <path d="M12 17.3h.01" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function FlagIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M5 3v18" />
      <path d="M5 4h11l-2.5 3.5L16 11H5" />
    </svg>
  );
}

export function InfoIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <path d="M12 7.7h.01" />
    </svg>
  );
}

export function ClipboardCheckIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2" />
      <path d="M9 4.5V3.5a1 1 0 011-1h4a1 1 0 011 1v1" />
      <path d="M9 12.3l2 2 4-4.3" />
    </svg>
  );
}

export function MountainIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M2.5 19L9 8l4 6.2L15.5 11 21.5 19z" />
    </svg>
  );
}

export function DropletIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M12 3.5s6 6.8 6 11a6 6 0 01-12 0c0-4.2 6-11 6-11z" />
    </svg>
  );
}

export function CompassIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.8 9.2l-2 5.6-5.6 2 2-5.6z" />
    </svg>
  );
}

export function SparkleIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M12 3.5l1.7 5 5 1.7-5 1.7-1.7 5-1.7-5-5-1.7 5-1.7z" />
    </svg>
  );
}

export const highlightIcons = [MountainIcon, DropletIcon, CompassIcon, SparkleIcon];

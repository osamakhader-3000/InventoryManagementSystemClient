// Line icons (24x24, stroked with currentColor) keyed by realm id / route name
const paths: Record<string, React.ReactNode> = {
    assignments: <>
        <rect x="6" y="4" width="12" height="17" rx="1.5" />
        <path d="M9 4V3h6v1" />
        <path d="M9 10h6M9 14h6M9 18h3" />
    </>,
    devices: <>
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M8 20h8M12 16v4" />
    </>,
    accessories: <>
        <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
        <rect x="3" y="14" width="4" height="6" rx="1" />
        <rect x="17" y="14" width="4" height="6" rx="1" />
    </>,
    departments: <>
        <rect x="4" y="3" width="10" height="18" />
        <path d="M14 9h6v12h-6M7 7h4M7 11h4M7 15h4M10 21v-3" />
    </>,
    locations: <>
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
    </>,
    users: <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
        <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8" />
    </>,
    triallog: <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
    </>,
    builds: <>
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
        <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
    </>,
    clients: <>
        <rect x="3" y="7" width="18" height="13" rx="1.5" />
        <path d="M9 7V4h6v3M3 12h18" />
    </>,
    'admin/users': <>
        <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" />
        <path d="M9 12l2 2 4-4" />
    </>,
    myprofile: <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
    </>,
    home: <>
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v10h14V10" />
    </>,
    list: <>
        <path d="M8 6h13M8 12h13M8 18h13" />
        <path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
    </>,
};

export function AppIcon({ name, size = 18 }: { name: string, size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {paths[name] ?? paths.list}
        </svg>
    );
}

export function ViewIconSvg({ width = 20, height = 20 }: { width?: number, height?: number }) {
    return (
        <svg width={width} height={height} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 24V12H24" stroke="black" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M40 12H52V24" stroke="black" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 52H12V40" stroke="black" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M52 40V52H40" stroke="black" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
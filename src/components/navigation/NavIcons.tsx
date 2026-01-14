import type { IconName } from "@/types/navigation.types";
import React, { type JSX } from "react";

const iconStyle: React.CSSProperties = {
    width: "16px",
    height: "16px",
    transition: "all 0.2s",
};

const getClassName = (isActive: boolean) =>
    `transition-all ${isActive ? "text-primary" : "text-muted-foreground"}`;

type IconFactory = (isActive: boolean) => JSX.Element;

const icons: Record<IconName, IconFactory> = {
    volume: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={getClassName(isActive)} style={iconStyle}>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
    ),

    lightbulb: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={getClassName(isActive)} style={iconStyle}>
            <path d="M9 21H15M12 17L12 21M12 3a6 6 0 0 1 6 6c0 3-2 5.5-2 8H8c0-2.5-2-5-2-8a6 6 0 0 1 6-6Z" />
        </svg>
    ),

    message: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={getClassName(isActive)} style={iconStyle}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    ),

    users: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={getClassName(isActive)} style={iconStyle}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),

    upload: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={getClassName(isActive)} style={iconStyle}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,5 17,10" />
            <line x1="12" y1="5" x2="12" y2="15" />
        </svg>
    ),

    book: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={getClassName(isActive)} style={iconStyle}>
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
    ),

    keyboard: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={getClassName(isActive)} style={iconStyle}>
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="6" cy="12" r=".5" />
            <circle cx="18" cy="12" r=".5" />
            <path d="M9 16h6" />
        </svg>
    ),

    logout: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="transition-all text-muted-foreground" style={iconStyle}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    ),

    notes: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={getClassName(isActive)} style={iconStyle}>
            <path d="M9 2h6a2 2 0 0 1 2 2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2-2z" />
            <path d="M9 6h6" />
            <path d="M9 10h6" />
            <path d="M9 14h4" />
        </svg>
    ),

    menu: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={getClassName(isActive)} style={iconStyle}>
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    ),

    close: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={getClassName(isActive)} style={iconStyle}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),

    moon: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="icon-sm">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    ),

    sun: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="icon-sm">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
    ),
    cards: (isActive) => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={getClassName(isActive)}
            style={iconStyle}
        >
            {/* back card */}
            <rect x="3" y="3" width="14" height="14" rx="2" ry="2" />
            {/* front card */}
            <rect x="7" y="7" width="14" height="14" rx="2" ry="2" />
        </svg>
    ),
    chevronRight: () => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="icon-sm"
            style={{ opacity: 0.7 }}
        >
            <polyline points="9,18 15,12 9,6" />
        </svg>
    ),
};

export const getIcon = (
    iconName: IconName,
    isActive: boolean = false
): JSX.Element => {
    return icons[iconName](isActive);
};

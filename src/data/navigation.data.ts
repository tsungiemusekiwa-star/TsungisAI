import type { NavItem } from "@/types/navigation.types";

// navigation.data.ts
export const coreMobileNavItems: NavItem[] = [
    { title: 'Audio', href: '/', icon: 'volume' },
    { title: 'Acronyms', href: '/acronyms', icon: 'lightbulb' },
    { title: 'Flash Cards', href: '/flash-cards', icon: 'upload' },
    { title: 'Summaries', href: '/revision-summaries', icon: 'notes' },
    { title: 'Typing', href: '/typing-game', icon: 'keyboard' }
];

export const otherFeatures: NavItem[] = [
    { title: 'Chat', href: '/chat', icon: 'message' },
    { title: 'Study', href: '/study-buddy', icon: 'users' },
    { title: 'Practice', href: '/practice', icon: 'book' }
];
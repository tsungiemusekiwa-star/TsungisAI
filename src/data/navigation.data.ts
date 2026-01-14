import type { NavItem } from "@/types/navigation.types";

// navigation.data.ts
export const coreMobileNavItems: NavItem[] = [
    { title: 'Audio', href: '/', icon: 'volume' },
    { title: 'Acronyms', href: '/acronyms', icon: 'lightbulb' },
    { title: 'Flash Cards', href: '/flash-cards', icon: 'cards' },
    { title: 'Summaries', href: '/revision-summaries', icon: 'notes' },
    { title: 'Typing', href: '/typing-game', icon: 'keyboard' }
];

export const otherFeatures: NavItem[] = [
    { title: 'Chat', href: '/chat', icon: 'message' },
    { title: 'Study', href: '/study-buddy', icon: 'users' },
    { title: 'Practice', href: '/practice', icon: 'book' }
];

export const sidebarItems: NavItem[] = [
    {
        title: 'Audio Learning',
        href: '/',
        icon: 'volume',
        description: 'Listen & Learn'
    },
    {
        title: 'Acronym Generator',
        href: '/acronyms',
        icon: 'lightbulb',
        description: 'Memory Aids'
    },
    {
        title: 'Flash Cards',
        href: '/flash-cards',
        icon: 'cards',
        description: 'Description here'
    },
    {
        title: 'Revision Summaries',
        href: '/revision-summaries',
        icon: 'notes',
        description: 'Reliable Revision Notes'
    },
    {
        title: 'Typing Game',
        href: '/typing-game',
        icon: 'keyboard',
        description: 'Master Touch Typing'
    },
    {
        title: 'Chat',
        href: '/chat',
        icon: 'message',
        description: 'Connect & Collaborate'
    },
    {
        title: 'Study Buddy',
        href: '/study-buddy',
        icon: 'users',
        description: 'Collaborative Learning'
    },
    {
        title: 'Practice Tests',
        href: '/practice',
        icon: 'book',
        description: 'Mock Exams'
    },
];
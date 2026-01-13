export type IconName =
    | "volume"
    | "lightbulb"
    | "message"
    | "users"
    | "upload"
    | "book"
    | "keyboard"
    | "logout"
    | "notes"
    | "menu"
    | "close"
    | "sun"
    | "moon";

export type NavItem = {
    title: string;
    href: string;
    icon: IconName;
};
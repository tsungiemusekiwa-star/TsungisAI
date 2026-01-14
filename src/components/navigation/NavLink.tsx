import { Link } from "react-router-dom";
import { getIcon } from "./NavIcons";

const NavLink = ({ item, isActive }: { item: any; isActive: boolean }) => {
    const linkStyle = {
        backgroundColor: isActive ? 'hsl(var(--primary) / 0.1)' : 'transparent',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '2px',
        padding: '6px',
        borderRadius: '8px',
        transition: 'all 0.2s',
        minWidth: '0',
        flex: '1',
        textDecoration: 'none'
    };

    const textStyle = {
        fontSize: '10px',
        fontWeight: '500',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as const
    };

    return (
        <Link to={item.href} className={isActive ? 'text-primary' : 'text-muted-foreground'} style={linkStyle}>
            {getIcon(item.icon, isActive)}
            <span
                className={isActive ? 'text-primary' : 'text-muted-foreground'}
                style={textStyle}
            >
                {item.title}
            </span>
        </Link>
    );
};

export default NavLink;
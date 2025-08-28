import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { Globe, Users, MapPin, Layers } from 'lucide-react'

const menuItems = [
    {
        icon: Globe,
        title: 'Global',
        description: 'Top players worldwide.',
        route: '/leaderboard/global'
    },
    {
        icon: Users,
        title: 'Friends',
        description: 'Compare with your friends.',
        route: '/leaderboard/friends'
    },
    {
        icon: MapPin,
        title: 'Country',
        description: 'Leaders in your country.',
        route: '/leaderboard/country'
    },
    {
        icon: Layers,
        title: 'By Topic',
        description: 'Rankings for each math topic.',
        route: '/leaderboard/topics'
    }
]

export default function LeaderboardMenu({ open, anchorRect, onClose, onPanelEnter, returnFocusRef }) {
    if (!open || !anchorRect) return null

    const panelStyle = {
        position: 'fixed',
        left: anchorRect.right + 8,
        top: anchorRect.top,
        zIndex: 1000
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={panelStyle}
            className="rounded-xl bg-[#141414] border border-[#2f2f2f] shadow-xl text-[#FBFAEE] py-3 px-2 min-w-[280px]"
            onMouseEnter={onPanelEnter}
            onMouseLeave={onClose}
            role="menu"
            aria-label="Leaderboard options"
        >
            {menuItems.map((item, index) => (
                <MenuItem
                    key={item.route}
                    {...item}
                    onClose={onClose}
                    returnFocusRef={returnFocusRef}
                    isFirst={index === 0}
                    isLast={index === menuItems.length - 1}
                />
            ))}
        </motion.div>
    )
}

function MenuItem({ icon: Icon, title, description, route, onClose, returnFocusRef, isFirst, isLast }) {
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault()
            onClose()
            returnFocusRef?.current?.focus()
        }
    }

    return (
        <NavLink
            to={route}
            onClick={onClose}
            onKeyDown={handleKeyDown}
            className="group flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] focus:outline-none"
            role="menuitem"
            tabIndex={isFirst ? 0 : -1}
        >
            <Icon className="w-5 h-5 text-[#FBFAEE] group-hover:text-[#933DC9] transition-colors" />
            <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#FBFAEE]">{title}</div>
                <div className="text-sm text-[#bfbfbf] truncate">{description}</div>
            </div>
        </NavLink>
    )
}



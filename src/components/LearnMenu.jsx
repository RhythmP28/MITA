import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { BookOpen, History, Star, Lightbulb } from 'lucide-react'

const PANEL_CLASSES = 'rounded-xl bg-[#141414] border border-[#2f2f2f] shadow-xl text-offwhite w-[320px] py-3 px-2 z-[1000]'

function getItems() {
    return [
        { key: 'topics', title: 'All Topics', desc: 'Browse the full library of math topics.', icon: BookOpen, to: '/learn/topics' },
        { key: 'recent', title: 'Recently Viewed', desc: 'Quickly access topics you checked out last.', icon: History, to: '/learn/recent' },
        { key: 'favorites', title: 'Favorites', desc: 'Your saved and bookmarked topics.', icon: Star, to: '/learn/favorites' },
        { key: 'suggested', title: 'Suggested Next', desc: 'Topics picked for you based on your progress.', icon: Lightbulb, to: '/learn/suggested' },
    ]
}

export default function LearnMenu({ open, anchorRect, onClose, onPanelEnter, returnFocusRef }) {
    const navigate = useNavigate()
    const location = useLocation()
    const panelRef = useRef(null)
    const items = useMemo(() => getItems(), [])
    const [activeIndex, setActiveIndex] = useState(0)

    // Close on route change
    useEffect(() => { onClose?.() }, [location.pathname])

    useEffect(() => {
        if (!open) return
        function onKeyDown(e) {
            if (e.key === 'Escape') {
                e.preventDefault()
                onClose?.()
                returnFocusRef?.current?.focus?.()
            }
            if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => (i + 1) % items.length) }
            if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => (i - 1 + items.length) % items.length) }
            if (e.key === 'Enter') {
                e.preventDefault(); const it = items[activeIndex]; if (it) { navigate(it.to); onClose?.() }
            }
            if (e.key === 'Tab') {
                const buttons = panelRef.current?.querySelectorAll('button[role="menuitem"]')
                if (!buttons || buttons.length === 0) return
                const first = buttons[0]
                const last = buttons[buttons.length - 1]
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
            }
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [open, activeIndex, items, navigate, onClose, returnFocusRef])

    useEffect(() => {
        if (open) {
            const first = panelRef.current?.querySelector('button[role="menuitem"]')
            first?.focus()
        }
    }, [open])

    if (!anchorRect) return null

    const style = { position: 'fixed', top: Math.round(anchorRect.top) - 6, left: Math.round(anchorRect.right) + 10 }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    ref={panelRef}
                    style={style}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.14, ease: 'easeOut' }}
                    className={PANEL_CLASSES}
                    role="menu"
                    aria-label="Learn options"
                    onMouseEnter={() => onPanelEnter?.()}
                    onMouseLeave={() => setTimeout(() => onClose?.(), 100)}
                >
                    {items.map((it, idx) => (
                        <MenuRow
                            key={it.key}
                            item={it}
                            active={idx === activeIndex}
                            onHover={() => setActiveIndex(idx)}
                            onClick={() => { navigate(it.to); onClose?.() }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

function MenuRow({ item, active, onHover, onClick }) {
    const Icon = item.icon
    return (
        <button
            role="menuitem"
            onMouseEnter={onHover}
            onFocus={onHover}
            onClick={onClick}
            className={`group w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-colors outline-none ${active ? 'bg-[#2a2a2a]' : 'hover:bg-[#2a2a2a] focus:bg-[#2a2a2a]'}`}
        >
            <Icon className={`w-5 h-5 ${active ? 'text-purple' : 'text-offwhite'} group-hover:text-purple transition-colors`} />
            <div className="flex-1">
                <div className={`font-semibold ${active ? 'text-purple' : ''}`}>{item.title}</div>
                <div className="text-sm text-[#bfbfbf]">{item.desc}</div>
            </div>
        </button>
    )
}





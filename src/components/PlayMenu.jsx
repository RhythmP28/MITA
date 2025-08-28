import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Sparkles, Zap, Timer, Infinity as InfinityIcon, BookOpen } from 'lucide-react'

const PANEL_CLASSES = 'rounded-xl bg-[#141414] border border-[#2f2f2f] shadow-xl text-offwhite w-[320px] p-2 z-[1000]'

function getItems() {
	return [
		{
			key: 'daily',
			title: 'Daily Challenge',
			desc: "Today’s featured problem. Keep your streak going.",
			icon: Sparkles,
			to: '/daily',
		},
		{
			key: 'quick',
			title: 'Quick Solve',
			desc: 'Start a random problem by difficulty.',
			icon: Zap,
			to: '/quick',
		},
		{
			key: 'timed',
			title: 'Solo Timed',
			desc: '10 questions in 10 minutes.',
			icon: Timer,
			to: '/timed',
		},
		{
			key: 'practice',
			title: 'Practice',
			desc: 'Continuous problems at your own pace.',
			icon: BookOpen,
			to: '/practice',
		},
	]
}

export default function PlayMenu({ open, anchorRect, onClose, onPanelEnter }) {
	const navigate = useNavigate()
	const location = useLocation()
	const panelRef = useRef(null)
	const items = useMemo(() => getItems(), [])
	const [activeIndex, setActiveIndex] = useState(0)

	useEffect(() => {
		// Close on route change
		onClose?.()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname])

	useEffect(() => {
		if (!open) return
		function onKeyDown(e) {
			if (e.key === 'Escape') {
				e.preventDefault()
				onClose?.()
			}
			if (e.key === 'ArrowDown') {
				e.preventDefault()
				setActiveIndex((i) => (i + 1) % items.length)
			}
			if (e.key === 'ArrowUp') {
				e.preventDefault()
				setActiveIndex((i) => (i - 1 + items.length) % items.length)
			}
			if (e.key === 'Enter') {
				e.preventDefault()
				const it = items[activeIndex]
				if (it) {
					navigate(it.to)
					onClose?.()
				}
			}
		}
		document.addEventListener('keydown', onKeyDown)
		return () => document.removeEventListener('keydown', onKeyDown)
	}, [open, activeIndex, items, navigate, onClose])

	if (!anchorRect) return null

	const style = {
		position: 'fixed',
		top: Math.round(anchorRect.top) - 6,
		left: Math.round(anchorRect.right) + 10,
	}

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
					aria-label="Solve options"
					onMouseEnter={() => onPanelEnter?.()}
					onMouseLeave={() => setTimeout(() => onClose?.(), 100)}
				>
					{items.map((it, idx) => (
						<MenuRow
							key={it.key}
							item={it}
							active={idx === activeIndex}
							onHover={() => setActiveIndex(idx)}
							onClick={() => {
								navigate(it.to)
								onClose?.()
							}}
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
			onMouseEnter={onHover}
			onFocus={onHover}
			onClick={onClick}
			role="menuitem"
			className={`group w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-colors outline-none ${
				active ? 'bg-[#2a2a2a]' : 'hover:bg-[#2a2a2a] focus:bg-[#2a2a2a]'
			}`}
		>
			<Icon className={`w-5 h-5 ${active ? 'text-purple' : 'text-offwhite'} group-hover:text-purple transition-colors`} />
			<div className="flex-1">
				<div className={`font-semibold ${active ? 'text-purple' : ''}`}>{item.title}</div>
				<div className="text-sm text-[#bfbfbf]">{item.desc}</div>
			</div>
		</button>
	)
}



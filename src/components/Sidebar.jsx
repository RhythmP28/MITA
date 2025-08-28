import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import {
	SigmaSquare,
	Puzzle,
	BookOpen,
	Target,
	Trophy,
	Users,
	Ellipsis,
	Search,
	Globe,
	HelpCircle,
} from 'lucide-react'
import PlayMenu from './PlayMenu'
import PuzzlesMenu from './PuzzlesMenu'
import LearnMenu from './LearnMenu'
import CompeteMenu from './CompeteMenu'
import LeaderboardMenu from './LeaderboardMenu'
import SocialMenu from './SocialMenu'

const navLinkBase =
	'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-offwhite hover:bg-[rgba(147,61,201,0.15)] text-lg'

export default function Sidebar() {
    const navigate = useNavigate()
    const [logoFailed, setLogoFailed] = useState(false)
    const [activeMenu, setActiveMenu] = useState(null) // 'play', 'puzzles', 'learn', 'compete', 'leaderboard', 'social', or null
    const [anchorRect, setAnchorRect] = useState(null)
    const playRef = useRef(null)
    const puzzlesRef = useRef(null)
    const learnRef = useRef(null)
    const competeRef = useRef(null)
    const leaderboardRef = useRef(null)
    const socialRef = useRef(null)
    const navRef = useRef(null)

    const openMenu = (menuType) => {
        setActiveMenu(menuType)
        const ref = menuType === 'play' ? playRef : menuType === 'puzzles' ? puzzlesRef : menuType === 'learn' ? learnRef : menuType === 'compete' ? competeRef : menuType === 'leaderboard' ? leaderboardRef : socialRef
        const rect = ref.current?.getBoundingClientRect()
        setAnchorRect(rect)
    }

    const closeMenu = () => {
        setActiveMenu(null)
        setAnchorRect(null)
    }

    const handleNavMouseMove = (e) => {
        if (!navRef.current) return
        
        const navRect = navRef.current.getBoundingClientRect()
        const mouseY = e.clientY - navRect.top
        
        // Get the positions of each menu item
        const playRect = playRef.current?.getBoundingClientRect()
        const puzzlesRect = puzzlesRef.current?.getBoundingClientRect()
        const learnRect = learnRef.current?.getBoundingClientRect()
        const competeRect = competeRef.current?.getBoundingClientRect()
        const leaderboardRect = leaderboardRef.current?.getBoundingClientRect()
        const socialRect = socialRef.current?.getBoundingClientRect()
        
        if (!playRect || !puzzlesRect || !learnRect || !competeRect || !leaderboardRect || !socialRect) return
        
        // Calculate distances from mouse to each menu center
        const playCenter = playRect.top + playRect.height / 2 - navRect.top
        const puzzlesCenter = puzzlesRect.top + puzzlesRect.height / 2 - navRect.top
        const learnCenter = learnRect.top + learnRect.height / 2 - navRect.top
        const competeCenter = competeRect.top + competeRect.height / 2 - navRect.top
        const leaderboardCenter = leaderboardRect.top + leaderboardRect.height / 2 - navRect.top
        const socialCenter = socialRect.top + socialRect.height / 2 - navRect.top
        
        const playDistance = Math.abs(mouseY - playCenter)
        const puzzlesDistance = Math.abs(mouseY - puzzlesCenter)
        const learnDistance = Math.abs(mouseY - learnCenter)
        const competeDistance = Math.abs(mouseY - competeCenter)
        const leaderboardDistance = Math.abs(mouseY - leaderboardCenter)
        const socialDistance = Math.abs(mouseY - socialCenter)
        
        // Find the closest menu
        const minDistance = Math.min(playDistance, puzzlesDistance, learnDistance, competeDistance, leaderboardDistance, socialDistance)
        
        if (minDistance === playDistance) {
            openMenu('play')
        } else if (minDistance === puzzlesDistance) {
            openMenu('puzzles')
        } else if (minDistance === learnDistance) {
            openMenu('learn')
        } else if (minDistance === competeDistance) {
            openMenu('compete')
        } else if (minDistance === leaderboardDistance) {
            openMenu('leaderboard')
        } else {
            openMenu('social')
        }
    }

	return (
        <aside className="fixed left-0 top-0 h-full w-20 md:w-64 bg-sidebar text-offwhite px-3 md:px-4 py-4 flex flex-col z-[1100]">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 px-3 py-3 mb-4"
                aria-label="Mita Home"
            >
                {!logoFailed ? (
                    <img
                        src="/mita-logo.png"
                        alt="Mita logo"
                        className="w-10 h-10 object-contain"
                        onError={() => setLogoFailed(true)}
                    />
                ) : (
                    <div className="w-9 h-9 grid place-items-center bg-purple rounded-lg font-bold">M</div>
                )}
                <span className="hidden md:inline text-lg font-bold">Mita</span>
            </button>

            <nav 
                ref={navRef}
                className="flex-1 flex flex-col justify-between relative"
                onMouseMove={handleNavMouseMove}
                onMouseLeave={() => setTimeout(() => closeMenu(), 100)}
            >
                <div
                    ref={playRef}
                    className="relative z-10"
                >
                    <SidebarLink
                        to="/solve"
                        icon={SigmaSquare}
                        label="Solve"
                        buttonProps={{
                            'aria-haspopup': 'menu',
                            'aria-expanded': activeMenu === 'play',
                            onFocus: () => openMenu('play'),
                            onKeyDown: (e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    if (activeMenu === 'play') closeMenu()
                                    else openMenu('play')
                                }
                            },
                        }}
                    />
                </div>
                <div
                    ref={puzzlesRef}
                    className="relative z-10"
                >
                    <SidebarLink
                        to="/puzzles"
                        icon={Puzzle}
                        label="Puzzles"
                        buttonProps={{
                            'aria-haspopup': 'menu',
                            'aria-expanded': activeMenu === 'puzzles',
                            onFocus: () => openMenu('puzzles'),
                            onKeyDown: (e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    if (activeMenu === 'puzzles') closeMenu()
                                    else openMenu('puzzles')
                                }
                            },
                        }}
                    />
                </div>
                <div
                    ref={learnRef}
                    className="relative z-10"
                >
                    <SidebarLink
                        to="/learn"
                        icon={BookOpen}
                        label="Learn"
                        buttonProps={{
                            'aria-haspopup': 'menu',
                            'aria-expanded': activeMenu === 'learn',
                            onFocus: () => openMenu('learn'),
                            onKeyDown: (e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    if (activeMenu === 'learn') closeMenu()
                                    else openMenu('learn')
                                }
                            },
                        }}
                    />
                </div>
                <div
                    ref={competeRef}
                    className="relative z-10"
                >
                    <SidebarLink
                        to="/compete"
                        icon={Target}
                        label="Compete"
                        buttonProps={{
                            'aria-haspopup': 'menu',
                            'aria-expanded': activeMenu === 'compete',
                            onFocus: () => openMenu('compete'),
                            onKeyDown: (e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    if (activeMenu === 'compete') closeMenu()
                                    else openMenu('compete')
                                }
                            },
                        }}
                    />
                </div>
                <div
                    ref={leaderboardRef}
                    className="relative z-10"
                >
                    <SidebarLink
                        to="/leaderboard"
                        icon={Trophy}
                        label="Leaderboard"
                        buttonProps={{
                            'aria-haspopup': 'menu',
                            'aria-expanded': activeMenu === 'leaderboard',
                            onFocus: () => openMenu('leaderboard'),
                            onKeyDown: (e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    if (activeMenu === 'leaderboard') closeMenu()
                                    else openMenu('leaderboard')
                                }
                            },
                        }}
                    />
                </div>
                <div
                    ref={socialRef}
                    className="relative z-10"
                >
                    <SidebarLink
                        to="/social"
                        icon={Users}
                        label="Social"
                        buttonProps={{
                            'aria-haspopup': 'menu',
                            'aria-expanded': activeMenu === 'social',
                            onFocus: () => openMenu('social'),
                            onKeyDown: (e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    if (activeMenu === 'social') closeMenu()
                                    else openMenu('social')
                                }
                            },
                        }}
                    />
                </div>
                <SidebarLink to="/more" icon={Ellipsis} label="More" />
            </nav>

            <div className="flex flex-col gap-3 mt-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-offwhite/60" />
                    <input
                        className="w-full bg-[#1f1f1f] text-offwhite/90 rounded-lg pl-9 pr-3 py-2 placeholder:text-offwhite/50 outline-none focus:ring-2 focus:ring-purple/60"
                        placeholder="Search"
                    />
                </div>
                <button className="bg-purple hover:bg-purpleDark text-offwhite rounded-lg px-4 py-2 font-bold transition-all duration-300">Sign Up</button>
                <button className="border border-offwhite/20 hover:border-offwhite/40 text-offwhite rounded-lg px-4 py-2 font-bold transition-all duration-300">Log In</button>
                <div className="flex items-center justify-between gap-2 text-offwhite/80">
                    <button className="flex items-center gap-2 hover:text-offwhite transition-colors">
                        <Globe className="w-4 h-4" />
                        <span className="hidden md:inline">English</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-offwhite transition-colors">
                        <HelpCircle className="w-4 h-4" />
                        <span className="hidden md:inline">Support</span>
                    </button>
                </div>
            </div>
            <PlayMenu
                open={activeMenu === 'play'}
                anchorRect={anchorRect}
                onPanelEnter={() => openMenu('play')}
                onClose={closeMenu}
            />
            <PuzzlesMenu
                open={activeMenu === 'puzzles'}
                anchorRect={anchorRect}
                onPanelEnter={() => openMenu('puzzles')}
                onClose={closeMenu}
                returnFocusRef={puzzlesRef}
            />
            <LearnMenu
                open={activeMenu === 'learn'}
                anchorRect={anchorRect}
                onPanelEnter={() => openMenu('learn')}
                onClose={closeMenu}
                returnFocusRef={learnRef}
            />
            <CompeteMenu
                open={activeMenu === 'compete'}
                anchorRect={anchorRect}
                onPanelEnter={() => openMenu('compete')}
                onClose={closeMenu}
                returnFocusRef={competeRef}
            />
            <LeaderboardMenu
                open={activeMenu === 'leaderboard'}
                anchorRect={anchorRect}
                onPanelEnter={() => openMenu('leaderboard')}
                onClose={closeMenu}
                returnFocusRef={leaderboardRef}
            />
            <SocialMenu
                open={activeMenu === 'social'}
                anchorRect={anchorRect}
                onPanelEnter={() => openMenu('social')}
                onClose={closeMenu}
                returnFocusRef={socialRef}
            />
        </aside>
	)
}

function SidebarLink({ to, icon: Icon, label, buttonProps }) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`${navLinkBase} ${
					isActive ? 'bg-purple/25 ring-1 ring-purple/40' : 'bg-transparent'
				}`
			}
			{...buttonProps}
		>
			<Icon className="w-5 h-5" />
			<span className="hidden md:inline">{label}</span>
		</NavLink>
	)
}



import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const navItems = [
  {
    path: '/',
    label: '首页',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 2} strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    path: '/analytics',
    label: '分析',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 2} strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    )
  },
  {
    path: '/life-tree',
    label: '生命树',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
        <path d="M50 90C40 60 20 50 15 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
        <path d="M50 90C45 60 35 40 30 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        <path d="M50 90C55 60 75 50 85 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        <path d="M50 90C60 70 70 40 75 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
        <path d="M50 90C50 60 50 30 50 15" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    path: '/trace',
    label: '痕迹',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  },
  {
    path: '/profile',
    label: '我的',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] flex items-center justify-around px-2 py-2 pb-[env(safe-area-inset-bottom,8px)] bg-surface/92 backdrop-blur-glass border-t border-white/5 z-50">
      {navItems.map((item) => {
        const active = isActive(item.path)
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 min-w-[56px] ${
              active ? 'text-training' : 'text-outline hover:text-on-surface-variant'
            }`}
          >
            <motion.div
              animate={{ scale: active ? 1.08 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {item.icon(active)}
            </motion.div>
            <span className={`text-[10px] font-medium font-body ${active ? 'font-semibold' : ''}`}>
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

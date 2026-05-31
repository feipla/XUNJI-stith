import { useNavigate } from 'react-router-dom'
import LifeTreeIcon from '../life-tree/LifeTreeMiniIcon'

export default function AppHeader() {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-surface/85 backdrop-blur-glass border-b border-white/5">
      <button
        onClick={() => navigate('/profile')}
        className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-white/5 transition-colors"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>

      <h1 className="font-display text-xl font-bold tracking-tight text-on-surface">
        循迹
      </h1>

      <div className="flex items-center gap-1">
        <button
          onClick={() => navigate('/life-tree')}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
        >
          <LifeTreeIcon size={26} />
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface relative transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-training rounded-full ring-2 ring-surface" />
        </button>
      </div>
    </header>
  )
}

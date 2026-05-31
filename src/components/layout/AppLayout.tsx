import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader'
import BottomNav from './BottomNav'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-surface flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen relative bg-surface flex flex-col shadow-2xl">
        <AppHeader />
        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24 scrollbar-hide">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}

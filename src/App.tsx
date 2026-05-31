import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import HomePage from './pages/HomePage'
import AnalyticsPage from './pages/AnalyticsPage'
import LifeTreePage from './pages/LifeTreePage'
import TracePage from './pages/TracePage'
import ActivityDetailPage from './pages/ActivityDetailPage'
import ProfilePage from './pages/ProfilePage'
import AppLayout from './components/layout/AppLayout'

function App() {
  const location = useLocation()

  return (
    <AppLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route="/life-tree" element={<LifeTreePage />} />
          <Route path="/trace" element={<TracePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/activity/:id" element={<ActivityDetailPage />} />
        </Routes>
      </AnimatePresence>
    </AppLayout>
  )
}

export default App

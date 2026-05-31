import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const mockActivities = [
  {
    id: '1',
    date: '今天',
    distance: 5.2,
    duration: "4'50\"",
    indicatorColor: '#2DD4BF',
    icon: '🏃',
  },
  {
    id: '2',
    date: '周二，14日',
    distance: 8.0,
    duration: "5'12\"",
    indicatorColor: '#FF5733',
    icon: '📅',
  },
]

interface ActivityListProps {
  onViewAll?: () => void
}

export default function ActivityList({ onViewAll }: ActivityListProps) {
  const navigate = useNavigate()

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-[17px] font-semibold text-on-surface">
          近期活动
        </h2>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-primary hover:text-on-primary-container transition-colors"
        >
          查看全部
        </button>
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-2 gap-3">
        {mockActivities.map((activity, index) => (
          <motion.button
            key={activity.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            onClick={() => navigate(`/activity/${activity.id}`)}
            className="surface-card p-4 text-left hover:bg-surface-container transition-all active:scale-[0.97]"
          >
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-sm">{activity.icon}</span>
              <span className="font-mono text-[11px] text-outline">
                {activity.date}
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-0.5">
              <span className="font-mono text-lg font-semibold text-on-surface">
                {activity.distance}km
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-on-surface-variant">
                {activity.duration}
              </span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activity.indicatorColor }}
              />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import RecoveryGauge from '../components/ui/RecoveryGauge'
import AIInsightCard from '../components/ai-insight/AIInsightCard'
import ActivityList from '../components/activity/ActivityList'
import LifeTreeIcon from '../components/life-tree/LifeTreeMiniIcon'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="px-6 pt-2 pb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      {/* Greeting Section */}
      <motion.div variants={itemVariants} className="flex items-start justify-between mb-1">
        <div>
          <p className="text-body-sm text-on-surface-variant mb-0.5">
            你好，跑者
          </p>
          <p className="text-body-sm text-on-surface-variant">
            准备好今天的训练了吗？
          </p>
        </div>
        <LifeTreeIcon size={56} />
      </motion.div>

      {/* Recovery Gauge */}
      <motion.div variants={itemVariants} className="flex justify-center my-8">
        <RecoveryGauge value={85} />
      </motion.div>

      {/* AI Insight Card */}
      <motion.div variants={itemVariants} className="mb-6">
        <AIInsightCard
          status="状态极佳"
          content={
            <>
              昨天的恢复充分，今日适合进行间歇跑训练。建议保持心率在 Zone 4 进行高强度刺激。
            </>
          }
        />
      </motion.div>

      {/* Upload CTA Button */}
      <motion.button
        variants={itemVariants}
        onClick={() => navigate('/activity/new')}
        className="w-full py-4 rounded-xl bg-btn-primary text-white font-display font-semibold text-[15px] flex items-center justify-center gap-3 btn-glow-orange active:scale-[0.98] transition-transform"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        上传跑步数据
      </motion.button>

      {/* Recent Activities */}
      <motion.div variants={itemVariants} className="mt-8">
        <ActivityList onViewAll={() => navigate('/trace')} />
      </motion.div>

      {/* Manual Entry */}
      <motion.button
        variants={itemVariants}
        className="w-full mt-4 py-4 rounded-xl surface-card flex items-center justify-center gap-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all active:scale-[0.98]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span className="text-sm font-medium">手动补录数据</span>
      </motion.button>
    </motion.div>
  )
}

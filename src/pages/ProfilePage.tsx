import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const menuItems = [
  { icon: '📊', label: '数据导出', desc: '导出所有跑步记录' },
  { icon: '⚙️', label: '偏好设置', desc: '单位、通知、显示选项' },
  { icon: '🔔', label: '消息通知', desc: '2条未读消息' },
  { icon: '❓', label: '帮助与反馈', desc: '使用指南、问题反馈' },
  { icon: 'ℹ️', label: '关于循迹', desc: '版本 0.1.0 · 循身体之迹' },
]

export default function ProfilePage() {
  return (
    <div className="px-6 pt-4 pb-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0 }}
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-container to-surface-container-high border-2 border-white/10 flex items-center justify-center mb-4">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#b9c7e4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h2 className="font-display text-lg font-semibold text-on-surface mb-1">跑者</h2>
          <p className="font-mono text-label-caps text-outline">Lv.12 绚烂期</p>
        </motion.div>

        {/* Stats Summary */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 mb-8">
          {[
            { value: '248', label: '总跑数' },
            { value: '176km', label: '本月跑量' },
            { value: '14天', label: '连续记录' },
          ].map((stat) => (
            <div key={stat.label} className="surface-card p-3 text-center">
              <span className="font-mono text-data-display text-on-surface block">{stat.value}</span>
              <span className="font-mono text-[9px] text-outline uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              variants={itemVariants}
              className="w-full surface-card p-4 flex items-center gap-4 hover:bg-surface-container transition-all active:scale-[0.99] text-left"
            >
              <span className="text-xl w-8 text-center">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-display text-[14px] font-medium text-on-surface">{item.label}</p>
                <p className="text-body-sm text-outline truncate">{item.desc}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8f9097" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>
          ))}
        </div>

        {/* Version */}
        <motion.p
          variants={itemVariants}
          className="text-center font-mono text-[10px] text-outline/50 mt-8"
        >
          循迹 v0.1.0 · 循身体之迹，见前行之路
        </motion.p>
      </motion.div>
    </div>
  )
}

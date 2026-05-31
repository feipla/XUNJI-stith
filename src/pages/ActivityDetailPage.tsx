import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const mockData = {
  title: '晨跑赛程评估',
  date: 'Oct 24, 2023',
  time: '06:30 AM',
  distance: 8.42,
  duration: '45:12',
  avgHR: 152,
  maxHR: 174,
  recoveryHours: 22,
  recoveryProgress: 65,
  commentary: [
    '你的有氧能力有明显提升。从过去两周的数据来看，你的平均配速稳定在5\'15"/km左右，而心率却降低了约3bpm，这意味着相同强度下你的心肺效率正在提高。',
    '从本次跑步的心率区间分布来看，你在Zone 2-3的时间占比达到75%，这是非常理想的耐力基础训练比例。说明你很好地执行了"轻松跑应该真正轻松"的原则。',
    '注意到了吗？你的步频从上周的168spm提升到了172spm，这是一个积极的信号——更高的步频通常意味着更小的着地冲击和更好的跑步经济性。',
  ],
  nextSuggestion: {
    type: '30分钟低强度恢复跑',
    paceRange: '6:30-7:00/km',
    targetZone: 'Z1-Z2',
    note: '重点关注步频稳定性，让身体在低强度下完成主动恢复。避免任何形式的冲刺或爬坡。',
  },
  hrZones: [
    { zone: 'Z1', percentage: 15, minutes: 7 },
    { zone: 'Z2', percentage: 35, minutes: 16 },
    { zone: 'Z3', percentage: 40, minutes: 18 },
    { zone: 'Z4', percentage: 8, minutes: 4 },
    { zone: 'Z5', percentage: 2, minutes: 1 },
  ],
}

const zoneColors = ['#2DD4BF', '#3cddc7', '#FACC15', '#FB923C', '#FF5733']

export default function ActivityDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <motion.div
      className="px-6 pt-4 pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      {/* Back Header */}
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/')}
          className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      </motion.div>

      {/* Title */}
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="font-display text-headline-md font-semibold text-on-surface mb-1">
          {mockData.title}
        </h1>
        <p className="font-mono text-label-caps text-outline">
          {mockData.date} · {mockData.time}
        </p>
      </motion.div>

      {/* Image Preview */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="relative rounded-xl overflow-hidden bg-surface-container-low border border-white/5">
          <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-surface-container/50 to-surface-container-low">
            <img
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smartwatch%20running%20app%20completion%20screen%20with%20green%20running%20figure%20on%20dark%20background%20digital%20display&image_size=landscape_4_3"
              alt="手表截图"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="font-mono text-[11px] text-white/70 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
              Source Image Extracted
            </span>
            <button className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Data Metrics Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-6">
        {[
          { icon: '📏', label: '距离', value: `${mockData.distance} km`, color: '' },
          { icon: '⏱', label: '时长', value: mockData.duration, color: '' },
          { icon: '❤️', label: '平均心率', value: `${mockData.avgHR} bpm`, color: '#FF5733' },
          { icon: '💓', label: '最高心率', value: `${mockData.maxHR} bpm`, color: '#2DD4BF' },
        ].map((metric) => (
          <div key={metric.label} className="data-card p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span className="text-xs">{metric.icon}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-outline">
                {metric.label}
              </span>
            </div>
            <div
              className="font-mono text-xl font-semibold tracking-tight"
              style={{ color: metric.color || undefined }}
            >
              {metric.value}
            </div>
          </div>
        ))}
      </motion.div>

      {/* AI Commentary */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary-container to-tertiary-container flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b9c7e4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
              </svg>
            </div>
            <h3 className="font-display text-sm font-semibold text-primary">
              AI 深度点评
            </h3>
          </div>
          <div className="space-y-3">
            {mockData.commentary.map((paragraph, i) => (
              <p key={i} className="font-body text-[14px] leading-relaxed text-on-surface-variant">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recovery Time */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="data-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="font-mono text-[11px] uppercase tracking-wider text-recovery">
              预计恢复时间
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-mono text-data-display text-on-surface">
              {mockData.recoveryHours}小时
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-recovery to-tertiary"
              initial={{ width: 0 }}
              animate={{ width: `${mockData.recoveryProgress}%` }}
              transition={{ duration: 1.2, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
        </div>
      </motion.div>

      {/* Next Step Suggestion */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="rounded-xl border border-secondary/15 bg-gradient-to-br from-secondary/8 to-transparent p-5">
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffb4a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            <span className="font-display text-sm font-semibold text-secondary">
              下一步建议
            </span>
          </div>
          <div className="space-y-2.5">
            <p className="text-body-sm text-on-surface">
              <span className="text-secondary font-medium">明日建议：</span>{' '}
              {mockData.nextSuggestion.type}
            </p>
            <p className="text-body-sm text-on-surface-variant">
              配速控制在{mockData.nextSuggestion.paceRange}，目标心率保持在{' '}
              <span className="text-recovery font-medium">{mockData.nextSuggestion.targetZone}</span>
            </p>
            <p className="text-body-sm text-outline">
              {mockData.nextSuggestion.note}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Heart Rate Zones */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-[15px] font-semibold text-on-surface">
            心率区间分布
          </h3>
          <button className="w-7 h-7 rounded-md surface-card flex items-center justify-center text-outline hover:text-on-surface-variant transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
          </button>
        </div>

        <div className="data-card p-5">
          <div className="space-y-3">
            {mockData.hrZones.map((zone, index) => (
              <div key={zone.zone} className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-outline w-6 flex-shrink-0">
                  {zone.zone}
                </span>
                <div className="flex-1 h-6 rounded bg-surface-container-high overflow-hidden relative">
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 rounded"
                    style={{ backgroundColor: zoneColors[index] }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(zone.percentage * 2, 8)}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 1.2 + index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                </div>
                <span className="font-mono text-[11px] text-outline w-12 text-right flex-shrink-0">
                  {zone.minutes}:{String((index + 1) * 34).padStart(2, '0')}s
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

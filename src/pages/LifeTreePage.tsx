import { motion } from 'framer-motion'
import { useState } from 'react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

const mockData = {
  level: 12,
  phaseName: '绚烂期',
  phaseSlogan: '绚烂如焰，生生不息',
  totalRuns: 248,
  totalDistance: 12450,
  streakDays: 14,
  nextLevel: 13,
  xpToNextPercent: 75,
  xpToNextRemaining: 750,
  badges: [
    { id: 1, name: '幼苗萌芽', icon: '🌱', locked: true },
    { id: 2, name: '致敬千禾', icon: '⚡', locked: false },
    { id: 3, name: '晋耀星皇', icon: '⭐', locked: false },
  ],
  growthLog: [
    { time: '今天 08:30', title: '晨跑 10.24日', desc: '中心火焰绽放出了一个新的光芒。', xp: '+23分' },
    { time: '昨天', title: '跑后恢复蓄势中', desc: '连养了两天，获得1颗星。', xp: '+19分' },
    { time: '3天前', title: '夜跑完成', desc: '月光下的脚步格外轻盈。', xp: '+31分' },
  ],
  nextPhase: {
    name: 'Aurora 极光期',
    description: '达到 Lv.13 后，你的生命之焰将开始酝酿极光般的光辉。保持继续活跃 2 天，即可触发极光共鸣。',
  },
}

function LifeTreeSVG({ size = 220 }: { size?: number }) {
  const cx = size / 2
  const cy = size * 0.9
  const beams = [
    { endX: cx - size * 0.35, endY: cy - size * 0.45, color: '#2DD4BF', delay: 0 },
    { endX: cx - size * 0.2, endY: cy - size * 0.6, color: '#A78BFA', delay: 0.15 },
    { endX: cx + size * 0.35, endY: cy - size * 0.45, color: '#FB923C', delay: 0.25 },
    { endX: cx + size * 0.25, endY: cy - size * 0.55, color: '#F472B6', delay: 0.35 },
    { endX: cx, endY: cy - size * 0.75, color: '#FACC15', delay: 0.5, thick: true },
  ]

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="treeGlow" cx={cx} cy={cy} r="1" gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(0 0) scale(${size * 0.22})`}>
          <stop stopColor="white" stopOpacity="0.35"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Base glow */}
      <circle cx={cx} cy={cy} r={size * 0.16} fill="url(#treeGlow)}" opacity="0.5"/>

      {/* Beams */}
      {beams.map((beam, i) => (
        <g key={i}>
          <motion.path
            d={`M${cx}${cy}C${cx}${cy - size * 0.3} ${cx + (beam.endX - cx) * 0.5}${cy - size * 0.45} ${beam.endX}${beam.endY}`}
            stroke={beam.color}
            strokeWidth={beam.thick ? 3 : 2}
            strokeLinecap="round"
            opacity={0.85 - i * 0.08}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.2,
              delay: beam.delay + 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
          <circle cx={beam.endX} cy={beam.endY} r={beam.thick ? 3 : 2} fill={beam.color}>
            <animate attributeName="r"
              values={`${beam.thick ? 2.8 : 1.8};${beam.thick ? 3.5 : 2.5};${beam.thick ? 2.8 : 1.8}`}
              dur={`${1.8 + i * 0.3}s`}
              repeatCount="indefinite" />
            <animate attributeName="opacity"
              values="0.6;1;0.6"
              dur={`${2 + i * 0.2}s`}
              repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Ground line */}
      <line x1={cx - size * 0.38} y1={cy} x2={cx + size * 0.38} y2={cy}
        stroke="#323537" strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function LifeTreePage() {
  const [activeTab, setActiveTab] = useState<'log' | 'preview'>('log')

  return (
    <div className="px-6 pt-4 pb-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0 }}
      >
        {/* Title */}
        <motion.h1 variants={itemVariants}
          className="font-display text-headline-md font-semibold text-on-surface text-center mb-1">
          生命之焰成长轨迹
        </motion.h1>

        {/* Life Tree SVG */}
        <motion.div variants={itemVariants} className="flex justify-center my-6">
          <LifeTreeSVG />
        </motion.div>

        {/* Level Badge */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <span className="font-mono text-label-caps text-recovery">Lv. {mockData.level}</span>
        </motion.div>

        {/* Phase Name */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="font-display text-[28px] font-bold text-on-surface tracking-tight mb-1">
            {mockData.phaseName}
          </h2>
          <p className="text-body-sm text-on-surface-variant">
            {mockData.phaseSlogan}
          </p>
        </motion.div>

        {/* Stats Panel */}
        <motion.div variants={itemVariants} className="grid grid-cols-4 gap-2 mb-6">
          {[
            { icon: '👟', label: '总跑数', value: mockData.totalRuns.toString() },
            { icon: '📏', label: '总里程', value: (mockData.totalDistance / 1000).toFixed(1) + 'k' },
            { icon: '🔥', label: '连续天数', value: `${mockData.streakDays}天` },
            { icon: '⬆', label: '下一级', value: `Lv.${mockData.nextLevel}`, isProgress: true },
          ].map((stat) => (
            <div key={stat.label} className="surface-card p-3 text-center relative overflow-hidden">
              {stat.isProgress && (
                <>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-container-high rounded-b-md overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-recovery to-tertiary rounded-b-md"
                      initial={{ width: 0 }}
                      animate={{ width: `${mockData.xpToNextPercent}%` }}
                      transition={{ duration: 1.5, delay: 1.5 }}
                    />
                  </div>
                </>
              )}
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs">{stat.icon}</span>
                <span className="font-mono text-[9px] text-outline uppercase tracking-wider">{stat.label}</span>
                <span className="font-mono text-sm font-semibold text-on-surface">{stat.value}</span>
              </div>
              {stat.isProgress && (
                <span className="font-mono text-[9px] text-outline mt-0.5">{mockData.xpToNextPercent}%</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Badges Section */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-[15px] font-semibold text-on-surface">
              勋章系统
            </h3>
            <button className="text-xs font-medium text-primary hover:text-on-primary-container transition-colors">
              查看全部
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {mockData.badges.map((badge) => (
              <div
                key={badge.id}
                className={`surface-card p-4 text-center relative ${
                  badge.locked ? 'opacity-50' : ''
                }`}
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-surface-container flex items-center justify-center text-xl">
                  {badge.icon}
                </div>
                <span className="font-display text-[11px] font-medium text-on-surface block truncate">
                  {badge.name}
                </span>
                {badge.locked && (
                  <div className="absolute inset-0 flex items-end justify-center pb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8f9097" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Growth Log / Preview Tabs */}
        <motion.div variants={itemVariants}>
          <div className="flex gap-2 mb-4 surface-card p-1 rounded-full">
            <button
              onClick={() => setActiveTab('log')}
              className={`flex-1 py-2 px-4 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all ${
                activeTab === 'log'
                  ? 'bg-surface-container-high text-on-surface shadow-sm'
                  : 'text-outline hover:text-on-surface-variant'
              }`}
            >
              成长日志
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-2 px-4 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all ${
                activeTab === 'preview'
                  ? 'bg-surface-container-high text-on-surface shadow-sm'
                  : 'text-outline hover:text-on-surface-variant'
              }`}
            >
              下级预览
            </button>
          </div>

          {activeTab === 'log' ? (
            <div className="space-y-3">
              {mockData.growthLog.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                  className="surface-card p-4 border-l-2 border-l-tertiary/50"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary mt-1.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] text-outline">
                          {entry.time}
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-success">
                          {entry.xp}
                        </span>
                      </div>
                      <p className="font-display text-[13px] font-medium text-on-surface mb-0.5">
                        {entry.title}
                      </p>
                      <p className="text-body-sm text-on-surface-variant">
                        {entry.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-container to-tertiary-container flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b9c7e4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
                  </svg>
                </div>
                <h3 className="font-display text-sm font-semibold text-primary">
                  下级预测：{mockData.nextPhase.name}
                </h3>
              </div>
              <p className="text-body-sm text-on-surface leading-relaxed mb-4">
                {mockData.nextPhase.description}
              </p>
              <button className="w-full py-2.5 rounded-lg bg-secondary/10 text-secondary font-display text-[13px] font-semibold border border-secondary/20 hover:bg-secondary/15 transition-all">
                查看 Lv.{mockData.nextLevel} 预览
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

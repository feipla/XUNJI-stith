import { useState } from 'react'
import { motion } from 'framer-motion'
import ReactECharts from 'echarts-for-react'

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

const timeTabs = ['周', '月', '年']

const milestones = [
  { icon: '🏆', type: '个人最佳', title: '5K 跑 · 21:45', meta: '3天前达成' },
  { icon: '🎯', type: '连续性', title: '14 天连续达标', meta: 'Zone 2 容量目标达成!' },
  { icon: '💪', type: '适应性', title: '静息心率 -3bpm', meta: '月度趋势向好' },
]

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState(1)

  const trendChartOption = {
    grid: { top: 30, right: 20, bottom: 30, left: 40 },
    xAxis: {
      type: 'category',
      data: ['第1周', '第2周', '第3周', '当前'],
      axisLine: { lineStyle: { color: '#323537' } },
      axisLabel: { color: '#8f9097', fontSize: 10, fontFamily: 'JetBrains Mono' },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      min: 40,
      max: 65,
      splitLine: { lineStyle: { color: '#272a2c', type: 'dashed' } },
      axisLabel: { color: '#8f9097', fontSize: 10, fontFamily: 'JetBrains Mono' },
      axisLine: { show: false },
    },
    series: [
      {
        data: [46, 50, 54, 61],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: '#b9c7e4' },
        itemStyle: {
          color: '#b9c7e4',
          borderColor: '#101415',
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(185, 199, 228, 0.25)' },
              { offset: 1, color: 'rgba(185, 199, 228, 0)' },
            ],
          },
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1d2022',
      borderColor: '#323537',
      textStyle: { color: '#e0e3e5', fontFamily: 'JetBrains Mono', fontSize: 12 },
      formatter: (params: any) => `${params[0].name}<br/>VO2Max: <b>${params[0].data}</b>`,
    },
  }

  const radarOption = {
    radar: {
      indicator: [
        { name: '负荷高', max: 100, color: '#8f9097' },
        { name: '睡眠良好', max: 100, color: '#8f9097' },
        { name: 'HRV稳定', max: 100, color: '#8f9097' },
        { name: '适应性', max: 100, color: '#8f9097' },
        { name: '恢复充分', max: 100, color: '#8f9097' },
      ],
      shape: 'polygon',
      radius: '60%',
      axisName: {
        color: '#c5c6cd',
        fontSize: 11,
        fontFamily: 'Inter',
      },
      splitArea: {
        areaStyle: {
          color: ['#191c1e', '#1d2022'],
        },
      },
      axisLine: { lineStyle: { color: '#323537' } },
      splitLine: { lineStyle: { color: '#272a2c' } },
    },
    series: [{
      type: 'radar',
      data: [{
        value: [72, 85, 78, 82, 88],
        name: '理想状态',
        lineStyle: { width: 2, color: '#2DD4BF' },
        itemStyle: { color: '#2DD4BF' },
        areaStyle: {
          color: 'rgba(45, 212, 191, 0.12)',
        },
        symbol: 'circle',
        symbolSize: 5,
      }],
    }],
  }

  return (
    <div className="px-6 pt-4 pb-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0 }}
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="font-display text-headline-md font-semibold text-on-surface mb-1">
            长期趋势
          </h1>
          <p className="text-body-sm text-on-surface-variant">
            分析你的表现和恢复轨迹
          </p>
        </motion.div>

        {/* Time Tabs */}
        <motion.div variants={itemVariants} className="flex gap-2 surface-card p-1 rounded-full mb-6">
          {timeTabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`flex-1 py-2 px-4 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all ${
                activeTab === index
                  ? 'bg-surface-container-high text-on-surface shadow-sm'
                  : 'text-outline hover:text-on-surface-variant'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Health Prediction AI Card */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="glass-card p-6">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-container to-tertiary-container flex items-center justify-center mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b9c7e4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
              </svg>
            </div>
            <h3 className="font-display text-[15px] font-semibold text-primary mb-2">
              健康预测
            </h3>
            <p className="text-body-sm text-on-surface-variant leading-relaxed mb-4">
              基于你过去 30 天的负荷及稳定的睡眠架构，我们计算出你的最大摄氧量在下一个大周期将提升 +4.2%。维持当前的低强度容量以确保适应性。
            </p>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-recovery block mb-1">
                预测 VO2 Max
              </span>
              <span className="font-mono text-data-display text-recovery">
                54.8
              </span>
            </div>
          </div>
        </motion.div>

        {/* Fitness Level Trend */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="data-card p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-label-caps text-outline uppercase">
                健身水平趋势
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-training/15 text-training border border-training/25">
                巅峰期
              </span>
            </div>
            <ReactECharts
              option={trendChartOption}
              style={{ height: 180 }}
              opts={{ renderer: 'svg' }}
              notMerge={true}
              lazyUpdate={true}
            />
          </div>
        </motion.div>

        {/* Recovery Balance Radar */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="data-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-label-caps text-outline uppercase">
                恢复平衡
              </span>
            </div>
            <div className="mb-3">
              <span className="font-mono text-lg font-semibold text-recovery">理想</span>
              <span className="font-mono text-xs text-outline ml-2">TSB +12</span>
            </div>
            <ReactECharts
              option={radarOption}
              style={{ height: 200 }}
              opts={{ renderer: 'svg' }}
              notMerge={true}
            />
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div variants={itemVariants}>
          <h3 className="font-display text-[15px] font-semibold text-on-surface mb-4">
            关键里程碑
          </h3>
          <div className="space-y-3">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + i * 0.12 }}
                className="surface-card p-4 flex items-start gap-3 border-l-2 border-l-tertiary/50"
              >
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 text-sm">
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-outline block mb-0.5">
                    {m.type}
                  </span>
                  <p className="font-display text-[14px] font-medium text-on-surface mb-0.5 truncate">
                    {m.title}
                  </p>
                  <p className="text-body-sm text-on-surface-variant">{m.meta}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

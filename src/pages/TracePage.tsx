import { motion } from 'framer-motion'
import ReactECharts from 'echarts-for-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
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

const traceData = [
  { date: '10月24日', type: '晨跑', distance: 8.42, duration: '45:12', avgHR: 152, pace: "5'22\"", xp: '+23', icon: '🌅' },
  { date: '10月22日', type: '间歇跑', distance: 6.8, duration: '38:30', avgHR: 168, pace: "4'55\"", xp: '+31', icon: '⚡' },
  { date: '10月20日', type: '轻松跑', distance: 5.2, duration: '28:45', avgHR: 142, pace: "5'32\"", xp: '+19', icon: '🌙' },
  { date: '10月18日', type: '长距离', distance: 12.5, duration: '68:20', avgHR: 155, pace: "5'28\"", xp: '+38', icon: '🏔️' },
  { date: '10月16日', type: '恢复跑', distance: 4.0, duration: '22:00', avgHR: 135, pace: "5'30\"", xp: '+14', icon: '🍃' },
  { date: '10月14日', type: '节奏跑', distance: 8.0, duration: '43:50', avgHR: 162, pace: "5'12\"", xp: '+27', icon: '💨' },
]

const monthlyChartOption = {
  grid: { top: 25, right: 15, bottom: 25, left: 40 },
  xAxis: {
    type: 'category',
    data: ['W1', 'W2', 'W3', 'W4'],
    axisLine: { lineStyle: { color: '#323537' } },
    axisLabel: { color: '#8f9097', fontSize: 10, fontFamily: 'JetBrains Mono' },
    axisTick: { show: false },
  },
  yAxis: [
    {
      type: 'value',
      name: 'km',
      nameTextStyle: { color: '#8f9097', fontSize: 9, fontFamily: 'JetBrains Mono' },
      splitLine: { lineStyle: { color: '#272a2c', type: 'dashed' } },
      axisLabel: { color: '#8f9097', fontSize: 10, fontFamily: 'JetBrains Mono' },
      axisLine: { show: false },
    },
  ],
  series: [
    {
      name: '距离',
      data: [35, 48, 52, 41],
      type: 'bar',
      barWidth: '40%',
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#3cddc7' },
            { offset: 1, color: 'rgba(60, 221, 199, 0.3)' },
          ],
        },
      },
    },
  ],
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#1d2022',
    borderColor: '#323537',
    textStyle: { color: '#e0e3e5', fontFamily: 'JetBrains Mono', fontSize: 11 },
  },
}

export default function TracePage() {
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
            痕迹
          </h1>
          <p className="text-body-sm text-on-surface-variant">
            每一步，都是内在地图的测绘
          </p>
        </motion.div>

        {/* Monthly Overview Chart */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="data-card p-5">
            <span className="font-mono text-label-caps text-outline uppercase block mb-3">
              本月跑量概览
            </span>
            <ReactECharts
              option={monthlyChartOption}
              style={{ height: 160 }}
              opts={{ renderer: 'svg' }}
            />
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: '本月总里程', value: '176km', sub: '+12%' },
            { label: '跑步次数', value: '18次', sub: '连续14天' },
            { label: '平均配速', value: "5'24"", sub: '提升3s' },
          ].map((stat) => (
            <div key={stat.label} className="surface-card p-3 text-center">
              <span className="font-mono text-[9px] text-outline uppercase tracking-wider block mb-1">{stat.label}</span>
              <span className="font-mono text-base font-semibold text-on-surface block">{stat.value}</span>
              <span className="font-mono text-[9px] text-success block mt-0.5">{stat.sub}</span>
            </div>
          ))}
        </motion.div>

        {/* Trace Timeline */}
        <motion.div variants={itemVariants}>
          <h3 className="font-display text-[15px] font-semibold text-on-surface mb-4">
            跑步足迹
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-surface-container-high" />

            <div className="space-y-3">
              {traceData.map((run, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="surface-card p-4 flex items-start gap-3 relative"
                >
                  {/* Timeline dot */}
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 text-lg relative z-10 ring-4 ring-surface">
                    {run.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display text-[13px] font-medium text-on-surface">
                        {run.type} · {run.date}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-success">
                        {run.xp}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mt-2">
                      <div>
                        <span className="font-mono text-[9px] text-outline block">距离</span>
                        <span className="font-mono text-xs font-semibold text-on-surface">{run.distance}km</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-outline block">时长</span>
                        <span className="font-mono text-xs font-semibold text-on-surface">{run.duration}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-outline block">平均心率</span>
                        <span className="font-mono text-xs font-semibold" style={{ color: run.avgHR > 160 ? '#FF5733' : '#2DD4BF' }}>{run.avgHR}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-outline block">配速</span>
                        <span className="font-mono text-xs font-semibold text-on-surface">{run.pace}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

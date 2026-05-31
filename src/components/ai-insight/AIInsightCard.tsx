import { motion } from 'framer-motion'

interface AIInsightCardProps {
  status: string
  content: React.ReactNode
}

export default function AIInsightCard({ status, content }: AIInsightCardProps) {
  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {/* Sparkle Icon */}
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-container to-tertiary-container flex items-center justify-center relative flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b9c7e4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
          </svg>
          <span className="absolute inset-0 rounded-lg animate-sparkle bg-primary/10" />
        </div>

        <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full bg-recovery/15 text-recovery border border-recovery/30">
          {status}
        </span>
      </div>

      {/* Content */}
      <p className="font-body text-[15px] leading-relaxed text-on-surface">
        {content}
      </p>
    </motion.div>
  )
}

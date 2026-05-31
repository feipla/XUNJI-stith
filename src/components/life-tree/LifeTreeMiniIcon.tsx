export default function LifeTreeIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="miniGlow" cx="50" cy="90" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) scale(20)">
          <stop stopColor="white" stopOpacity="0.35"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="90" r="15" fill="url(#miniGlow)" opacity="0.5"/>
      <path d="M50 90C40 60 20 50 15 45" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
      <circle cx="15" cy="45" r="1.8" fill="#2DD4BF"/>
      <path d="M50 90C45 60 35 40 30 30" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" opacity="0.75"/>
      <circle cx="30" cy="30" r="1.8" fill="#A78BFA"/>
      <path d="M50 90C55 60 75 50 85 45" stroke="#FB923C" strokeWidth="2.5" strokeLinecap="round" opacity="0.75"/>
      <circle cx="85" cy="45" r="1.8" fill="#FB923C"/>
      <path d="M50 90C60 70 70 40 75 35" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
      <circle cx="75" cy="35" r="1.8" fill="#F472B6"/>
      <path d="M50 90C50 60 50 30 50 15" stroke="#FACC15" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="50" cy="15" r="2.5" fill="#FACC15">
        <animate attributeName="r" values="2.5;3.2;2.5" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

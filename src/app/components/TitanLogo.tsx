export default function TitanLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="TITAN-PC Logo"
    >
      {/* Texto TITAN */}
      <text
        x="0"
        y="28"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="28"
        fontWeight="bold"
        fill="url(#titanGrad)"
      >
        TITAN
      </text>
      
      {/* Texto -PC */}
      <text
        x="85"
        y="28"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="28"
        fontWeight="bold"
        fill="white"
      >
        -PC
      </text>
      
      {/* Torre PC (icono derecha) */}
      <g transform="translate(135, 5)">
        {/* Contorno */}
        <rect x="0" y="0" width="20" height="30" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
        
        {/* Elementos internos */}
        <ellipse cx="10" cy="8" rx="5" ry="2.5" fill="url(#pcGrad1)" />
        <ellipse cx="10" cy="15" rx="5" ry="2.5" fill="#8B5CF6" />
        <path d="M5 22 Q10 24 15 22" fill="#8B5CF6" opacity="0.8" />
      </g>
      
      {/* Definiciones de gradientes */}
      <defs>
        {/* Gradiente para TITAN */}
        <linearGradient id="titanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        
        {/* Gradiente para PC tower */}
        <linearGradient id="pcGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}


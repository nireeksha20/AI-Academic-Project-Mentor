export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-white/20
        bg-white/10
        backdrop-blur-xl
        shadow-2xl
        transition-all
        duration-300
        hover:bg-white/15
        ${className}
      `}
    >
      {children}
    </div>
  );
}

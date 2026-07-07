export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`
rounded-3xl
border border-white/10
bg-white/10
backdrop-blur-xl
shadow-xl
transition-all
duration-300
hover:-translate-y-2
hover:scale-[1.02]
hover:border-cyan-400/30
hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]
${className}
`}
    >
      {children}
    </div>
  );
}

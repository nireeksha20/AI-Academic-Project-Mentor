import GlassCard from "./GlassCard";

export default function FeatureCard({ icon, title, description }) {
  return (
    <GlassCard className="p-6 text-center">
      <div className="text-5xl mb-4">{icon}</div>

      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-3 text-slate-300">{description}</p>
    </GlassCard>
  );
}

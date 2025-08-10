export default function AnalyticsCard({ title, value }) {
  return (
    <div className="rounded-lg border border-[var(--color-card-border)] p-6 min-h-[150px] flex flex-col justify-between">
      <h3 className="text-2xl font-medium text-[var(--color-text-primary)] mb-4">{title}</h3>
      <p className="text-3xl font-bold text-[var(--color-text-light)]">{value}</p>
    </div>
  )
}

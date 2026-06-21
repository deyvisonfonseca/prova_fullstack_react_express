export default function PageHeader({ title, description, actionLabel, onAction }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-3 rounded-2xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
      </div>

      {actionLabel && (
        <button
          onClick={onAction}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

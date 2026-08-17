function EmptyState({
  title = 'Nothing here yet',
  message = 'Items will appear here once they are available.',
  actionLabel,
  onAction,
}) {
  return (
    <section className="empty-state flex flex-col items-center justify-center py-16 text-center gap-3">
      <h2 className="text-base font-semibold text-slate-700 dark:text-slate-300">{title}</h2>
      <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs">{message}</p>
      {actionLabel && onAction ? (
        <button
          className="primary-button mt-2 h-9 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white text-sm font-medium transition"
          type="button"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}

export default EmptyState

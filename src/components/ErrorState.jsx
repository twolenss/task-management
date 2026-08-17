function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load your tasks. Please try again.',
  actionLabel = 'Try again',
  onAction,
}) {
  return (
    <section className="error-state flex flex-col items-center justify-center py-16 gap-3 text-center" role="alert">
      <h2 className="text-base font-semibold text-slate-700 dark:text-slate-300">{title}</h2>
      <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs">{message}</p>
      {onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-2 h-9 px-4 rounded-lg border border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950 transition"
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}

export default ErrorState

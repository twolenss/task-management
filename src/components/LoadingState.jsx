function LoadingState({ message = 'Loading tasks...' }) {
  return (
    <section className="loading-state flex flex-col items-center justify-center py-16 gap-4" aria-live="polite" aria-busy="true">
      <div
        className="loading-state__spinner w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700 border-t-indigo-600 dark:border-t-indigo-400 animate-spin"
        aria-hidden="true"
      />
      <p className="text-sm text-slate-400 dark:text-slate-500">{message}</p>
    </section>
  );
}

export default LoadingState

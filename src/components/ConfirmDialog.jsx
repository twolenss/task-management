function ConfirmDialog({
  isOpen = false,
  title = 'Confirm action',
  message = 'Are you sure you want to continue?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isConfirming = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" role="presentation">
      <section
        className="confirm-dialog w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <div className="space-y-1.5">
          <h2 id="confirm-dialog-title" className="text-base font-semibold text-slate-900 dark:text-slate-50">{title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{message}</p>
        </div>

        <div className="confirm-dialog__actions flex gap-3 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-9 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            {cancelLabel}
          </button>
          <button
            className="danger-button flex-1 h-9 rounded-lg bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            onClick={onConfirm}
            disabled={isConfirming}
          >
            {isConfirming ? 'Working...' : confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmDialog

function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load your tasks. Please try again.',
  actionLabel = 'Try again',
  onAction,
}) {
  return (
    <section className="error-state" role="alert">
      <h2>{title}</h2>
      <p>{message}</p>
      {onAction ? (
        <button type="button" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  )
}

export default ErrorState

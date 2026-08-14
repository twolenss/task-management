function EmptyState({
  title = 'Nothing here yet',
  message = 'Items will appear here once they are available.',
  actionLabel,
  onAction,
}) {
  return (
    <section className="empty-state">
      <h2>{title}</h2>
      <p>{message}</p>
      {actionLabel && onAction ? (
        <button className="primary-button" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  )
}

export default EmptyState

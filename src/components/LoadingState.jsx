function LoadingState({ message = 'Loading tasks...' }) {
  return (
    <section className="loading-state" aria-live="polite" aria-busy="true">
      <div className="loading-state__spinner" aria-hidden="true" />
      <p>{message}</p>
    </section>
  )
}

export default LoadingState

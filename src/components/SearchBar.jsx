function SearchBar({
  value = '',
  onChange,
  placeholder = 'Search tasks...',
  id = 'task-search',
}) {
  return (
    <label className="search-bar" htmlFor={id}>
      <span className="sr-only">Search tasks</span>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
    </label>
  )
}

export default SearchBar

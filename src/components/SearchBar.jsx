function SearchBar({
  value = '',
  onChange,

}) {
  return (
  <label className="search-bar">
      <span className="sr-only">Search tasks</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder="Search tasks..."
        autoComplete="off"
      />
    </label>
  )
}

export default SearchBar

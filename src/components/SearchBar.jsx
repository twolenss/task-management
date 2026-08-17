function SearchBar({ value = '', onChange }) {
  return (
    <label className="search-bar flex-1 relative block">
      <span className="sr-only">Search tasks</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder="Search tasks..."
        autoComplete="off"
        className="w-full h-9 pl-3 pr-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
      />
    </label>
  );
}

export default SearchBar

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'todo', label: 'To do' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
]

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]
 <div className="task-filters" aria-label="Task filters">
      <label>
        <span>Status</span>
        <select
          value={status}
          onChange={(event) => onStatusChange?.(event.target.value)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Priority</span>
        <select
          value={priority}
          onChange={(event) => onPriorityChange?.(event.target.value)}
        >
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Sort</span>
        <select
          value={sortBy}
          onChange={(event) => onSortChange?.(event.target.value)}
        >
          <option value="createdAt">Created date</option>
          <option value="dueDate">Due date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </label>
    </div>


TOOLBAR 
---   searchQuery = '',
  selectedStatus = 'all',
  selectedPriority = 'all',
  sortBy = 'createdAt',
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onSortChange,
  onAddTask,
    <section className="task-toolbar" aria-label="Task controls">
      <SearchBar value={searchQuery} onChange={onSearchChange} />

      <TaskFilters
        status={selectedStatus}
        priority={selectedPriority}
        sortBy={sortBy}
        onStatusChange={onStatusChange}
        onPriorityChange={onPriorityChange}
        onSortChange={onSortChange}
      />

      <button className="primary-button" type="button" onClick={onAddTask}>
        Add task
      </button>
    </section>
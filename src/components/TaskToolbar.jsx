import SearchBar from './SearchBar'
import TaskFilters from './TaskFilters'

function TaskToolbar({
  searchQuery = "",
  onSearchChange,
  selectedStatus = "all",
  onStatusChange,
  selectedPriority = "all",
  onPriorityChange,
  sortBy = "createdAt",
  onSortChange,
}) {
function TaskToolbar({
  searchQuery = "",
  onSearchChange,
  selectedStatus = "all",
  onStatusChange,
  selectedPriority = "all",
  onPriorityChange,
  sortBy = "createdAt",
  onSortChange,
}) {
  return (
    <div className="task-toolbar flex flex-col sm:flex-row gap-3" aria-label="Task controls">
      <SearchBar value={searchQuery} onChange={onSearchChange} />
      <TaskFilters
        status={selectedStatus}
        priority={selectedPriority}
        sortBy={sortBy}
        onStatusChange={onStatusChange}
        onPriorityChange={onPriorityChange}
        onSortChange={onSortChange}
      />
    </div>
  );
}
} 

export default TaskToolbar

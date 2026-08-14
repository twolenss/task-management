# Task Management App Project Plan

## 1. Project Overview

### Project Name

Task Management App

### Project Type

React frontend application with a mock REST API using JSON Server.

### Project Goal

Build a task management application that helps an individual user create, organize, update, complete, and track tasks. The project should reinforce important React concepts such as component architecture, state management, custom hooks, service layers, API requests, validation, filtering, sorting, and polished UI states.

### Learning Goal

This project is not only about building another CRUD application. The goal is to learn how to plan a project before development by defining:

- The problem
- The target user
- The MVP
- The data model
- The user flows
- The screens
- The components
- The application state
- The API requirements
- The development phases
- The Definition of Done

## 2. Problem Statement

Many people have multiple tasks but struggle to clearly track:

- What needs to be done
- What is currently being worked on
- What has already been completed
- Which tasks are important
- Which tasks are overdue
- What their overall progress looks like

The application solves this by providing a centralized interface where users can create, organize, prioritize, and track tasks.

## 3. Target User

### Primary User

An individual user who wants to organize personal tasks.

Examples:

- Student managing school tasks
- Developer managing project tasks
- Job seeker managing application tasks
- Freelancer managing daily work

### MVP User Scope

The MVP is designed for one user only.

Authentication, teams, shared projects, and collaboration are not part of the first version.

Future versions may introduce:

```text
User
  -> Projects
      -> Tasks
```

And later:

```text
User
  -> Teams
      -> Projects
          -> Tasks
```

## 4. MVP Definition

MVP means Minimum Viable Product.

For this project, the MVP is the smallest version of the application that still solves the core problem: allowing a user to manage and track tasks.

### MVP Includes

- Create a task
- View all tasks
- Edit a task
- Delete a task
- Mark a task as completed
- Organize tasks by status
- Assign task priority
- Set a due date
- Search tasks
- Filter tasks
- Sort tasks
- Show loading, error, empty, and success states
- Show basic dashboard statistics

### MVP Does Not Include

- User authentication
- Team collaboration
- Real-time updates
- Drag-and-drop Kanban board
- Notifications
- Cloud database
- Deployment

Those features can be added later after the local MVP is complete.

## 5. Features vs Requirements

A feature describes what the application does.

A requirement describes how that feature should behave.

### Feature: Create Task

Requirements:

- User can open a task form.
- User must enter a title.
- User may enter a description.
- User must select a priority.
- User must select a due date.
- Status should default to `todo`.
- `createdAt` should be generated automatically.
- The task should be saved through the API.
- The new task should immediately appear in the task list.
- The form should reset after successful creation.
- A validation message should appear if required fields are invalid.

### Feature: View Tasks

Requirements:

- User can see all saved tasks.
- Tasks should display title, description, status, priority, due date, and actions.
- The UI should show loading while tasks are being fetched.
- The UI should show an error message if tasks cannot be loaded.
- The UI should show an empty state if there are no tasks.

### Feature: Edit Task

Requirements:

- User can select a task to edit.
- The form should be populated with the selected task's existing data.
- User can update title, description, status, priority, and due date.
- Updated task data should be saved through the API.
- The task list should immediately reflect the update.
- The edit form should close or reset after successful update.

### Feature: Delete Task

Requirements:

- User can delete a task.
- User should see a confirmation message before deletion.
- The task should be removed through the API.
- The task should disappear from the list after successful deletion.
- The UI should handle API errors gracefully.

### Feature: Complete Task

Requirements:

- User can mark a task as completed.
- The task status should change to `completed`.
- The update should be saved through the API.
- Completed tasks should be visually distinct from active tasks.

### Feature: Search Tasks

Requirements:

- User can search tasks by title.
- Search should update the visible list.
- Search should not delete or modify task data.
- If no tasks match the search, show a filtered empty state.

### Feature: Filter Tasks

Requirements:

- User can filter by status.
- User can filter by priority.
- Filters should work together with search.
- Filtered empty states should be different from the general empty state.

### Feature: Sort Tasks

Requirements:

- User can sort tasks by due date.
- User can sort tasks by priority.
- User can sort tasks by newest or oldest creation date.
- Sorting should not mutate the original tasks state directly.

## 6. Task Data Model

Each task should contain the following fields:

| Field | Type | Required | Description |
|---|---:|---:|---|
| `id` | string | Yes | Unique task identifier |
| `title` | string | Yes | Short task name |
| `description` | string | No | Optional task details |
| `status` | string | Yes | Current task state |
| `priority` | string | Yes | Importance level |
| `dueDate` | string | Yes | Due date in `YYYY-MM-DD` format |
| `createdAt` | string | Yes | ISO timestamp when task was created |

### JSON Example

```json
{
  "id": "task-001",
  "title": "Build task manager UI",
  "description": "Create the dashboard, task list, task form, filters, and stats sections.",
  "status": "todo",
  "priority": "high",
  "dueDate": "2026-08-20",
  "createdAt": "2026-08-14T09:30:00.000Z"
}
```

### Example `db.json`

```json
{
  "tasks": [
    {
      "id": "task-001",
      "title": "Build task manager UI",
      "description": "Create the dashboard, task list, task form, filters, and stats sections.",
      "status": "todo",
      "priority": "high",
      "dueDate": "2026-08-20",
      "createdAt": "2026-08-14T09:30:00.000Z"
    },
    {
      "id": "task-002",
      "title": "Refactor task API logic",
      "description": "Move fetch logic into taskService.js and connect it to useTasks.js.",
      "status": "in-progress",
      "priority": "medium",
      "dueDate": "2026-08-18",
      "createdAt": "2026-08-14T10:15:00.000Z"
    }
  ]
}
```

## 7. Allowed Values

The application should use predictable values instead of allowing random text for status and priority.

### Status Values

```text
todo
in-progress
completed
```

### Priority Values

```text
low
medium
high
```

### Future Status Values

These should not be added in the MVP unless needed later:

```text
blocked
cancelled
archived
```

## 8. User Flows

### Create Task Flow

```text
Open application
  -> Click Add Task
  -> Task form appears
  -> Enter title
  -> Enter description
  -> Select priority
  -> Select due date
  -> Submit form
  -> Validate input
  -> Save task through API
  -> Add task to UI
  -> Reset form
```

### Edit Task Flow

```text
View task list
  -> Click Edit on a task
  -> Form opens with existing task data
  -> Update fields
  -> Submit form
  -> Validate input
  -> Save changes through API
  -> Update task in UI
  -> Exit edit mode
```

### Complete Task Flow

```text
View task list
  -> Click Complete
  -> Send status update through API
  -> Change status to completed
  -> Update task presentation in UI
```

### Delete Task Flow

```text
View task list
  -> Click Delete
  -> Show confirmation
  -> Confirm delete
  -> Send DELETE request
  -> Remove task from UI
```

### Search and Filter Flow

```text
View task list
  -> Type search query
  -> Select status filter
  -> Select priority filter
  -> Apply sorting
  -> Display matching tasks
  -> Show filtered empty state when no tasks match
```

## 9. Screens

### Screen 1: Dashboard

Purpose:

Show the overall task overview and the main task list.

Content:

- App title
- Dashboard statistics
- Add Task button
- Search input
- Status filter
- Priority filter
- Sort control
- Task list
- Loading state
- Error state
- Empty state

Example structure:

```text
Task Manager

[Total Tasks] [Todo] [In Progress] [Completed] [Overdue]

Search...

[All Statuses] [All Priorities] [Sort by Due Date]

Tasks
--------------------------------------------------
Task item
Task item
Task item
```

### Screen 2: Task Form

Purpose:

Create a new task or edit an existing task.

This can be implemented as a modal, side panel, or inline form for the MVP.

Fields:

- Title
- Description
- Status
- Priority
- Due date

Actions:

- Cancel
- Create Task
- Save Changes

Example structure:

```text
Add Task

Title
[________________________]

Description
[________________________]

Status
[Todo v]

Priority
[Medium v]

Due Date
[2026-08-20]

[Cancel] [Create Task]
```

### Screen 3: Delete Confirmation

Purpose:

Prevent accidental deletion.

Example:

```text
Delete task?

Are you sure you want to delete "Build task manager UI"?

[Cancel] [Delete]
```

## 10. Component Architecture

Recommended component structure:

```text
src/
  components/
    Dashboard.jsx
    TaskStats.jsx
    TaskToolbar.jsx
    SearchBar.jsx
    TaskFilters.jsx
    TaskList.jsx
    TaskItem.jsx
    TaskForm.jsx
    ConfirmDialog.jsx
    EmptyState.jsx
    ErrorState.jsx
    LoadingState.jsx
  hooks/
    useTasks.js
  services/
    taskService.js
  utils/
    taskUtils.js
    validation.js
  App.jsx
  main.jsx
```

### Main Responsibility Map

| Component/File | Responsibility |
|---|---|
| `App.jsx` | Main application layout and top-level composition |
| `Dashboard.jsx` | Main screen container |
| `TaskStats.jsx` | Shows total, todo, in-progress, completed, and overdue counts |
| `TaskToolbar.jsx` | Holds search, filters, sort, and add button |
| `SearchBar.jsx` | Controls search query input |
| `TaskFilters.jsx` | Controls status and priority filters |
| `TaskList.jsx` | Displays the list of visible tasks |
| `TaskItem.jsx` | Displays one task and its actions |
| `TaskForm.jsx` | Handles create/edit form UI |
| `ConfirmDialog.jsx` | Confirms destructive actions |
| `useTasks.js` | Owns task state and task actions |
| `taskService.js` | Owns API communication |
| `taskUtils.js` | Filtering, sorting, task calculations |
| `validation.js` | Form validation helpers |

## 11. Application State

The app should track the following state:

```text
tasks
loading
error
editingTask
taskToDelete
showTaskForm
searchQuery
selectedStatus
selectedPriority
sortBy
formErrors
```

### State Descriptions

| State | Description |
|---|---|
| `tasks` | Main task array from the API |
| `loading` | Indicates whether tasks are being fetched or updated |
| `error` | Stores API or loading error messages |
| `editingTask` | Stores the task currently being edited |
| `taskToDelete` | Stores the task selected for deletion |
| `showTaskForm` | Controls whether the form is visible |
| `searchQuery` | Stores the current search text |
| `selectedStatus` | Stores active status filter |
| `selectedPriority` | Stores active priority filter |
| `sortBy` | Stores active sorting option |
| `formErrors` | Stores validation errors |

### Derived State

Some values should be calculated from `tasks` instead of stored separately:

- `totalTasks`
- `todoCount`
- `inProgressCount`
- `completedCount`
- `overdueCount`
- `completionPercentage`
- `filteredTasks`
- `sortedTasks`

## 12. API Requirements

The MVP can use JSON Server.

Base URL:

```text
http://localhost:8000
```

### GET Tasks

Endpoint:

```http
GET /tasks
```

Purpose:

Fetch all tasks.

Expected response:

```json
[
  {
    "id": "task-001",
    "title": "Build task manager UI",
    "description": "Create the main interface.",
    "status": "todo",
    "priority": "high",
    "dueDate": "2026-08-20",
    "createdAt": "2026-08-14T09:30:00.000Z"
  }
]
```

### POST Task

Endpoint:

```http
POST /tasks
```

Purpose:

Create a new task.

Request body:

```json
{
  "title": "Build task manager UI",
  "description": "Create the main interface.",
  "status": "todo",
  "priority": "high",
  "dueDate": "2026-08-20",
  "createdAt": "2026-08-14T09:30:00.000Z"
}
```

### PATCH Task

Endpoint:

```http
PATCH /tasks/:id
```

Purpose:

Update part of an existing task.

Example request body:

```json
{
  "status": "completed"
}
```

### DELETE Task

Endpoint:

```http
DELETE /tasks/:id
```

Purpose:

Delete a task.

Expected behavior:

- API removes the task.
- UI removes the task from local state after successful response.
- UI shows an error if deletion fails.

## 13. Service Layer

Create:

```text
src/services/taskService.js
```

Purpose:

Keep API request logic outside of components.

Recommended functions:

```js
const API_URL = "http://localhost:8000/tasks";

export async function getTasks() {}
export async function addTask(task) {}
export async function updateTask(id, updates) {}
export async function deleteTask(id) {}
```

### Service Layer Responsibilities

- Send API requests
- Check response status
- Convert responses to JSON
- Throw errors when requests fail
- Keep components cleaner

### Architecture Flow

```text
Component
  -> useTasks custom hook
      -> taskService
          -> JSON Server API
```

## 14. `useTasks` Custom Hook Architecture

Create:

```text
src/hooks/useTasks.js
```

Purpose:

Manage task-related state and actions in one reusable place.

### Hook State

```js
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

### Hook Actions

The hook should expose:

```js
fetchTasks()
handleAddTask(taskData)
handleUpdateTask(id, updates)
handleDeleteTask(id)
handleCompleteTask(id)
```

### Hook Return Value

```js
return {
  tasks,
  loading,
  error,
  fetchTasks,
  handleAddTask,
  handleUpdateTask,
  handleDeleteTask,
  handleCompleteTask
};
```

### Hook Responsibilities

- Load tasks when the app starts.
- Add new tasks.
- Update existing tasks.
- Delete tasks.
- Mark tasks as completed.
- Set loading state.
- Set error state.
- Update local UI state after successful API requests.

## 15. Validation Rules

### Title

Rules:

- Required
- Cannot be only spaces
- Recommended maximum length: 80 characters

Invalid examples:

```text
""
"   "
```

Valid example:

```text
"Finish task manager project"
```

### Description

Rules:

- Optional
- Recommended maximum length: 500 characters

### Status

Rules:

- Required
- Must be one of:

```text
todo
in-progress
completed
```

### Priority

Rules:

- Required
- Must be one of:

```text
low
medium
high
```

### Due Date

Rules:

- Required
- Must be a valid date
- Cannot be earlier than today

### Created At

Rules:

- Should be generated automatically
- Should be stored as an ISO timestamp

Example:

```js
new Date().toISOString()
```

## 16. UI States

Every major data section should support the following states.

### Loading State

When tasks are being fetched:

```text
Loading tasks...
```

### Error State

When tasks cannot be loaded:

```text
Unable to load tasks.
Please check your server and try again.
```

Recommended action:

```text
Try Again
```

### Empty State

When there are no tasks at all:

```text
No tasks yet.
Create your first task.
```

### Filtered Empty State

When tasks exist, but none match the current search or filters:

```text
No tasks match your search or filters.
```

### Success State

When tasks load successfully:

```text
Show dashboard statistics and task list.
```

### Form Validation State

When form input is invalid:

```text
Please enter a task title.
Due date cannot be in the past.
```

## 17. Status Presentation

The UI should make task status easy to understand at a glance.

### Status Labels

| Value | Display Label |
|---|---|
| `todo` | Todo |
| `in-progress` | In Progress |
| `completed` | Completed |

### Priority Labels

| Value | Display Label |
|---|---|
| `low` | Low |
| `medium` | Medium |
| `high` | High |

### Visual Treatment

Suggested style direction:

- `todo`: neutral color
- `in-progress`: blue or accent color
- `completed`: green or muted success color
- `high`: red or strong warning color
- `medium`: amber or moderate warning color
- `low`: gray or calm color

Completed tasks should look visually different. For example:

- Slightly muted text
- Completed badge
- Optional line-through title
- Disabled or hidden Complete button

### Overdue Task Presentation

A task is overdue when:

```text
dueDate is before today
AND status is not completed
```

Overdue tasks should show a visible warning label:

```text
Overdue
```

## 18. Phased Development Plan

### Phase 1: Foundation

Goal:

Set up the project structure and data flow.

Tasks:

- Create React project with Vite.
- Configure Tailwind CSS.
- Create folder structure.
- Create JSON Server setup.
- Create `db.json`.
- Define task data model.
- Create `taskService.js`.
- Create `useTasks.js`.

Done when:

- React app runs locally.
- JSON Server runs locally.
- App can fetch tasks from `/tasks`.

### Phase 2: Core CRUD

Goal:

Build the main task management behavior.

Tasks:

- Display task list.
- Create task.
- Edit task.
- Delete task.
- Mark task as completed.

Done when:

- User can create, read, update, delete, and complete tasks using the UI.

### Phase 3: Validation and UI States

Goal:

Make the application reliable and user-friendly.

Tasks:

- Add form validation.
- Add loading state.
- Add error state.
- Add empty state.
- Add filtered empty state.
- Add delete confirmation.
- Add success/error feedback.

Done when:

- The app handles normal and failure states clearly.

### Phase 4: Organization Tools

Goal:

Help users find and organize tasks.

Tasks:

- Add search by title.
- Add status filter.
- Add priority filter.
- Add sorting by due date.
- Add sorting by priority.
- Add sorting by created date.

Done when:

- User can search, filter, and sort tasks without changing the original data.

### Phase 5: Dashboard

Goal:

Give the user a quick overview of progress.

Tasks:

- Show total tasks.
- Show todo count.
- Show in-progress count.
- Show completed count.
- Show overdue count.
- Show completion percentage.

Done when:

- Dashboard statistics update when tasks change.

### Phase 6: Polish

Goal:

Make the MVP feel portfolio-ready.

Tasks:

- Improve responsive layout.
- Refine spacing, colors, and typography.
- Clean up component responsibilities.
- Refactor repeated logic.
- Add helpful messages.
- Check mobile layout.

Done when:

- The app is usable and visually clean on desktop and mobile.

### Phase 7: Future Enhancements

Goal:

Add advanced features only after MVP is complete.

Possible features:

- Kanban board
- Drag and drop
- Categories
- Tags
- Dark mode
- Authentication
- Multiple projects
- Team collaboration
- Real-time updates
- Notifications
- Deployment

## 19. Feature Priority

### Must Have

These are required for the MVP:

- Create task
- View tasks
- Edit task
- Delete task
- Complete task
- Status
- Priority
- Due date
- Validation
- Loading state
- Error state
- Empty state
- Search
- Filter by status
- Filter by priority

### Should Have

These improve the app and should be added after the core MVP works:

- Dashboard statistics
- Sorting
- Delete confirmation
- Toast or success messages
- Overdue detection
- Responsive polish

### Could Have

These are useful but not required:

- Kanban-style grouping
- Dark mode
- Categories
- Tags
- Task detail modal
- Progress bar

### Future

These are outside the MVP:

- Authentication
- Multiple users
- Teams
- Shared projects
- Real-time collaboration
- Notifications
- Production backend
- Deployment

## 20. Definition of Done

### Overall MVP Done When

- User can create a task.
- User can view all tasks.
- User can edit a task.
- User can delete a task.
- User can mark a task as completed.
- User can search tasks.
- User can filter tasks by status.
- User can filter tasks by priority.
- User can sort tasks.
- Dashboard statistics update correctly.
- Form validation works.
- Loading, error, empty, and filtered empty states work.
- API requests are handled through a service layer.
- Task state is managed through a custom hook.
- UI is responsive enough for desktop and mobile.
- Code is organized into clear folders and components.

### Create Task Done When

- Form opens.
- Title validates.
- Priority validates.
- Due date validates.
- Task is sent to the API.
- API saves the task.
- Task appears immediately in the list.
- Form resets.
- Loading state works.
- Error state works.
- User receives feedback.

### Edit Task Done When

- Existing task data appears in the form.
- User can update valid fields.
- API receives the update.
- UI updates after success.
- Edit mode exits after saving.
- Validation still applies.

### Delete Task Done When

- User is asked to confirm deletion.
- Task is deleted through API.
- Task is removed from UI after success.
- Error message appears if deletion fails.

### Complete Task Done When

- User can mark a task completed.
- API saves the status change.
- UI updates the task status.
- Dashboard statistics update.
- Completed task has clear visual styling.

## 21. Edge Cases

The application should handle these cases:

- User submits an empty title.
- User submits a title with only spaces.
- User selects a due date in the past.
- User tries to submit without priority.
- API server is offline.
- API returns an error.
- Task list is empty.
- Search returns no results.
- Filters return no results.
- User deletes a task by accident.
- User edits a task while filters are active.
- A completed task has a past due date.
- A task has a very long title.
- A task has a very long description.
- User quickly clicks submit multiple times.
- User refreshes the page after creating tasks.

## 22. Development Workflow

Use this workflow for each feature:

```text
Understand the requirement
  -> Identify affected data
  -> Identify affected components
  -> Update service layer if API is needed
  -> Update custom hook if task state changes
  -> Build or update UI
  -> Add validation and UI states
  -> Test normal case
  -> Test edge cases
  -> Refactor if needed
```

### Recommended Build Order

1. Set up React and JSON Server.
2. Create the task data model in `db.json`.
3. Build `taskService.js`.
4. Build `useTasks.js`.
5. Display tasks.
6. Add create task form.
7. Add edit task behavior.
8. Add delete task behavior.
9. Add complete task behavior.
10. Add validation.
11. Add loading, error, and empty states.
12. Add search.
13. Add filters.
14. Add sorting.
15. Add dashboard statistics.
16. Polish UI and responsive layout.
17. Write README.

### Development Principle

Build one complete feature at a time.

Do not start five features at once. A feature should be functional, tested manually, and cleaned up before moving to the next feature.

## 23. Final MVP Specification

The final MVP should be a React task management application for an individual user.

The user should be able to:

- Open the app and see a dashboard summary.
- View all tasks.
- Create a new task with title, description, priority, status, and due date.
- Edit an existing task.
- Delete a task after confirmation.
- Mark a task as completed.
- Search tasks by title.
- Filter tasks by status.
- Filter tasks by priority.
- Sort tasks by due date, priority, or creation date.
- Understand which tasks are overdue.
- See clear loading, error, empty, and filtered empty states.

The code should be organized with:

- Component-based UI
- `taskService.js` for API logic
- `useTasks.js` for task state and task actions
- Utility functions for filtering, sorting, validation, and statistics

The project is complete when the app works locally with JSON Server and provides a clean, reliable, and understandable task management experience.

## 24. Recommended Next Step

Before writing code, create a project checklist from this document and implement the app phase by phase.

Start with:

```text
Phase 1: Foundation
```

Then move to:

```text
Phase 2: Core CRUD
```

Only after the core CRUD is working should you add search, filtering, sorting, dashboard statistics, and polish.

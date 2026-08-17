const BASE_URL = "http://localhost:8000/tasks";

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error("Request failed");
  }
  if (response.status === 204) return null;
  return response.json();
}

export async function getTasks() {
  const response = await fetch(BASE_URL);
  return handleResponse(response);
}

export async function createTask(task) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return handleResponse(response);
}

export async function updateTask(task,id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return handleResponse(response);
}
export async function deleteTask(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}

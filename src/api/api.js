const API_BASE = "http://localhost:5001";

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

/* ---- AUTH ---- */
// const token = localStorage.getItem("token");

export function signup(payload) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function login(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getRecipes() {
  return request("/recipes");
}

export function getRecipe(id) {
  return request(`/recipes/${id}`);
}

export function postComment(id, payload) {
  return request(`/recipes/${id}/comments`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function postRecipe(payload) {
  const token = localStorage.getItem("token");
console.log(token)
  return request("/recipes", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(payload),
  });
}

export async function getRecipesComments(id) {
  return request(`/recipes/${id}/comments`);
}

export function deleteRecipe(id) {
  return request(`/recipes/${id}`, { method: "DELETE" });
}

export function deleteComment(id) {
  return request(`/recipes/${id}/comments`, { method: "DELETE" });
}

export function updateComment(id,commentId, payload) {
  return request(`/recipes/${id}/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
//create rest of functions

const API_BASE = "http://localhost:5001";
const token = localStorage.getItem("token");
async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  // console.log(data,"-- from api")
  if (!res.ok) {
    const error = new Error(data.error || "Request failed");
    error.status = res.status;

    throw error;
  }

  return data;
}

// User Auth

export function signupUserApi(payload) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUserApi(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateUserApi(payload) {
  return request("/auth/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export async function getRecipes(category) {
  if(category){
    return request(`/recipes?category=${category}`);
  }else{
    return request("/recipes");
  }
}

export async function getRecipePreview(){
  return request('/recipes/previewCard');
}

export function getRecipe(recipeId) {
  return request(`/recipes/${recipeId}`);
}

export async function getRecipesComments(recipeId) {
  return request(`/recipes/${recipeId}/comments`);
}

export async function getRecipeLikes(recipeId){
  return request(`/recipes/${recipeId}/like`)
}

// Routes require user authentication

export function postComment(recipeId, payload) {
  return request(`/recipes/${recipeId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export function postRecipe(payload) {
  return request("/recipes", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}



export function updateLike(recipeId){
  return request(`/recipes/${recipeId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export function deleteRecipe(recipeId) {
  return request(`/recipes/${recipeId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export function deleteComment(recipeId, commentId) {
  // console.log(token)
  return request(`/recipes/${recipeId}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export function updateComment(recipeId, commentId, payload) {
  return request(`/recipes/${recipeId}/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

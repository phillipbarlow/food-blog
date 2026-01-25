const API_BASE = "http://localhost:5001";

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    ...options
  });

 const data = await res.json(); // 📌 only read here

  if (!res.ok) {
    throw new Error(data.error || "Request failed"); 
  }

  return data;
}

/* ---- AUTH ---- */

export function signup(email, password, display_name){
    return request("/auth/signup", {
        method: "POST",
        body: JSON.stringify({email, password, display_name})
    });
}

export function login(email, password){
    return request("/auth/login",{
        method: "POST",
        body:JSON.stringify({email, password})
    })
}

export async function getRecipes(){
  return request("/recipes")
}

export function getRecipe(id){
  return request(`/recipes/${id}`)
}

export function postComment(id){
  return request(`/recipes/${id}/comments`)
}

export function postRecipe(id, options){
  return request(`/recipes/${id}/comments`, options)
}

export async function getRecipesComments(id){
  return request(`/recipes/${id}/comments`)
}
//create rest of functions
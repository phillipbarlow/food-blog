const API_BASE = "http://localhost:5001";

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    ...options
  });

 const data = await res.json(); 

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

export function postComment(id,payload){
  return request(`/recipes/${id}/comments`,{
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function postRecipe(payload){
  return request("/recipes", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function getRecipesComments(id){
  return request(`/recipes/${id}/comments`)
}

export function deleteRecipe(id, options){
  return request(`/recipes/${id}`, options)
}
//create rest of functions
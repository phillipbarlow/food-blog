const API_BASE = "/api";

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    ...(options.headers || {}),
    ...options
  });

  const data = await res.json();

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
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

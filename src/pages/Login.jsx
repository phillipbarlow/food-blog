// import {login} from "../api/api";
// import {token} from "../api/api"

import { useState } from "react";
import { login } from "../api/api.js";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e)=>{
    e.preventDefault()
    try{
      const data = await login({username,password})
      console.log(data, ' -- from Login frontend')
    }catch(err){
      console.log('Error from login ', err)
    }
  }
  return (
    // Global container
    <main className="h-[calc(100vh-100px)] flex justify-center items-center">
      <div className="bg-gray-50 p-4 max-w-md w-full rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Log in</h2>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label htmlFor="Username" className="text-sm font-medium mb-1"> Username</label>
            <input id="Username" type="text" placeholder="Username" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC6330]" onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium mb-1">Password</label>
            <input id="password" type="text" placeholder="Password" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC6330]" onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="w-full bg-[#CC6330] text-white py-2 rounded-lg font-medium hover:bg-[#CC6330]/80 transition" onClick={()=>handleLogin()}>Login</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-emerald-600 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}

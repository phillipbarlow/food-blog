// import {login} from "../api/api";
// import {token} from "../api/api"

export default function Login() {
  return (
    // Global container
    <main className="h-[calc(100vh-100px)] flex justify-center items-center">
      <div className="bg-gray-50 p-4 max-w-md w-full rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Log in</h2>
        <form className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="emil" className="text-sm font-medium mb-1"> Email</label>
            <input id="email" type="text" placeholder="Email" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC6330]"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium mb-1">Password</label>
            <input id="password" type="text" placeholder="Password" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC6330]"/>
          </div>
          <button type="submit" className="w-full bg-[#CC6330] text-white py-2 rounded-lg font-medium hover:bg-[#CC6330]/80 transition">Login</button>
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

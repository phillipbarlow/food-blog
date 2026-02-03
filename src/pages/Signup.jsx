import { useState } from "react";
import { signup } from "../api/api.js";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const navigate = useNavigate();

  let passwordClasses;
  if (passwordMatch === null) {
    passwordClasses =
      "border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100";
  } else if (passwordMatch === true) {
    passwordClasses =
      "border-emerald-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";
  } else {
    passwordClasses =
      "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100";
  }


  const formSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return
    }
    if (password.length === 0 && confirmPassword.length === 0) {
      setPasswordMatch(null);
      return
    }
      setPasswordMatch(true);
    try{
        const payload = {display_name:displayName,username, password}
        console.log("Sending payload:", payload);
        const result = await signup(payload)
        console.log("Success",result)
        navigate("/");
      }catch(err){
        console.log('Error from signup ',err)
      }finally{
        setDisplayName("")
      }
  }

  return (
    <main
      className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-slate-50 px-4 "
      onSubmit={formSubmit}
    >
      <section className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Heading */}
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-slate-500">
            Join CookBakeShare to save favourites and share recipes.
          </p>
        </header>
        <form className="space-y-4">
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
              {" "}
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="John Doe"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="userName"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="username here"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none passwordClasses`}
              placeholder="Repeat your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordMatch !== false && <p className="text-xs text-slate-400">
              Use at least 8 characters, including a number.
            </p>}
            {passwordMatch === false &&(
              <p className="text-xs text-red-400">Both passwords must match.</p>
            )}
          </div>
          <div className="space-y-1">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-700"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none
              ${passwordClasses}`}
              placeholder="Repeat your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 text-xs text-slate-500">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              required
            />
            <span>
              I agree to the{" "}
              <button
                type="button"
                className="text-emerald-600 hover:underline"
              >
                terms &amp; conditions.
              </button>
            </span>
          </label>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition focus:outline-none focus:ring-2 focus:ring-emerald-300"
            // disabled={!passwordMatch}
          >
            Sign up
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-emerald-600 hover:underline"
          >
            Log in
          </a>
        </p>
      </section>
    </main>
  );
}

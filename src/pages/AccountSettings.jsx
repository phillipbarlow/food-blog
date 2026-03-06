import { useEffect, useState } from "react";
import "../styles/recipeForm.css";
import { useAuth } from "../hooks/userAuth";
import { useNavigate } from "react-router-dom";

export default function AccountSettings() {
  const [userCurrent, setUserCurrent] = useState("");
  const [newUser, setNewUser] = useState({ email: "", password: "" });  
  const {logout} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
// console.log(storedUser)
  }, []);
  
  function handleChange(e) {
    const { name, value } = e.target;
    setNewUser((curr) => ({
      ...curr,
      [name]: value,
    }));
    // console.log(newUser)
  }
  function handleLogout(){
    logout()
    navigate("/login")
  }
  
  // function handleSubmit(e){
  //    e.preventDefault();


  // }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Layout */}
      <main className=" max-w-5xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className=" md:col-span-4 recipe-form max-h-max ">
          <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300 transition">
            Log out
          </button>
        </aside>

        {/* Main Content */}
        <section className="md:col-span-8 recipe-form">
          <h1 className="text-2xl font-semibold">Account Settings</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your login details and security.
          </p>

          {/* Account Info */}
          <div className="mt-6 bg-white  rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Your Account</h2>

            <div className="mt-4 bg-slate-50 rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Signed in as
              </p>
              <p className="mt-1 font-medium text-slate-900">
                {userCurrent || "johnDoe@email.com"}
              </p>
            </div>
          </div>

          {/* Change Email */}
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Change Email</h2>
            <p className="text-sm text-slate-600 mt-1">
              Confirm with your password.
            </p>

            <form className="mt-5 space-y-4">
              <div>
                <label className="field-label">Current email</label>
                <input
                  type="email"
                  value="phil@email.com"
                  disabled
                  className="text-input"
                />
              </div>

              <div>
                <label className="field-label">New email</label>
                <input
                  type="email"
                  placeholder="new@email.com"
                  className="text-input"
                  onChange={handleChange}
                  name="email"
                />
              </div>

              <div>
                <label className="field-label">Confirm password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="text-input"
                  onChange={handleChange}
                  name="password"
                />
              </div>

              <div className="flex justify-end">
                <button type="button" className="primary-button">
                  Save Email
                </button>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="mt-6 bg-white  rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Change Password</h2>
            <p className="text-sm text-slate-600 mt-1">Minimum 8 characters.</p>

            <form className="mt-5 space-y-4">
              <div>
                <label className="field-label">Current password</label>
                <input type="password" className="text-input" />
              </div>

              <div>
                <label className="field-label">New password</label>
                <input type="password" className="text-input" />
              </div>

              <div>
                <label className="field-label">Confirm new password</label>
                <input type="password" className="text-input" />
              </div>

              <div className="flex justify-end">
                <button type="button" className="primary-button">
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Logout Section */}
          <div className="mt-6 bg-white border border-rose-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Danger Zone</h2>
            <p className="text-sm text-slate-600 mt-1">
              Logging out removes your session from this device.
            </p>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 border border-rose-300 text-rose-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-50"
            >
              Log Out
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

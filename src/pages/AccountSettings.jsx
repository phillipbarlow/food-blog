import { useEffect, useState } from "react";
import "../styles/recipeForm.css";
import { useAuth } from "../hooks/userAuth";
import { useNavigate } from "react-router-dom";
import { updateUserApi } from "../api/api.js";

export default function AccountSettings() {
  const [userCurrent, setUserCurrent] = useState({
    username: "",
    password: "",
  });
  const [newUser, setNewUser] = useState({
    newUsername: "",
    newPassword: "",
    confirmedPassword: "",
  });
  const { logoutAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setUserCurrent(JSON.parse(localStorage.getItem("user")));
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewUser((curr) => ({
      ...curr,
      [name]: value,
    }));
  }

  //  function handlePasswordChange(e) {
  //   const { name, value } = e.target;
  //   setNewUser((curr) => ({
  //     ...curr,
  //     [name]: value,
  //   }));
  // }

  function handleLogout() {
    logoutAuth();
    navigate("/login");
  }

  async function handleUsernameSubmit(e) {
    e.preventDefault();
    const payload = {
      newUsername: newUser.newUsername,
      password: newUser.password,
    };
    const data = await updateUserApi(payload);

    setUserCurrent((curr) => ({
      ...curr,
      username: data.user.username,
    }));
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("user")),
        username: data.user.username,
      }),
    );
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    const payload = {
      password: newUser.password,
      newPassword: newUser.newPassword,
      confirmPassword: newUser.confirmedPassword,
    };
    await updateUserApi(payload);
    
    setNewUser((curr) => ({
      ...curr,
      password: "",
      newPassword: "",
      confirmedPassword: "",
    }));
  }
  
  console.log(newUser)
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Layout */}
      <main className=" max-w-5xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className=" md:col-span-4 recipe-form max-h-max ">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300 transition"
          >
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
                {userCurrent?.username || ""}
              </p>
            </div>
          </div>

          {/* Change Username */}
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Change username</h2>
            <p className="text-sm text-slate-600 mt-1">
              Confirm with your password.
            </p>

            <form className="mt-5 space-y-4" onSubmit={handleUsernameSubmit}>
              <div>
                <label className="field-label">Current username</label>
                <input
                  type="text"
                  value={userCurrent?.username || ""}
                  disabled
                  className="text-input"
                />
              </div>

              <div>
                <label className="field-label">New username</label>
                <input
                  name="newUsername"
                  type="text"
                  placeholder="new username"
                  className="text-input"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="field-label">Confirm password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="text-input"
                  onChange={handleInputChange}
                  name="password"
                />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="primary-button">
                  Save Email
                </button>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="mt-6 bg-white  rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Change Password</h2>
            <p className="text-sm text-slate-600 mt-1">Minimum 8 characters.</p>

            <form className="mt-5 space-y-4" onSubmit={handlePasswordSubmit}>
              <div>
                <label className="field-label">Current password</label>
                <input
                  type="password"
                  className="text-input"
                  name="password"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="field-label">New password</label>
                <input
                  name="newPassword"
                  type="password"
                  className="text-input"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="field-label">Confirm new password</label>
                <input
                  name="confirmedPassword"
                  type="password"
                  className="text-input"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="primary-button">
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

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    const res = await fetch("https://simple-server-green.vercel.app/resert-pass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: state.email,
        code: state.code,
        newPassword,
      }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage("✅ Password reset successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMessage(`❌ ${data.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleReset}
        className="bg-white p-6 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-xl font-bold text-center mb-4">
          Reset Your Password
        </h2>
        <input
          type="password"
          className="border p-2 w-full rounded mb-3"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
          Reset Password
        </button>
        {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;

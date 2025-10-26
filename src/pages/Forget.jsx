import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://simple-server-green.vercel.app/reset-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage("✅ Code sent to your email");
      setTimeout(() => navigate("/verify-code", { state: { email } }), 1500);
    } else {
      setMessage(`❌ ${data.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-xl font-bold text-center mb-4">Forgot Password</h2>
        <input
          type="email"
          className="border p-2 w-full rounded mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Send Reset Code
        </button>
        {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;

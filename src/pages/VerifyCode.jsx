import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    if (code.length === 6) {
      navigate("/reset-password", { state: { email: state.email, code } });
    } else {
      setMessage("❌ Enter a valid 6-digit code");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-xl font-bold text-center mb-4">Verify Code</h2>
        <input
          type="text"
          maxLength="6"
          className="border p-2 w-full rounded text-center tracking-widest mb-3"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Verify Code
        </button>
        {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default VerifyCode;

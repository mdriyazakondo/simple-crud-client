import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // store email for verification
  const [showVerify, setShowVerify] = useState(false); // toggle verification input

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const emailInput = e.target.email.value;
    const password = e.target.password.value;

    fetch("https://simple-server-green.vercel.app/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: emailInput, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Registration Successful!",
            text: "A verification code has been sent to your email.",
            icon: "success",
            draggable: true,
          });
          setEmail(emailInput); // save email for verification
          setShowVerify(true); // show verification input
        } else {
          Swal.fire({ title: "Error", text: data.message, icon: "error" });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    const code = e.target.code.value;

    fetch("https://simple-server-green.vercel.app/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Email Verified!",
            icon: "success",
            draggable: true,
          });
          navigate("/login"); // redirect to login after verification
        } else {
          Swal.fire({ title: "Error", text: data.message, icon: "error" });
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      {!showVerify ? (
        <form
          onSubmit={handleSubmitRegister}
          className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Register Now
          </h2>
          <input
            className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
          <input
            className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <input
            className="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          <button
            type="submit"
            className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 active:scale-95 transition py-2.5 rounded-full text-white"
          >
            Register
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleVerifyCode}
          className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Verify Your Email
          </h2>
          <input
            className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="text"
            name="code"
            placeholder="Enter verification code"
            required
          />
          <button
            type="submit"
            className="w-full mb-3 bg-green-500 hover:bg-green-600/90 active:scale-95 transition py-2.5 rounded-full text-white"
          >
            Verify
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;

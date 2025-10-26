import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [showVerify, setShowVerify] = useState(false);

  // initial login request (sends code)
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const emailInput = e.target.email.value;
    const password = e.target.password.value;

    fetch("https://simple-server-green.vercel.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailInput, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Login Code Sent!",
            text: "Check your email and enter the code to complete login.",
            icon: "info",
            draggable: true,
          });
          setEmail(emailInput);
          setShowVerify(true);
        } else {
          Swal.fire({
            title: "Login Failed",
            text: data.message,
            icon: "error",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // verify login code
  const handleVerifyCode = (e) => {
    e.preventDefault();
    const code = e.target.code.value;

    fetch("https://simple-server-green.vercel.app/verify-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Login Successful!",
            icon: "success",
            draggable: true,
          });
          setUser(data.user);
          navigate("/");
        } else {
          Swal.fire({
            title: "Verification Failed",
            text: data.message,
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      {!showVerify ? (
        <form
          onSubmit={handleSubmitLogin}
          className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Login Now
          </h2>
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
          <div className="text-right py-4">
            <p className="text-sm text-center mt-3">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 active:scale-95 transition py-2.5 rounded-full text-white"
          >
            Log in
          </button>
          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 underline">
              Signup Now
            </Link>
          </p>
        </form>
      ) : (
        <form
          onSubmit={handleVerifyCode}
          className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Enter Login Code
          </h2>
          <input
            className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="text"
            name="code"
            placeholder="Enter code from email"
            required
          />
          <button
            type="submit"
            className="w-full mb-3 bg-green-500 hover:bg-green-600/90 active:scale-95 transition py-2.5 rounded-full text-white"
          >
            Verify & Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
      >
        <div className="flex justify-center mb-6">
          <h2 className="text-xl font-medium text-green-500">FOOD</h2>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Nhập email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Nhập password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer"
        >
          Đăng nhập
        </button>
        <p className="mt-6 text-center text-sm">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500">
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

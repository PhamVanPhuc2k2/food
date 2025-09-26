import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (guestId && cart?.products?.length > 0) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          // ✅ Load lại giỏ hàng của user sau khi merge
          dispatch(fetchCart({ userId: user._id }));
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        // ✅ Nếu không có cart guest thì load trực tiếp
        dispatch(fetchCart({ userId: user._id }));
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, dispatch, navigate, isCheckoutRedirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
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
          <Link
            to={`/register?redirect=${encodeURIComponent(redirect)}`}
            className="text-blue-500"
          >
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

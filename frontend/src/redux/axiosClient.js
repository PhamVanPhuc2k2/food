import axios from "axios";
import store from "../redux/store";
import { setAccessToken, logout } from "../redux/slices/authSlice";

// Tạo instance cho app
const axiosClient = axios.create({
  baseURL: "http://localhost:8888", // nên để luôn /api cho đồng bộ
  withCredentials: true, // gửi cookie refreshToken
});

// Request interceptor
axiosClient.interceptors.request.use((config) => {
  const token =
    store.getState().auth.accessToken || localStorage.getItem("access_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // gọi refresh token bằng axios gốc
        const res = await axios.post(
          "http://localhost:8888/api/user/refresh-token",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.access_token;

        // lưu vào redux + localStorage
        store.dispatch(setAccessToken(newAccessToken));

        // cập nhật lại header mặc định cho các request tiếp theo
        axiosClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        // gắn lại vào request bị lỗi
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest); // retry lại request cũ
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

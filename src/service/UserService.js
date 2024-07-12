import axiosInstance from "../common/configuration/ApiClient";

class UserService {
  static async login(email, password) {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async register(userData) {
    try {
      const response = await axiosInstance.post("/auth/register", userData, {});
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getUserProfile(token) {
    try {
      const response = await axiosInstance.get("adminuser/get-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(localStorage.getItem("token"));
      console.log(response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async UserProfile(token) {
    try {
      const response = await axiosInstance.get("adminuser/get-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(localStorage.getItem("token"));
      console.log(response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }
}

export default UserService;

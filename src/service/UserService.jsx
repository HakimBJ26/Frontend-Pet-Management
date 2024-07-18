import axiosInstance from "../common/configuration/ApiClient";
import {
  GET_PROFILE_API,
  LOGIN_API,
  REGISTER_API,
  UPDATE_PROFILE_API,
} from "../common/configuration/constants/PathBack";


class UserService {
  static async login(email, password) {
    try {
      const response = await axiosInstance.post(LOGIN_API, {
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
      const response = await axiosInstance.post(REGISTER_API, userData, {});
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getUserProfile(token) {
    try {
      const response = await axiosInstance.get(GET_PROFILE_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(localStorage.getItem("token"));
      console.log(response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateUserProfile(token, updatedProfile) {
    try {
      const response = await axiosInstance.put(
        UPDATE_PROFILE_API,
        updatedProfile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
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



  static async getAllUsers(token) {
    try {
      const response = await axiosInstance.get("/admin/get-all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateUser(userId, userData, token) {
    try {
      const response = await axiosInstance.put(
        `/admin/update/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
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

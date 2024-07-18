import { axiosInstance, axiosPrivate } from '../common/configuration/ApiAuth'; 
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
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async register(userData) {
    try {
      const response = await axiosInstance.post(REGISTER_API, userData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getUserProfile() {
    try {
      const response = await axiosPrivate.get(GET_PROFILE_API, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateUserProfile(token, updatedProfile) {
    try {
      const response = await axiosPrivate.put(
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

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }


  static async updateUser(userData) {
    try {
      const response = await axiosPrivate.put(
        UPDATE_PROFILE_API,
        userData,
        { withCredentials: true }
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

import axiosInstance from "../common/configuration/ApiClient";
import { ROLE_ADMIN, ROLE_CLIENT } from "../common/configuration/constants/UserRole";

class UserService{
   

    static async login(email, password){
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            return response.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
        
    }

    static async register(userData){
        try{
            const response = await axiosInstance.post('/auth/register', userData, {})
            return response.data;
        }catch(err){
            throw err;
        }
    }

   

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === ROLE_ADMIN
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === ROLE_CLIENT
    }

    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static async getAllUsers(token){
        try{
            const response = await axiosInstance.get('/admin/get-all-users', 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async updateUser(userId, userData, token){
        try{
            const response = await axiosInstance.put(`/admin/update/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
  

}

export default UserService;
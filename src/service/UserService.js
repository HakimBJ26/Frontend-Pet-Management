import axiosInstance from "../common/configuration/ApiClient";

class UserService{
   

    static async login(email, password){
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
           console.log(response.data)
            return response.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
        
    }

    static async register(userData){
        try{
            const response = await axiosInstance.post('/auth/register', userData, 
            {
               
            })
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
        return role === 'ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

  

}

export default UserService;
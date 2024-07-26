import { axiosInstance, axiosPrivate } from '../common/configuration/ApiAuth'; 
import {
  APPROVE_VETO_ACC_API,
  GET_PROFILE_API,
  GET_USERS_API,
  GET_VETO_ACC_TO_APPROVE,
  LOGIN_API,
  LOG_OUT_API,
  REGISTER_API,
  RESET_PASS,
  SEND_RESET_PASS_MAIL,
  UPDATE_PROFILE_API,
  UPDATE_USER_PROFILE_BY_ADMIN,
  VERIFY_RESET_PASS_TOKEN,
} from "../common/configuration/constants/PathBack";

class UserService {
  static async login(email, password) {
    try {
      const response = await axiosInstance.post(LOGIN_API, {
        email,
        password,
      },   {
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
      const response = await axiosInstance.post(REGISTER_API, userData, 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }


  static async sendResetPassMail (email){
  
  try{
    const response=await axiosInstance.post(  SEND_RESET_PASS_MAIL,
      {'email':`${email}`},
    )
    return response.data;
  }catch(err){
    console.log(err)
  }


  }

  static async verifyResetPassToken (token){
  
    try{
      const response=await axiosInstance.post(  VERIFY_RESET_PASS_TOKEN,
        {'token':`${token}`},
        { withCredentials: true }
      )
      return response;
    }catch(err){

      console.log(err)
      return err
    }
  
  
    }
  


    static async resetPassword(pass,confirmPass) {
      try {
        const response = await axiosPrivate.put(
          RESET_PASS,
          {
            "newPassword": `${pass}`,
            "confirmPassword": `${confirmPass}`
        },
        { withCredentials: true }
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    }



  static async approveVetoRequest(email) {
    try {
      const response = await axiosPrivate.put(
        APPROVE_VETO_ACC_API,
        {'email':`${email}`},
        { withCredentials: true }
      );
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

  static async updateUserProfile(userData) {
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





  static logout= async()=>{
    const response=await axiosPrivate.post(LOG_OUT_API,{
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    if(response){
        localStorage.removeItem("role");
    localStorage.removeItem("id");
    }


  }

  static async getVetoAcoountToApproved(){
    try{
        const response = await axiosPrivate.get(GET_VETO_ACC_TO_APPROVE, 
          { withCredentials: true }
       )
        return response.data;
    }catch(err){
        throw err;
    }
}


  static async getAllUsers(){
    try{
        const response = await axiosPrivate.get(GET_USERS_API, 
          { withCredentials: true }
       )
        return response.data;
    }catch(err){
        throw err;
    }
}

  static async updateUser(id,userData) {
    try {
      const response = await axiosPrivate.put(
        `${UPDATE_USER_PROFILE_BY_ADMIN}/${id}`,
        userData,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }



}
export default UserService;

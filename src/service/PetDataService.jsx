import { PET_VITAL_SIGNS } from "../common/configuration/constants/PathBack";
import {  axiosPrivate } from '../common/configuration/ApiAuth'; 

class petDataService {

  static async getVitalSigns(id) {
    try {
      const response = await axiosPrivate.get(`${PET_VITAL_SIGNS}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }







}
export default petDataService;

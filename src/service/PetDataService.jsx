import { OVERVIEW_API, PET_GOAL_API, PET_HEALTH_SCORE, PET_HEALTH_STATS, PET_VITAL_SIGNS, VET_APPOINTEMENT_API } from "../common/configuration/constants/PathBack";
import { axiosPrivate } from '../common/configuration/ApiAuth';

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


  static async getHealthScore(id) {
    try {
      const response = await axiosPrivate.get(`${PET_HEALTH_SCORE}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }


  static async getOverview(id) {
    try {
      const response = await axiosPrivate.get(`${OVERVIEW_API}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getVetAppointment(id) {
    try {
      const response = await axiosPrivate.get(`${VET_APPOINTEMENT_API}/${id}/compare`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getPetGoal(id) {
    try {
      const response = await axiosPrivate.get(`${PET_GOAL_API}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }


  static async getHealthStats(id) {
    try {
      const response = await axiosPrivate.get(`${PET_HEALTH_STATS}/${id}`, {
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

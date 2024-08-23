import { ACTIVITY_PROPOSITION_API, OVERVIEW_API, PET_GOAL_API, PET_HEALTH_STATS, PET_VITAL_SIGNS, SLEEP_PATTERN_API, VET_APPOINTEMENT_API } from "../common/configuration/constants/PathBack";
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

  static async getActivityPropositions() {
    try {
      const response = await axiosPrivate.get(`${ACTIVITY_PROPOSITION_API}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }


  static async addActivityProposition(activity) {
    try {
      const response = await axiosPrivate.post(ACTIVITY_PROPOSITION_API, activity);
      return response.data;
    } catch (err) {
      console.error("Error adding pet:", err);
      throw err;
    }
  }

  static async deleteActivityProposition(id) {
    try {
      const response = await axiosPrivate.delete(
        `${ACTIVITY_PROPOSITION_API}/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  static async getSleepPatterns(id) {
    try {
      const response = await axiosPrivate.get(`${SLEEP_PATTERN_API}/${id}`, {
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
      const response = await axiosPrivate.get(`${PET_GOAL_API}/pet/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async setPetGoal(healthGoal) {
    try {
      const response = await axiosPrivate.post(`${PET_GOAL_API}`,healthGoal, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async UpdatePetGoal(goalId,healthGoal) {
    try {
      const response = await axiosPrivate.put(`${PET_GOAL_API}/${goalId}`,healthGoal, {
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

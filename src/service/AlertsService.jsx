import { DISMISS_HEALTH_ALERTS_API, HEALTH_ALERTS_API } from "../common/configuration/constants/PathBack";
import {  axiosPrivate } from '../common/configuration/ApiAuth'; 

class AlertsService {

  static async getHealthAlerts(id) {
    try {
      const response = await axiosPrivate.get(`${HEALTH_ALERTS_API}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }


  static async deleteAlerts(id) {
    try {
      const response = await axiosPrivate.delete(
        `${DISMISS_HEALTH_ALERTS_API}/${id}`,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      return response.data;
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

}
export default AlertsService;

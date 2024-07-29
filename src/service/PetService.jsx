import { axiosPrivate } from "../common/configuration/ApiAuth";
import { ADD_PET_API } from "../common/configuration/constants/PathBack";

class PetService {
  static async addPet(petData) {
    try {
      const response = await axiosPrivate.post(ADD_PET_API, petData);
      return response.data;
    } catch (err) {
      console.error("Error adding pet:", err);
      throw err;
    }
  }

  // Other methods...
}

export default PetService;

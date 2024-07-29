import { axiosPrivate } from "../common/configuration/ApiAuth";
import {
  ADD_PET_API,
  GET_PET_BY_ID_API,
  GET_PETS_API,
} from "../common/configuration/constants/PathBack";

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

  static async getPetById(petId) {
    try {
      const response = await axiosPrivate.get(`${GET_PET_BY_ID_API}/${petId}`);
      return response.data;
    } catch (err) {
      console.error("Error fetching pet data:", err);
      throw err;
    }
  }

  static async getAllPets() {
    try {
      const response = await axiosPrivate.get(GET_PETS_API);
      return response.data;
    } catch (err) {
      console.error("Error fetching pets:", err);
      throw err;
    }
  }
}

export default PetService;

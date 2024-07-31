import { axiosPrivate } from "../common/configuration/ApiAuth";
import {
  ADD_PET_API,
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

  static async getPets() {
    try {
      const res = await axiosPrivate.get(GET_PETS_API, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
  // Other methods...
  static async getPetProfile(petId) {
    try {
      const response = await axiosPrivate.get(`/pets/${petId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching pet profile:", error);
      throw error;
    }
  }

  static async uploadPetPhoto(petId, file) {
    const formData = new FormData();
    formData.append("photo", file);

    const response = await axiosPrivate.post(`/pets/${petId}/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}

export default PetService;

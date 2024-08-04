import { axiosPrivate } from "../common/configuration/ApiAuth";
import {
  ADD_PET_API,
  GET_ALL_PETS_API,
  GET_PET_BY_ID_API,
  UPDATE_PET_API,
  GET_CURRENT_USER_PETS_API,
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
      const res = await axiosPrivate.get(GET_ALL_PETS_API, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getCurrentUserPets() {
    try {
      const res = await axiosPrivate.get(GET_CURRENT_USER_PETS_API, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  static async updatePet(petId, petData) {
    try {
      const response = await axiosPrivate.put(
        `${UPDATE_PET_API}/${petId}`,
        petData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating pet:", error);
      throw error;
    }
  }

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

    const response = await axiosPrivate.post(
      `/api/pets/${petId}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
}

export default PetService;

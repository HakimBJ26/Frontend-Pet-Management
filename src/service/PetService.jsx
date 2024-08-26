import { axiosPrivate } from "../common/configuration/ApiAuth";
import {
  ADD_PET_API,
  GET_ALL_PETS_API,
  UPDATE_PET_API,
  GET_CURRENT_USER_PETS_API,
  BREED_CERTIF_API,
  VERIFY_CERTIF_CERTIF_API,
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

  
  static async updatePetImage(petId, imageUrl) {
    try {
      const response = await axiosPrivate.put(
        `/api/pets/${petId}/image-url`,
        null, 
        {
          params: { imageUrl }, 
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating pet:", error);
      throw error;
    }
  }
  static async getPetProfile(petId) {
    try {
      const response = await axiosPrivate.get(`api/pets/${petId}`);
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

  static async requestBreedCertif(petId,birthDate) {
    try {
      const response = await axiosPrivate.post(`${BREED_CERTIF_API}/${petId}?birthDate=${birthDate}`);
      return response.data;
    } catch (err) {
      console.error("Error requesting breed certif:", err);
      throw err;
    }
  }

  static async verifyCertif(petId) {
    try {
      const response = await axiosPrivate.get(`${VERIFY_CERTIF_CERTIF_API}?uniqueId=${petId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching pet profile:", error);
      throw error;
    }
  }
}
export default PetService;
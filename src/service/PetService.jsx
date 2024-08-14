import { axiosPrivate } from "../common/configuration/ApiAuth";
import {
  ADD_PET_API,
  GET_ALL_PETS_API,
  GET_PET_BY_ID_API,
  UPDATE_PET_API,
  GET_CURRENT_USER_PETS_API,
  GET_SAFE_ZONES_API,
  DELETE_SAFE_ZONE_API,
  UPDATE_SAFE_ZONE_API,
  ADD_SAFE_ZONE_API,
 
  GET_SAFE_ZONE_BY_HOME, GET_SAFE_ZONE_BY_VET, GET_SAFE_ZONE_BY_PARK 
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


  static async addSafeZone(petId, positionDtos) {
    try {
      const response = await axiosPrivate.post(`${ADD_SAFE_ZONE_API}/${petId}`, positionDtos, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding safe zone:", error);
      throw error;
    }
  }

  static async getSafeZones(petId) {
    try {
      const response = await axiosPrivate.get(GET_SAFE_ZONES_API(petId), {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching safe zones:", error);
      throw error;
    }
  }

  static async updateSafeZone(petId, safeZoneId, positionDtos) {
    try {
      const response = await axiosPrivate.put(UPDATE_SAFE_ZONE_API(petId, safeZoneId), positionDtos, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating safe zone:", error);
      throw error;
    }
  }

  static async deleteSafeZone(petId, safeZoneId) {
    try {
      const response = await axiosPrivate.delete(DELETE_SAFE_ZONE_API(petId, safeZoneId), {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting safe zone:", error);
      throw error;
    }
  }



  static async getHomePositions(petId) {
    try {
      const response = await axiosPrivate.get(GET_SAFE_ZONE_BY_HOME(petId), {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching home positions:", error);
      throw error;
    }
  }

static async getVetPositions(petId) {
  try {
    const response = await axiosPrivate.get(GET_SAFE_ZONE_BY_VET(petId), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching vet positions:", error);
    throw error;
  }
}


static async getParkPositions(petId) {
  try {
    const response = await axiosPrivate.get(GET_SAFE_ZONE_BY_PARK(petId), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching park positions:", error);
    throw error;
  }
}
};
export default PetService;

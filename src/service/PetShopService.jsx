import { PET_SHOP, SEARCH_IN_PET_SHOP_BY_NAME } from "../common/configuration/constants/PathBack";
import {  axiosPrivate } from '../common/configuration/ApiAuth'; 

class PetShopService {

  static async getAllProducts() {
    try {
      const response = await axiosPrivate.get(PET_SHOP, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getProductByName (name){
      try{
        const response = await axiosPrivate.get(`${SEARCH_IN_PET_SHOP_BY_NAME}?name=${name}`, { withCredentials: true });
        return response.data ;
      }catch(err){
        console.log(err)
        throw err ;
      }
  }

  static async updateProduct(productData) {
    try {
      const response = await axiosPrivate.put(
        `${PET_SHOP}/${productData.id}`,
        productData,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  static async deleteProduct(id) {
    try {
      const response = await axiosPrivate.delete(
        `${PET_SHOP}/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  static async addProduct(productData) {
    try {
      const response = await axiosPrivate.post(
        PET_SHOP,
        productData,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

}
export default PetShopService;

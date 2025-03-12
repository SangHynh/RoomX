import axios from "axios";
import Cookies from "js-cookie"; 

const API_BASE_URL = import.meta.env.VITE_BACKEND_HOST; 

export class UserService {
  async getListUsers(page: number, size: number) {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No authentication token found in cookies");
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/users`, {
        params: { page, size },
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
          "X-tenantId": `${import.meta.env.VITE_KEYCLOAK_REALM}`,
        },
      });
      return response.data.result;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
}

import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_BACKEND_HOST;

export class ServiceService {
  // Lấy danh sách dịch vụ
  async getListServices(page: number, size: number) {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No authentication token found in cookies");
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/services/filters`, {
        params: { page, size },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-tenantId": `${import.meta.env.VITE_KEYCLOAK_REALM}`,
        },
      });
      return response.data.result;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  }

  // Thêm dịch vụ
  async createService(serviceData: any) {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No authentication token found in cookies");
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/services`,
        serviceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-tenantId": `${import.meta.env.VITE_KEYCLOAK_REALM}`,
          },
        }
      );
      return response.data.result;
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  }
}

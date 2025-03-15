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

  // Lấy thông tin chi tiết
  async getUserDetails(userId: string) {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No authentication token found in cookies");
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/users`, {
        params: { userId, size: 1, page: 0 },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-tenantId": `${import.meta.env.VITE_KEYCLOAK_REALM}`,
        },
      });
      console.log(response.data.result.content[0]);
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  }

  // Phương thức POST để tạo người dùng mới
  async createUser(userData: {
    userCode: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    gender: string;
    email: string;
    type: string;
    roles: string[];
  }) {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No authentication token found in cookies");
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/users`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-tenantId": `${import.meta.env.VITE_KEYCLOAK_REALM}`,
        },
      });
      console.log("thanh cong");
      return response.data.result;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

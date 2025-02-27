import { UserType } from "@/types/UserType";
import axios from "axios";

export class UserService {
  private apiURL: string;

  constructor() {
    this.apiURL = "http://localhost:5000/users";
  }

  // Lấy danh sách người dụng
  public async getAllUsers(): Promise<UserType[]> {
    try {
      const res = axios.get(this.apiURL);
      const users: UserType[] = (await res).data;
      return users;
    } catch (error) {
      throw error;
    }
  }
}

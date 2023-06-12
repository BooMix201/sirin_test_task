import { AxiosResponse } from "axios";
import $api from "../http";
import { User } from "../models/User";

export default class UserService {
  static getUsers() {
    throw new Error('Method not implemented.');
  }

  static async users(): Promise<AxiosResponse<User[]>> {
    return $api.get<User[]>('users');
  }
  static fetchUsers(): Promise<AxiosResponse<User[]>> {
    return $api.get<User[]>('/users')
}
}
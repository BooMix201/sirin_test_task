import { makeAutoObservable } from "mobx";
import { User } from "../models/User";
import AuthService from "../services/AuthService";
import axios from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
  user = {} as User;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(boolean: boolean) {
    this.isAuth = boolean;
  }

  setUser(user: User) {
    this.user = user;
  }

  setLoading(boolean: boolean) {
    this.isLoading = boolean;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);

      console.log(response);

      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err: any) {
      console.log(err.response?.data?.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);

      console.log(response);

      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err: any) {
      console.log(err.response?.data?.message);
    }
    
  }

  async logout() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as User);
    } catch (err: any) {
      console.log(err.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);

    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true
      });

      console.log(response);

      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err: any) {
      console.log(err.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  
}
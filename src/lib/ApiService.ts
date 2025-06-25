
import axios, { AxiosInstance } from "axios";
import { UserUpdate } from "@/types";

export class ApiService {
  private static instance: ApiService;
  private baseUrl: string;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public async initAuth(walletAddress: string) {
    const response = await this.axiosInstance.post(`/auth/init-wallet-auth`, { walletAddress });
    return response.data;
  }

  public async veryfySignature(walletAddress: string, signedMessage: string) {
    const response = await this.axiosInstance.post(`/auth/verify-signature`, { walletAddress, signedMessage });
    return response.data;
  }

  public async initSignIn(walletAddress: string) {
    const response = await this.axiosInstance.post(`/auth/init-signin`, { walletAddress });
    return response.data;   
  }

  public async signIn(walletAddress: string, signedMessage: string) {
    const response = await this.axiosInstance.post(`/auth/signin`, { walletAddress, signedMessage });
    return response.data;   
  }

  public async refreshToken(refreshToken: string) {
    const response = await this.axiosInstance.post(`/auth/refresh-token`, { refreshToken });
    return response.data;
  }

  public async signOut(walletAddress: string) {
    const response = await this.axiosInstance.post(`/auth/signout`, { walletAddress });
    return response.data;
  }

  public async getUser() {
    const response = await this.axiosInstance.get(`/user/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });
    return response.data.user;
  }

  public async updateUser(user: UserUpdate) {
    const response = await this.axiosInstance.post(`/user/update`, user, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });
    return response.data;
  }

  public async submitPrompt(name: string, prompt: string) {
    const response = await this.axiosInstance.post(`/video/generate`, { name, prompt }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });
    return response.data;
  }
}
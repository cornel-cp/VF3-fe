import axios, { AxiosInstance } from "axios";
import { UserUpdate } from "@/types";

export class  ApiService {
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

  public async submitPrompt(formData: any) {
    const response = await this.axiosInstance.post(`/video/generate`, {formData}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });
    return response.data;
  }

  public async sendDepositSignature(txHash: string) {
    const response = await this.axiosInstance.post(`/user/deposit`, { txHash }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });
    return response.data;
  }

  public async withdrawRequest(amount: number, walletAddress: string) {
    const response = await this.axiosInstance.post(`/user/withdraw-request`, { amount, walletAddress }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });
    return response.data;
  }

  public async withdraw(signedMessage: string) {
    const response = await this.axiosInstance.post('/user/withdraw', { signedMessage }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });
    return response.data;
  }

  public async getHeroes() {
    const response = await this.axiosInstance.get('/user/heroes/all', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });
    return response.data;
  }

  public async getCharacterById(characterId: string) {
    const response = await this.axiosInstance.get(`/user/heroes/${characterId}`);
    return response.data.character;
  }

  public async createBattle(characterId: string, betAmount: number) {
    const response = await this.axiosInstance.post('/battle/create', {
      characterId,
      betAmount
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });
    return response.data;
  }

  public async joinBattle(battleId: string, characterId: string) {
    const response = await this.axiosInstance.post(`/battle/${battleId}/join`, {
      characterId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });
    return response.data;
  }

  public async getBattleById(battleId: string) {
    const response = await this.axiosInstance.get(`/battle/${battleId}`);
    return response.data;
  }

  public async getBattles(params?: {
    searchParams?: string;
    limit?: number;
    page?: number;
    status?: 'pending' | 'video_generated' | 'finished';
    creatorId?: string;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.searchParams) queryParams.append('searchParams', params.searchParams);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.creatorId) queryParams.append('creatorId', params.creatorId);
    
    const url = `/battle/all${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await this.axiosInstance.get(url);
    return response.data;
  }

  public async getLeaderboard(searchParams?: string) {
    const url = searchParams ? `/user/leaderboard?searchParams=${encodeURIComponent(searchParams)}` : '/user/leaderboard';
    const response = await this.axiosInstance.get(url);
    return response.data;
  }

}
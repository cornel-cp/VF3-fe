import axios from "axios";

export class CDNService {
    private static instance: CDNService;
    private baseUrl: string;
    private cloudName: string;

    private constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_CDN_BASE_URL || "";
        this.cloudName = process.env.NEXT_PUBLIC_CDN_NAME || "";
    }

    public static getInstance(): CDNService {
        if (!CDNService.instance) {
            CDNService.instance = new CDNService();
        }
        return CDNService.instance;
    }

    public async uploadImage(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "avatars");
        formData.append("cloud_name", this.cloudName);
        const response = await axios.post(`${this.baseUrl}/${this.cloudName}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data.url;
    }
}
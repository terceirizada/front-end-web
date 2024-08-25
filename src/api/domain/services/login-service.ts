import { api } from "../../api"
import { LoginFormData } from "../../../types/login";
import { ApiResponse } from "../../../types/api-response";

export class LoginService {
    async execute<T>(data: LoginFormData): Promise<ApiResponse<T>> {
        const response = await api.post<ApiResponse<T>>('/api/login/', data);
        return response.data
    }
}
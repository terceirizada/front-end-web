import { api } from "../../api"
import { SignUpFormData } from "../../../types/sign-up"
import { ApiResponse } from "../../../types/api-response";

export class SignUpService {
    async execute<T>(data: Omit<SignUpFormData, 'confirmPassword'>): Promise<ApiResponse<T>> {
        const response = await api.post<ApiResponse<T>>("/api/users/", data);
        return response.data
    }
}
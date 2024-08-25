import { api } from "../../api"
import { SignUpFormData } from "../../../types/sign-up"
import { APIResponse } from "../../../types/api";

export class SignUpService {
    async execute<T>(data: Omit<SignUpFormData, 'confirmPassword'>): Promise<APIResponse<T>> {
        const response: APIResponse<T> = await api.post("/api/users/", data);
        return response
    }
}
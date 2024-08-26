import { api } from "../../api"
import { LoginFormData } from "../../../types/login";
import {  APIResponse } from "../../../types/api";

export class LoginService {
    async execute<T>(data: LoginFormData): Promise<APIResponse<T>> {
        const response: APIResponse<T> = await api.post('/api/login/', data);
        return response
    }
}
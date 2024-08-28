import { APIRequest } from "../../../types/api";
import { api } from "../../api";

export class GetProcessesService{
    async execute<T>(): Promise<APIRequest<T>>{
        const token = localStorage.getItem("token");
        const response: APIRequest<T> = await api.get('/api/processes/', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response
    }
}
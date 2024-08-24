import { api } from "../../api"
import { LoginFormData } from "../../../types/login";


export class LoginService {
    async execute(data: LoginFormData){
        const reponse = await api.post('/login', data);
        return reponse
    }
}
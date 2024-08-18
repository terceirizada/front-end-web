import axios from "axios"
import { LoginFormData } from "../../../types/login";


export class LoginService {
    async execute(data: LoginFormData){
        const reponse = await axios.post('/api/login', data);
        return reponse
    }
}
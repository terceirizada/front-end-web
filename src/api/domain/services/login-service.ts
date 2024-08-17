import axios from "axios"
import { LoginFormData } from "../../../types/login";


export class LoginService {
    async execute(data: LoginFormData){
        try{
            const reponse = await axios.post('/api/login', data);
            return reponse
        }catch(e: any){
            console.error(e.message);
            throw new Error('Erro ao fazer login.')
        }
    }
}
import axios from "axios"
import { SignUpFormData } from "../../../types/sign-up"

export class SignUpService{
    async execute(data: SignUpFormData){
        try {
            const response = await axios.post("/api/signup", data);
            return response
        } catch (e: any) {
            console.error(e.message);
            throw new Error('Falha ao cadastrar usuário.')
        }
    }
}
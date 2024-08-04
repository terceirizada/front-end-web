import axios from "axios"

type SignUpData = {
    email: string
    password: string
    confirmPassword: string
}

export class SignUpService{
    async execute(data:SignUpData){
        try {
            const response = await axios.post("/api/signup", data);
            return response
        } catch (e: any) {
            console.error(e.message);
            throw new Error('Falha ao cadastrar usuário.')
        }
    }
}
import axios from "axios"

export type SignInData = {
    email: string
    password: string
}

export class SignInService {
    async execute(data: SignInData){
        try{
            const reponse = await axios.post('/api/login', data);
            return reponse
        }catch(e: any){
            console.error(e.message);
            throw new Error('Erro ao fazer login.')
        }
    }
}
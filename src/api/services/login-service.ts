import axios from "axios"

export type SignInData = {
    email: string
    password: string
}

export const signInUserService = async ({ email, password }: SignInData) => {
    try{
        const reponse = await axios.post('/api/login', { email, password })
        return reponse
    }catch(e: any){
        console.error(e.message);
        throw new Error('Erro ao fazer login.')
    }
}
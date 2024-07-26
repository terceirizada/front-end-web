import axios from "axios"

export type SignUpData = {
    email: string
    password: string
    confirmPassword: string
}

export const signUpService = async ({ email, password }: SignUpData) => {
    try {
        const response = await axios.post("/api/signup", { email, password });
        return response
    } catch (e: any) {
        console.error(e.message);
        throw new Error('Falha ao cadastrar usuário.')
    }
}
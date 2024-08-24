import { api } from "../../api"
import { SignUpFormData } from "../../../types/sign-up"

export class SignUpService{
    async execute(data: SignUpFormData){
        const response = await api.post("/signup", data);
        return response
    }
}
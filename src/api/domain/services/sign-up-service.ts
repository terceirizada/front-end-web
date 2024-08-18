import axios from "axios"
import { SignUpFormData } from "../../../types/sign-up"

export class SignUpService{
    async execute(data: SignUpFormData){
        const response = await axios.post("/api/signup", data);
        return response
    }
}
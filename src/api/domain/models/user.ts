import { BaseModel } from "./base-model";

export default class User implements BaseModel{
    private id: string | undefined;
    private email: string | undefined;

    // Override
    getId(): string | undefined{
        return this.id
    }
    
    getEmail(): string | undefined{
        return this.email
    }

    setId(id: string){
        this.id = id
    }

    setEmail(email: string){
        this.email = email
    }

}
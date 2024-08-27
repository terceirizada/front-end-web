import { BaseModel } from "./base-model";

export default class User implements BaseModel{
    constructor(
        private id?: string,
        private email?: string
    ){}

    // Override
    getId(): string | undefined {
        return this.id
    }
    
    getEmail(): string | undefined{
        return this.email
    }   

}
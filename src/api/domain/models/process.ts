import { BaseModel } from "./base-model";
import User from "./user";

export default class Process implements BaseModel{
    constructor(
        private id: string,
        private responsavel: User,
        private candidato: string,
        private cargo: string,
        private status: string
    ) {}

    // Override
    public getId(): string{
        return this.id;
    }
    
    public getResponsavel(): User {
        return this.responsavel;
    }

    public getCandidato(): string {
        return this.candidato;
    }

    public getCargo(): string {
        return this.cargo;
    }

    public getStatus(): string {
        return this.status;
    }

}
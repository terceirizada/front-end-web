import { BaseModel } from "./base-model";
import User from "./user";

export default class Process implements BaseModel{
    constructor(
        public id: string,
        public responsavel: User,
        public candidato: string,
        public cargo: string,
        public status: string
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
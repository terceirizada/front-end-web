export default class Process {
    private id!: string
    constructor(
        private responsavel: string,
        private candidato: string,
        private cargo: string,
        private status: string
    ) {}

    public getResponsavel(): string {
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

    public getId(): string{
        return this.id;
    }
    

}
export default class Process {
    private id!: string;
    constructor(
        private responsavel: string,
        private candidato: string,
        private cargo: string,
        private status: string
    ) {}

    getResponsavel(): string {
        return this.responsavel;
    }

    getCandidato(): string {
        return this.candidato;
    }

    getCargo(): string {
        return this.cargo;
    }

    getStatus(): string {
        return this.status;
    }

    getId(): string{
        return this.id;
    }
    

}
export class CustomError extends Error {
    errorCode: number;
    constructor(message: string, errorCode: number) {
        super(message);
        this.name = "PokemonError";
        this.errorCode = errorCode;
    }
}
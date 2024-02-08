import { POKEMON_API_ERROR } from "../constantes/errorsCodes";
import { CustomError } from "./CustomError";

export class ApiError extends CustomError{
    constructor(message: string){
        super(message, POKEMON_API_ERROR)
        this.name= "apiError"
    }
}
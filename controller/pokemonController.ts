import {NextFunction, Request, Response } from "express";
import axios, {AxiosResponse} from "axios";
import { POKEMONAPI_URL } from "../constantes/config";
import { MinimalPokemonData } from "../MinimalPokemonData";
import { POKEMON_API_ERROR_MESSAGE } from "../constantes/errorMessages";
import { ApiError } from "../errors/ApiError";
import { GenPokemonData } from "../genPokemonData";


/**
 * @swagger
 * tags:
 *  name: Pokemon
 *  description: Opérations liées aux pokémons
 */



export class PokemonController {
  /**
   * @swagger
   * /pokemonID/{id}:
   *   get:
   *     summary: Obtient les informations correspondant au Pokémon de cet ID 
   *     description: Récupère les informations du pokémon de l'ID donnée.
   *     tags: [Pokemon]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID du pokémon.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Succès. Retourne les données du pokémon.
   *       400:
   *         description: Requête incorrecte. Vérifiez les paramètres.
   */
    public async getPokemonById(req: Request, res: Response, next: NextFunction): Promise<void>{
        const id : string = req.params.id;
        try{
          const response: AxiosResponse = await axios.get(
            `${POKEMONAPI_URL}/pokemon/${id}`
          );

          const minimalData : MinimalPokemonData = {
            idPokemon: response.data.pokedexId,
            generation: response.data.generation,
            name: response.data.name.fr,
            image: response.data.sprites.regular,
          }
          res.json(minimalData);
        }catch(error){
          next(new ApiError(POKEMON_API_ERROR_MESSAGE))
        }
    }

    
    /**
   * @swagger
   * /pokemonName/{name}:
   *   get:
   *     summary: Obtient les informations correspondant au Pokémon du nom spécifié 
   *     description: Récupère les informations du pokémon du nom donnée.
   *     tags: [Pokemon]
   *     parameters:
   *       - in: path
   *         name: name
   *         required: true
   *         description: Nom du pokémon.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Succès. Retourne les données du pokémon.
   *       400:
   *         description: Requête incorrecte. Vérifiez les paramètres.
   */


    public async getPokemonByName(req: Request, res: Response, next: NextFunction): Promise<void>{
      const name : string = req.params.name;
      try{
        const response: AxiosResponse = await axios.get(
          `${POKEMONAPI_URL}/pokemon/${name}`
        );

        const minimalData : MinimalPokemonData = {
          idPokemon: response.data.pokedexId,
          generation: response.data.generation,
          name: response.data.name.fr,
          image: response.data.sprites.regular,
        }
        res.json(minimalData);
      }catch(error){
        next(new ApiError(POKEMON_API_ERROR_MESSAGE))
      }
  }

  /**
   * @swagger
   * /starters/{gen}:
   *   get:
   *     summary: Obtient les informations correspondant aux trois starters de la génération demandée 
   *     description: Récupère les informations des trois pokémons starters du jeu de chaque génération de jeu
   *     tags: [Pokemon]
   *     parameters:
   *       - in: path
   *         name: gen
   *         required: true
   *         description: Nom du pokémon.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Succès. Retourne les données du pokémon.
   *       400:
   *         description: Requête incorrecte. Vérifiez les paramètres.
   */

  public async getStarterPerGeneration(req: Request, res: Response, next: NextFunction): Promise<void>{
    const gen : string = req.params.gen;
    try{
      const response: AxiosResponse = await axios.get(
        `${POKEMONAPI_URL}/gen/${gen}`
      );
      let fireStarter : GenPokemonData = {
        name: response.data[0].name.fr
      }
      let grassStarter : GenPokemonData = {
        name: response.data[3].name.fr
      }
      let waterStarter : GenPokemonData = {
        name: response.data[6].name.fr
      }

      let starterArray = [fireStarter, grassStarter, waterStarter]
      res.json(starterArray);
      
    }catch(error){
      next(new ApiError(POKEMON_API_ERROR_MESSAGE))
    }
}
}
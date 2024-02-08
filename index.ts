import dotenv from "dotenv"
import express, { NextFunction, Request, Response } from "express"
import { PokemonController } from "./controller/pokemonController"
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from 'swagger-ui-express';
import { swaggerOptions } from "./swaggerOptions";
dotenv.config()



const app = express()
const pokemonController = new PokemonController();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000



app.get("/",  (req: Request, res: Response) => {
  res.send("Coucou, je suis dans l'API pokemon");
})

app.get("/pokemonId/:id", async(req: Request, res: Response, next: NextFunction) => {
  await pokemonController.getPokemonById(req, res, next);
})

app.get("/pokemonName/:name", async(req: Request, res: Response, next: NextFunction) => {
  await pokemonController.getPokemonByName(req, res, next);
})

app.get("/starters/:gen", async (req: Request, res: Response, next: NextFunction) => {
  await pokemonController.getStarterPerGeneration(req, res, next);
})

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'execution sur le port ${PORT}`)
  })
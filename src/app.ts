import express, { Response } from "express";
import router from './index.js';
import 'express-async-errors'
import { AppDataSource } from "./config/dataSource.js";
import 'reflect-metadata';
import { erroMiddleware } from "./middleware/erro.js";

const app = express();
app.use(express.json());
router(app);

app.use(erroMiddleware);

AppDataSource.initialize().then(() => {
    console.log("Conectado ao banco sem erros.")
}).catch((err) => {
    console.error(err, "Erro na inicialização do banco");
})


export default app;

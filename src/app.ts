import express, { Response } from "express";
import router from './index.js';
import { AppDataSource } from "./config/dataSource.js";
import 'reflect-metadata';

const app = express();
app.use(express.json());
router(app);
AppDataSource.initialize().then(() => {
    console.log("Conectado ao banco sem erros.")}).catch((err) => {
        console.error(err, "Erro na inicialização do banco");
})
 
export default app;
 
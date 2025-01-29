import express from "express";
import petRouter from "./router/petRouter.js";
import adotanteRouter from './router/adotanteRouter.js'

const router = (app: express.Router) => {
    app.use("/pets", petRouter); //toda vez que acessar /pets, vai para o petRouter
    app.use("/adotantes", adotanteRouter);
};

export default router;
import express from "express";
import petRouter from "./router/petRouter.js";

const router = (app: express.Router) => {
    app.use("/pets", petRouter); //toda vez que acessar /pets, vai para o petRouter
};

export default router;
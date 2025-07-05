import { NextFunction, Request, Response } from "express";
import ManipulaErros from "../utils/manipulaErros";
import { EnumHttpStatus } from "../enum/EnumHttpStatus";

export const erroMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err['statusCode'] || EnumHttpStatus.INTERNAL_SERVER_ERROR;
  const mensagem = err['statusCode'] ? err.message : "Erro interno do servidor";
  res.status(statusCode).json({ mensagem });
}
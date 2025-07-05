import { BadRequestError } from "../utils/manipulaErros";

export const verificaIdMiddleware = (req: any, res: any, next: any) => {
  const params = { ...req.params };

  for (const param in params) {
    if (!Number.isInteger(Number(params[param]))) {
      throw new BadRequestError(`O parâmetro ${param} deve ser um número inteiro.`)
    }
  }
  next()
}
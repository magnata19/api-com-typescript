import { NextFunction, Request, Response } from "express";
import * as yup from 'yup';
import EnderecoEntity from "../../entities/EnderecoEntity";

const enderecoSchema: yup.ObjectSchema<Omit<EnderecoEntity, "id">> = yup.object({
    cidade: yup.string().defined('Campo cidade é obrigatório.').required("Campo cidade não pode estar vazio."),
    estado: yup.string().defined('Estado cidade é obrigatório.').required("Estado cidade não pode estar vazio.")
});


const middlewareValidationBodyEndereco = async (req: Request, res: Response, next: NextFunction): Promise<any> =>  {
    try {
        let bodyValidator = {};
        bodyValidator = await enderecoSchema.validate(req.body, {abortEarly: false});
        return next();
    } catch (error) {
        const yupError = error as yup.ValidationError;
        const validateError: Record<string, string> = {};
        yupError.inner.forEach((err) => {
            if(!err.path) return;
            validateError[err.path] = err.message;
        })
        res.status(400).json({error: validateError})
    }
}

export {middlewareValidationBodyEndereco};
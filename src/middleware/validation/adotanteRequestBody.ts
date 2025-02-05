import { NextFunction, Request, Response } from "express";
import * as yup from 'yup';
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";

const esquemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = yup.object({
    nome: yup.string().defined().required('Nome é um campo obrigatório.'),
    senha: yup.string().defined().required('Senha é um campo obrigatório.').min(6, 'A senha deve conter no mínimo 6 caracteres.'),
    celular: yup.string().defined().required('Celular é um campo obrigatório.'),
    foto: yup.string().optional()

})

const middlewareValidadorBodyAdotante = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        let bodyValidator: TipoRequestBodyAdotante;
        bodyValidator = await esquemaBodyAdotante.validate(req.body, { abortEarly: false });
        return next();
    } catch (err) {
        const yupError = err as yup.ValidationError;
        const validateError: Record<string, string> = {};
        yupError.inner.forEach((error) => {
            if (!error.path) return;
            validateError[error.path] = error.message;
        })
        return res.status(400).json({error: validateError});
    }

}

export {middlewareValidadorBodyAdotante};
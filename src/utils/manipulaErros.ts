import { EnumHttpStatus } from "../enum/EnumHttpStatus";

export default class ManipulaErros extends Error {
  private readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class BadRequestError extends ManipulaErros {
  constructor(message: string) {
    super(message, EnumHttpStatus.BAD_REQUEST)
  }
}


export class NotFoundError extends ManipulaErros {
  constructor(message: string) {
    super(message, EnumHttpStatus.NOT_FOUND)
  }
}
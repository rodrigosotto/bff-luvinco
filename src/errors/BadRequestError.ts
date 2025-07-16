import { HttpError } from "./HttpError";

export class BadRequestError extends HttpError {
  constructor(message = "Requisição inválida") {
    super(400, message);
  }
}

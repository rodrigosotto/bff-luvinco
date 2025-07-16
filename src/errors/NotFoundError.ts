import { HttpError } from "./HttpError";

export class NotFoundError extends HttpError {
  constructor(message = "Recurso não encontrado") {
    super(404, message);
  }
}

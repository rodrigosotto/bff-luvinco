export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = new.target.name;
    Error.captureStackTrace(this, new.target);
  }
}

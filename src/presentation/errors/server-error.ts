export class ServerError extends Error {
  constructor() {
    super(`Internal Server error try again later`);
    this.name = 'ServerError';
  }
}

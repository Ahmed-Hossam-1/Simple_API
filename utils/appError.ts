class AppError extends Error {
  statusCode: number | undefined;
  statusText: string | undefined;
  constructor() {
    super();
  }
  create(message: string, statusCode: number, statusText: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.statusText = statusText;
    return this;
  }
}

export = new AppError();

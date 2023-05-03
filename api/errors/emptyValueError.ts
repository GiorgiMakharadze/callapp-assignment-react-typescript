class EmptyValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmptyValueError";
  }
}

export default EmptyValueError;

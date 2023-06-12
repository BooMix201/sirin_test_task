class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.errors = errors;
    this.status = status;
  }

  static Unauthorized() {
    return new ApiError(401, 'User is not authorized')
  };

  static NotFound() {
    return new ApiError(404, "User is not found")
  };

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  };
}

export { ApiError };
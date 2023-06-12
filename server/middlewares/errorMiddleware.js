import { ApiError } from "../exceptions/apiErrors.js";

export function errorMiddleware(error, req, res, next) {
  if (error instanceof ApiError) {
    const { status, message, errors } = error;

    res.status(status).json({ message, errors })
  }

  console.log(error);
  return res.status(500).json({message: "Unexpected error"})
}
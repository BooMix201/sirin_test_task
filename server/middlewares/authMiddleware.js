import { ApiError } from "../exceptions/apiErrors.js";
import { TokenService } from "../service/tokenServise.js";


export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const [, accessToken] = authHeader.split(' ');
    const userData = TokenService.validateAccessToken(accessToken);

    if (!authHeader) {
      return next(ApiError.Unauthorized());
    };

    if (!accessToken) {
      return next(ApiError.Unauthorized());
    };

    if (!userData) {
      return next(ApiError.Unauthorized());
    };

    req.user = userData;
    next();
  } catch {
    return next(ApiError.Unauthorized());
  }
  
};
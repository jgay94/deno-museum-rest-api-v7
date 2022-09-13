import { Context, isHttpError, Middleware, Status } from "oak";

const BAD_REQUEST = "Bad Request"; // 400
const UNAUTHORIZED = "Unauthorized"; // 401
const FORBIDDEN = "Forbidden"; // 403
const NOT_FOUND = "Not Found"; // 404
const INTERNAL_SERVER_ERROR = "Internal Server Error"; // 500

/**
 * @desc Find the official HTTP status code documentation here:
 * @link https://deno.land/std/http/http_status.ts
 */
export const errorHandler: Middleware = async (
  ctx: Context,
  next: () => Promise<unknown>,
): Promise<void> => {
  try {
    await next();
  } catch (err) {
    if (!isHttpError(err)) {
      ctx.response.status = err.code;
      ctx.response.body = err.message;
    } else if (isHttpError(err)) {
      switch (err.status) {
        case Status.BadRequest:
          ctx.response.status = 400;
          ctx.response.body = err.message ?? BAD_REQUEST;
          break;
        case Status.Unauthorized:
          ctx.response.status = 401;
          ctx.response.body = err.message ?? UNAUTHORIZED;
          break;
        case Status.Forbidden:
          ctx.response.status = 403;
          ctx.response.body = err.message ?? FORBIDDEN;
          break;
        case Status.NotFound:
          ctx.response.status = 404;
          ctx.response.body = err.message ?? NOT_FOUND;
          break;
      }
    } else {
      ctx.throw(Status.InternalServerError, INTERNAL_SERVER_ERROR);
    }
  }
};

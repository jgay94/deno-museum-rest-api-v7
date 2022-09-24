export type {
  Configuration,
  ITokenService,
  SignTokenConfig,
  Tokens,
} from "./typings.d.ts";

export { Service } from "./service.ts";
export { verifyToken } from "./helpers.ts";

// imports for auth config initialization
import { Configuration } from "./typings.d.ts";
import { config } from "/src/utilities/mod.ts";

// auth config initialization
export const authConfig: Configuration = {
  issuer: config.auth.issuer,
  key: config.auth.key,
  algorithm: config.auth.algorithm,
  tokenExpirationInSeconds: config.auth.expiresIn,
};

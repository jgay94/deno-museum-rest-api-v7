import { config as dotenv } from "std/dotenv/mod.ts";
import { Algorithm } from "https://deno.land/x/djwt@v2.7/algorithm.ts";

const env = await dotenv({ safe: true });

type Configuration = {
  app: {
    name: string;
    port: number;
    apiPrefix: string;
  };
  auth: {
    issuer: string;
    key: string;
    algorithm: Algorithm;
    expiresIn: number;
  };
  https: {
    secure: boolean;
    certFile: string;
    keyFile: string;
  };
  cors: {
    localhost: string;
  };
};

export const config: Configuration = {
  app: {
    name: env.APP_NAME,
    port: parseInt(env.APP_PORT),
    apiPrefix: env.API_PREFIX,
  },
  auth: {
    issuer: env.APP_NAME,
    key: env.JWT_SECRET_KEY,
    algorithm: env.JWT_ALGORITHM as Algorithm,
    expiresIn: parseInt(env.JWT_EXPIRATION),
  },
  https: {
    secure: env.HTTPS_ENABLED === "true",
    certFile: env.TLS_CERT,
    keyFile: env.TLS_KEY,
  },
  cors: {
    localhost: env.LOCALHOST,
  },
};

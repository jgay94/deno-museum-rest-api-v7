import { Server } from "./framework/mod.ts";
import { config } from "std/dotenv/mod.ts";
import { auth, healthcheck, museums, users } from "./routes/mod.ts";

const env = await config({ safe: true });

const server = new Server({
  configuration: {
    app: {
      name: env.APP_NAME,
      port: parseInt(env.APP_PORT),
      apiPrefix: env.API_PREFIX,
    },
    https: {
      secure: env.HTTPS_ENABLED === "true",
      certFile: env.TLS_CERT,
      keyFile: env.TLS_KEY,
    },
    allowedOrigins: [
      env.LOCALHOST,
    ],
    endpoints: [
      auth,
      healthcheck,
      museums,
      users,
    ],
  },
});

if (import.meta.main) {
  server.run();
}

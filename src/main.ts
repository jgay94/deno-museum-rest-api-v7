import { Server } from "./framework/mod.ts";
import { config } from "/src/utilities/mod.ts";
import { auth, healthcheck, museums, users } from "./routes/mod.ts";

const server = new Server({
  configuration: {
    app: {
      name: config.app.name,
      port: config.app.port,
      apiPrefix: config.app.apiPrefix,
    },
    https: {
      secure: config.https.secure,
      certFile: config.https.certFile,
      keyFile: config.https.keyFile,
    },
    allowedOrigins: [
      config.cors.localhost,
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

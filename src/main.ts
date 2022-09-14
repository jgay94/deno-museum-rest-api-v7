import { Server } from "./framework/mod.ts";
import { healthcheck, museums } from "./routes/mod.ts";

const server = new Server({
  configuration: {
    app: {
      name: "Museums App",
      port: 8080,
      apiPrefix: "/api/v1",
    },
    https: {
      secure: true,
      certFile: "./certificate.pem",
      keyFile: "./private.pem",
    },
    allowedOrigins: [
      "http://localhost:8080",
    ],
    endpoints: [
      healthcheck,
      museums,
    ],
  },
});

if (import.meta.main) {
  server.run();
}

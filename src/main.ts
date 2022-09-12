import { Server } from "./framework/server.ts";
import { healthcheck } from "./routes/healthcheck.ts";

const server = new Server({
  configuration: {
    app: {
      name: "Museums App",
      port: 8080,
      apiPrefix: "/api/v1",
    },
    endpoints: [
      healthcheck,
    ],
  },
});

if (import.meta.main) {
  server.run();
}

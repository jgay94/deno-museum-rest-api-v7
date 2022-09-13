import { Server } from "./framework/mod.ts";
import { healthcheck } from "./routes/mod.ts";

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

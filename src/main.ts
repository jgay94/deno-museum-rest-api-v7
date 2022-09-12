import { Server } from "./framework/server.ts";

const server = new Server({
  configuration: {
    app: {
      name: "Museums App",
      port: 8080,
      apiPrefix: "/api/v1",
    },
  },
});

if (import.meta.main) {
  server.run();
}

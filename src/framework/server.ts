import * as log from "std/log/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";

interface IServer {
  run(): void;
  close(reason: DOMException): void;
}

interface IServerDependencies {
  configuration: {
    app: {
      name: string;
      port: number;
    };
  };
}

export class Server implements IServer {
  private app: Application;
  private abortController: AbortController;
  private name: string;
  private port: number;

  constructor({
    configuration: {
      app: {
        name,
        port,
      },
    },
  }: IServerDependencies) {
    this.app = new Application();
    this.abortController = new AbortController();
    this.name = name;
    this.port = port;
  }

  public run(): void {
    this.registerApplicationMiddleware();
    this.addEventListeners();
    this.serve();
  }

  public close(reason: DOMException): void {
    this.abortController.abort(reason);
    log.warning(`${this.name} is shutting down: ${reason}...`);
  }

  private registerApplicationMiddleware(): void {
    this.app.use(async (ctx, next) => {
      await next();
      ctx.response.body = "Hello world!";
    });
  }

  private addEventListeners(): void {
    this.addErrorListener();
    this.addRequestListener();
    log.info("Adding event listeners...");
  }

  private addErrorListener(): void {
    this.app.addEventListener("error", ({ error }) => {
      log.error("Uh oh! An error occured: ", error);
    });
  }

  private addRequestListener(): void {
    this.app.addEventListener("listen", ({ secure, hostname, port }) => {
      const protocol = secure ? "https://" : "http://";
      const url = `${protocol}${hostname ?? "localhost"}:${port}`;
      log.info(`${this.name} is now running on: ${url}`);
    });
  }

  private async serve(): Promise<void> {
    const { signal } = this.abortController;

    await this.app.listen({
      port: this.port,
      signal,
    });
  }
}

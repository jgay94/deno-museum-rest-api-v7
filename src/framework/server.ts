import { IServer, RouteGroup, Router } from "./mod.ts";
import * as log from "std/log/mod.ts";
import { errorHandler, requestLog, responseTime } from "../middleware/mod.ts";
import { Application } from "oak";
import { oakCors } from "cors";

interface IServerDependencies {
  configuration: {
    app: {
      name: string;
      port: number;
      apiPrefix: string;
    };
    https: {
      secure: boolean;
      certFile: string;
      keyFile: string;
    };
    allowedOrigins: string[];
    endpoints: RouteGroup[];
  };
}

export class Server implements IServer {
  private app: Application;
  private abortController: AbortController;
  private router: Router;
  private name: string;
  private port: number;
  private secure: boolean;
  private certFile: string;
  private keyFile: string;
  private allowedOrigins: string[];
  private endpoints: RouteGroup[];

  constructor({
    configuration: {
      app: {
        name,
        port,
        apiPrefix,
      },
      https: {
        secure,
        certFile,
        keyFile,
      },
      allowedOrigins,
      endpoints,
    },
  }: IServerDependencies) {
    this.app = new Application();
    this.abortController = new AbortController();
    this.router = new Router({ apiPrefix });
    this.name = name;
    this.port = port;
    this.secure = secure;
    this.certFile = certFile;
    this.keyFile = keyFile;
    this.allowedOrigins = allowedOrigins;
    this.endpoints = endpoints;
  }

  public run(): void {
    this.initEndpoints();
    this.registerMiddleware();
    this.addEventListeners();
    this.serve();
  }

  public close(reason: DOMException): void {
    this.abortController.abort(reason);
    log.warning(`🔌 ${this.name} is shutting down: ${reason}...`);
  }

  private initEndpoints(): void {
    this.router.registerRoutes(this.endpoints);
    log.info("Initializing endpoints...");
  }

  private registerMiddleware(): void {
    this.registerApplicationMiddleware();
    this.registerRouterMiddleware();
    log.info("Registering middleware...");
  }

  private registerApplicationMiddleware(): void {
    this.app.use(
      oakCors({ origin: this.allowedOrigins }),
      errorHandler,
      requestLog,
      responseTime,
    );
  }

  private registerRouterMiddleware(): void {
    this.router.registerRouterMiddleware(this.app);
  }

  private addEventListeners(): void {
    this.addErrorListener();
    this.addRequestListener();
    log.info("Adding event listeners...");
  }

  private addErrorListener(): void {
    this.app.addEventListener("error", ({ error }) => {
      log.error(`💥 Uh oh! An error occured: ${error.message}`);
    });
  }

  private addRequestListener(): void {
    this.app.addEventListener("listen", ({ secure, hostname, port }) => {
      const protocol = secure ? "https://" : "http://";
      const url = `${protocol}${hostname ?? "localhost"}:${port}`;
      log.info(`🚀 ${this.name} is now running on: ${url}`);
    });
  }

  private async serve(): Promise<void> {
    const { signal } = this.abortController;

    await this.app.listen({
      port: this.port,
      secure: this.secure,
      certFile: this.certFile,
      keyFile: this.keyFile,
      signal,
    });
  }
}

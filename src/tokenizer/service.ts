import { Configuration, ITokenService, Tokens } from "./mod.ts";
import { signToken } from "./helpers.ts";
import * as base64url from "std/encoding/base64url.ts";

const defaultConfig: Configuration = {
  issuer: "Museums app",
  key: "SET-YOUR-KEY",
  algorithm: "HS512",
  tokenExpirationInSeconds: 60,
};

interface IServiceDependencies {
  configuration: Configuration;
}

export class Service implements ITokenService {
  private config: Configuration;

  constructor(dependencies: IServiceDependencies = { configuration: defaultConfig }) {
    if (dependencies.configuration.key === defaultConfig.key) {
      throw new Error(
        "You are using the default key. Please set your own key.",
      );
    }

    this.config = dependencies.configuration;
  }

  public async generateTokens(username: string): Promise<Tokens> {
    return {
      accessToken: await this.generateAccessToken(username),
      refreshToken: this.generateRefreshToken(),
    };
  }

  private async generateAccessToken(username: string): Promise<string> {
    return await signToken({
      issuer: this.config.issuer,
      subject: username,
      secretKey: this.config.key,
      algorithm: this.config.algorithm,
      tokenExpirationInSeconds: this.config.tokenExpirationInSeconds,
    });
  }

  private generateRefreshToken(length = 40): string {
    return base64url.encode(crypto.getRandomValues(new Uint8Array(length)));
  }
}

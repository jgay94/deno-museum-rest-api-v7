import { Configuration, ITokenService, Tokens } from "./mod.ts";
import { signToken } from "./helpers.ts";
import * as base64url from "std/encoding/base64url.ts";

const defaultConfiguration: Configuration = {
  key: "SET-YOUR-KEY",
  algorithm: "HS512",
  tokenExpirationInSeconds: 60,
};

interface IServiceDependencies {
  configuration: Configuration;
}

export class Service implements ITokenService {
  private configuration: Configuration;

  constructor(dependencies: IServiceDependencies = { configuration: defaultConfiguration }) {
    if (dependencies.configuration.key === defaultConfiguration.key) {
      throw new Error(
        "You are using the default key. Please set your own key.",
      );
    }

    this.configuration = dependencies.configuration;
  }

  public async generateTokens(username: string): Promise<Tokens> {
    return {
      accessToken: await this.generateAccessToken(username),
      refreshToken: this.generateRefreshToken(),
    };
  }

  private async generateAccessToken(username: string): Promise<string> {
    return await signToken({
      issuer: "Museums App",
      subject: username,
      secretKey: this.configuration.key,
      algorithm: this.configuration.algorithm,
      tokenExpirationInSeconds: this.configuration.tokenExpirationInSeconds,
    })
  }

  private generateRefreshToken(length = 40): string {
    return base64url.encode(crypto.getRandomValues(new Uint8Array(length)));
  }
}

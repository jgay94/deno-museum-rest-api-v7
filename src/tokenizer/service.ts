import { Configuration, ITokenService, Tokens } from "./mod.ts";
import * as base64url from "std/encoding/base64url.ts";
import { create, getNumericDate, Header, Payload } from "djwt";

export type IServiceDependencies = {
  configuration: Configuration;
};

const defaultConfiguration: Configuration = {
  key: "SET-YOUR-KEY",
  algorithm: "HS512",
  tokenExpirationInSeconds: 3600,
};

export class Service implements ITokenService {
  private configuration: Configuration;

  constructor(dependencies: IServiceDependencies = {configuration: defaultConfiguration }) {
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
    const header: Header = {
      alg: this.configuration.algorithm,
      typ: "JWT",
    };

    const payload: Payload = {
      iss: "Museums App",
      sub: username,
      exp: getNumericDate(60 * 60),
    };

    const key = await crypto.subtle.generateKey(
      { name: "HMAC", hash: "SHA-512" },
      true,
      ["sign", "verify"],
    );

    return await create(header, payload, key);
  }

  private generateRefreshToken(length = 40): string {
    return base64url.encode(crypto.getRandomValues(new Uint8Array(length)));
  }
}

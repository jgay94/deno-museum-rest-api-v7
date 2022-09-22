import { Algorithm } from "https://deno.land/x/djwt@v2.7/algorithm.ts";

export type Configuration = {
  key: string;
  algorithm: Algorithm;
  tokenExpirationInSeconds: number;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export interface ITokenService {
  generateTokens(username: string): Promise<Tokens>;
}

import { Algorithm } from "https://deno.land/x/djwt@v2.7/algorithm.ts";

export type Configuration = {
  issuer: string;
  key: string;
  algorithm: Algorithm;
  tokenExpirationInSeconds: number;
};

export type SignTokenConfig = {
  issuer: string;
  subject: string;
  secretKey: string;
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

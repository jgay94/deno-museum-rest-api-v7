import { SignTokenConfig } from "./mod.ts";
import { create, getNumericDate, Header, Payload, verify } from "djwt";

export async function signToken(config: SignTokenConfig): Promise<string> {
  const {
    issuer,
    subject,
    secretKey,
    algorithm,
    tokenExpirationInSeconds,
  } = config;

  const header: Header = {
    alg: algorithm,
    typ: "JWT",
  };

  const payload: Payload = {
    iss: issuer,
    sub: subject,
    exp: getNumericDate(tokenExpirationInSeconds * 60),
  };

  const key = await generateKey(secretKey);

  return create(header, payload, key);
}

export async function verifyToken(
  token: string,
  secretKey: string,
): Promise<Payload> {
  try {
    const key = await generateKey(secretKey);
    return await verify(token, key);
  } catch (e) {
    return e.message;
  }
}

async function generateKey(secretKey: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyBuf = encoder.encode(secretKey);

  return await crypto.subtle.importKey(
    "raw",
    keyBuf,
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );
}

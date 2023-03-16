import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import JWT from "jsonwebtoken";

const getUserFromToken = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET || "";
  const user = JWT.verify(token, jwtSecret) as {
    id: string;
    email: string;
  };
  return user;
};

export function createContext({ req }: CreateNextContextOptions) {
  function getUserFromHeader() {
    if (req.headers.authorization) {
      const user = getUserFromToken(req.headers.authorization);
      return user;
    }
    return null;
  }
  const user = getUserFromHeader();
  return {
    user,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;

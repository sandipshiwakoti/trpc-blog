import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { type inferReactQueryProcedureOptions } from "@trpc/react-query";

import { type AppRouter } from "~/server/api/root";

export const api = createTRPCNext<AppRouter>({
  config() {
    const baseUrl = process.env.BASE_URL ?? "http://localhost";
    const port = process.env.PORT ?? 3000;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${baseUrl}:${port}/api/trpc`,
          headers() {
            return {
              Authorization: localStorage.getItem("@token") ?? "",
            };
          },
        }),
      ],
    };
  },
  ssr: false,
});

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;

export type PostCreateInput = RouterInputs["post"]["createPost"];
export type PostEditInput = RouterInputs["post"]["editPost"];

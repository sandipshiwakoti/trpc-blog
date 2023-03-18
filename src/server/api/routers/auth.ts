import { TRPCError } from "@trpc/server";
import { z } from "zod";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { prisma } from "~/server/api/prisma";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      const { email, password } = input;
      if (!email || !password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Fields must not be empty",
        });
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect email or password",
        });
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect email or password",
        });
      }

      const accessToken = JWT.sign(
        { id: user.id, email: user.email },
        env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return {
        accessToken,
      };
    }),
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, username, email, password } = input;
      if (!name || !username || !email || !password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Fields must not be empty",
        });
      }

      const userWithEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (userWithEmail) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This email already exists.",
        });
      }

      const userWithUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (userWithUsername) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This email already exists.",
        });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          username,
          email,
          password: encryptedPassword,
        },
      });

      return user;
    }),
});

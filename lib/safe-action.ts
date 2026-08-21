import { betterAuth } from "@next-safe-action/adapter-better-auth";
import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import * as z from "zod";
import { auth } from "@/lib/auth";

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof ActionError) {
      return error.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    });
  },
});

export const safeAction = actionClient.use(
  betterAuth(auth, {
    authorize: ({ authData, next }) => {
      if (!authData) {
        throw new ActionError("FORBIDDEN");
      }
      return next({
        ctx: {
          auth: {
            name: authData.user.name,
            id: authData.user.id,
            email: authData.user.email,
          },
        },
      });
    },
  }),
);

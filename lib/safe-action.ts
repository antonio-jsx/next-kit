import { betterAuth } from "@next-safe-action/adapter-better-auth";
import { createSafeActionClient } from "next-safe-action";
import * as z from "zod";
import { auth } from "@/lib/auth";

export class ActionError extends Error {}
const DEFAULT_SERVER_ERROR_MESSAGE = "Algo salió mal al ejecutar la operación.";

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
        throw new ActionError("PROHIBIDO");
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

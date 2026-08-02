import { baseApi } from "../../../app/api/baseApi";
import type { LoginRequest, LoginResponse } from "../types/Auth.types";

const DEMO_EMAIL = "demo@penguintech.com";
const DEMO_PASSWORD = "Penguin123!";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      async queryFn(credentials) {
        await new Promise((resolve) => {
          window.setTimeout(resolve, 450);
        });

        if (
          credentials.email !== DEMO_EMAIL ||
          credentials.password !== DEMO_PASSWORD
        ) {
          return {
            error: {
              status: 401,
              data: {
                message:
                  "El correo electrónico o la contraseña son incorrectos.",
              },
            },
          };
        }

        return {
          data: {
            accessToken: "penguintech-development-token",
            user: {
              id: "user-demo",
              name: "Administrador",
              email: DEMO_EMAIL,
              role: "Administrador",
            },
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;

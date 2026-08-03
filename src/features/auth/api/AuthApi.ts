import { baseApi } from "../../../app/api/baseApi";
import { appConfig } from "../../../app/config/appConfig";
import type { LoginRequest, LoginResponse } from "../types/Auth.types";

const { email: DEMO_EMAIL, password: DEMO_PASSWORD } =
  appConfig.demoCredentials;

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
            accessToken: "penguit-development-token",
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

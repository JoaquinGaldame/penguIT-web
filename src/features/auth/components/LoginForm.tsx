import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { getApiErrorMessage } from "../../../app/api/getApiErrorMessage";
import { useAppDispatch } from "../../../app/store/hooks";
import { AppLoadingScreen } from "../../../shared/components/AppLoadingScreen";
import { useLoginMutation } from "../api/AuthApi";
import { loginSchema, type LoginFormValues } from "../schemas/loginSchema";
import { setSession } from "../store/AuthSlice";

export function LoginForm() {
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitError(null);
    setIsTransitioning(true);

    try {
      const response = await login(values).unwrap();

      dispatch(setSession(response));
    } catch (error) {
      setIsTransitioning(false);
      setSubmitError(
        getApiErrorMessage(
          error,
          "No pudimos iniciar sesión. Intentá nuevamente.",
        ),
      );
    }
  };

  const isLoginPending = isLoading || isTransitioning;

  return (
    <>
      <Stack
        component="form"
        spacing={2.5}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        {submitError && <Alert severity="error">{submitError}</Alert>}

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              autoFocus
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              disabled={isLoginPending}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              disabled={isLoginPending}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        type="button"
                        aria-label={
                          showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                        }
                        onClick={() => setShowPassword((current) => !current)}
                      >
                        <Icon
                          icon={
                            showPassword
                              ? "solar:eye-closed-linear"
                              : "solar:eye-linear"
                          }
                          width={22}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        <Stack
          component="div"
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
          spacing={2}
        >
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={field.onChange}
                    disabled={isLoginPending}
                  />
                }
                label="Recordarme"
              />
            )}
          />

          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={() => undefined}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </Stack>

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isLoginPending}
        >
          {isLoginPending ? "Ingresando…" : "Iniciar sesión"}
        </Button>
      </Stack>

      <AppLoadingScreen
        open={isLoginPending}
        title="Iniciando sesión…"
        description="Estamos preparando tu espacio de trabajo."
      />
    </>
  );
}

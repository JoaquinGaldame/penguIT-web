import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
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
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../app/store/hooks';
import { useLoginMutation } from '../api/AuthApi';
import {
  loginSchema,
  type LoginFormValues,
} from '../schemas/loginSchema';
import { setSession } from '../store/AuthSlice';

function getLoginErrorMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'data' in error
  ) {
    const data = error.data;

    if (
      typeof data === 'object' &&
      data !== null &&
      'message' in data &&
      typeof data.message === 'string'
    ) {
      return data.message;
    }
  }

  return 'No pudimos iniciar sesión. Intentá nuevamente.';
}

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(
    null,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitError(null);

    try {
      const response = await login(values).unwrap();

      dispatch(setSession(response));

      navigate('/', {
        replace: true,
      });
    } catch (error) {
      setSubmitError(getLoginErrorMessage(error));
    }
  };

  return (
    <Stack
      component="form"
      spacing={2.5}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      {submitError && (
        <Alert severity="error">
          {submitError}
        </Alert>
      )}

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
            disabled={isLoading}
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
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            disabled={isLoading}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      type="button"
                      aria-label={
                        showPassword
                          ? 'Ocultar contraseña'
                          : 'Mostrar contraseña'
                      }
                      onClick={() =>
                        setShowPassword((current) => !current)
                      }
                    >
                      <Icon
                        icon={
                          showPassword
                            ? 'solar:eye-closed-linear'
                            : 'solar:eye-linear'
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
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
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
                  disabled={isLoading}
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
        disabled={isLoading}
      >
        {isLoading ? 'Ingresando…' : 'Iniciar sesión'}
      </Button>
    </Stack>
  );
}

import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Link,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getApiErrorMessage } from "../../../app/api/getApiErrorMessage";
import { paths } from "../../../app/router/paths";
import { useAppDispatch } from "../../../app/store/hooks";
import { useCreateUserMutation, useGetUserGroupsQuery } from "../api/UsersApi";
import { UserForm } from "../components/UserForm";
import type { CreateUserFormValues } from "../schemas/userSchema";
import { resetUserCreation } from "../store/UserSlice";

export function CreateUserPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const groupsQuery = useGetUserGroupsQuery();
  const [createUserMutation, { isLoading: isSubmitting }] =
    useCreateUserMutation();
  const [submitError, setSubmitError] = useState<string>();

  useEffect(() => {
    dispatch(resetUserCreation());

    return () => {
      dispatch(resetUserCreation());
    };
  }, [dispatch]);

  const returnToUsers = () => {
    navigate(paths.administrationUsers);
  };

  const createUser = async (values: CreateUserFormValues) => {
    setSubmitError(undefined);

    try {
      await createUserMutation(values).unwrap();
      navigate(paths.administrationUsers, { replace: true });
    } catch (error) {
      setSubmitError(
        getApiErrorMessage(
          error,
          "No pudimos crear el usuario. Intentá nuevamente.",
        ),
      );
    }
  };

  const activeGroups =
    groupsQuery.data?.groups.filter((group) => group.status === "active") ?? [];

  return (
    <Stack
      spacing={3}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        overflowY: "auto",
        px: { xs: 2, sm: 3, lg: 4 },
        py: { xs: 2.5, md: 4 },
        "@media print": { height: "auto", overflow: "visible", p: 0 },
      }}
    >
      <Box>
        <Breadcrumbs sx={{ mb: 1 }}>
          <Link component="button" onClick={returnToUsers}>
            Usuarios
          </Link>
          <Typography color="text.primary">Agregar</Typography>
        </Breadcrumbs>
        <Typography component="h1" variant="h4">
          Agregar usuario
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Completá la información de la cuenta, sus accesos y grupos de trabajo.
        </Typography>
      </Box>

      {groupsQuery.isError ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" onClick={() => groupsQuery.refetch()}>
              Reintentar
            </Button>
          }
        >
          No pudimos cargar los grupos necesarios para configurar el usuario.
        </Alert>
      ) : groupsQuery.isLoading ? (
        <Skeleton variant="rounded" height={420} animation="wave" />
      ) : (
        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <UserForm
            groups={activeGroups}
            isSubmitting={isSubmitting}
            submitError={submitError}
            onCancel={returnToUsers}
            onSubmit={createUser}
          />
        </Paper>
      )}
    </Stack>
  );
}

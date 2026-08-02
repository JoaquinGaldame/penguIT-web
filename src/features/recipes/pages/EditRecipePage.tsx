import { useState } from "react";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Link,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { getApiErrorMessage } from "../../../app/api/getApiErrorMessage";
import { paths } from "../../../app/router/paths";
import { useGetRecipeQuery, useUpdateRecipeMutation } from "../api/RecipesApi";
import { RecipeForm } from "../components/RecipeForm";
import type { RecipeFormValues } from "../schemas/recipeSchema";

export function EditRecipePage() {
  const navigate = useNavigate();
  const { recipeId } = useParams<{ recipeId: string }>();
  const { data, isError, isLoading, refetch } = useGetRecipeQuery(
    recipeId ?? "",
    {
      skip: !recipeId,
    },
  );
  const [updateRecipe, { isLoading: isSubmitting }] = useUpdateRecipeMutation();
  const [submitError, setSubmitError] = useState<string>();

  const returnToRecipes = () => navigate(paths.recipes);

  const submitRecipe = async (values: RecipeFormValues) => {
    if (!recipeId) return;
    setSubmitError(undefined);

    try {
      await updateRecipe({ recipeId, values }).unwrap();
      navigate(paths.recipes, { replace: true });
    } catch (error) {
      setSubmitError(
        getApiErrorMessage(
          error,
          "No pudimos actualizar la receta. Intentá nuevamente.",
        ),
      );
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Breadcrumbs sx={{ mb: 1 }}>
          <Link component="button" onClick={returnToRecipes}>
            Recetas
          </Link>
          <Typography color="text.primary">Editar</Typography>
        </Breadcrumbs>
        <Typography component="h1" variant="h4">
          Editar receta
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Actualizá la composición, el rendimiento o el costo de producción.
        </Typography>
      </Box>

      {isLoading ? (
        <Skeleton variant="rounded" height={720} animation="wave" />
      ) : isError || !data?.recipe ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" onClick={() => void refetch()}>
              Reintentar
            </Button>
          }
        >
          No pudimos cargar la receta solicitada.
        </Alert>
      ) : (
        <RecipeForm
          recipe={data.recipe}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onCancel={returnToRecipes}
          onSubmit={submitRecipe}
        />
      )}
    </Stack>
  );
}

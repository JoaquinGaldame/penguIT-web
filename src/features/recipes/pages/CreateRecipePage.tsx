import { useState } from "react";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getApiErrorMessage } from "../../../app/api/getApiErrorMessage";
import { paths } from "../../../app/router/paths";
import { useCreateRecipeMutation } from "../api/RecipesApi";
import { RecipeForm } from "../components/RecipeForm";
import type { RecipeFormValues } from "../schemas/recipeSchema";

export function CreateRecipePage() {
  const navigate = useNavigate();
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();
  const [submitError, setSubmitError] = useState<string>();

  const returnToRecipes = () => navigate(paths.recipes);

  const submitRecipe = async (values: RecipeFormValues) => {
    setSubmitError(undefined);

    try {
      await createRecipe(values).unwrap();
      navigate(paths.recipes, { replace: true });
    } catch (error) {
      setSubmitError(
        getApiErrorMessage(
          error,
          "No pudimos crear la receta. Intentá nuevamente.",
        ),
      );
    }
  };

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
          <Link component="button" onClick={returnToRecipes}>
            Recetas
          </Link>
          <Typography color="text.primary">Nueva receta</Typography>
        </Breadcrumbs>
        <Typography component="h1" variant="h4">
          Nueva receta
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Definí el rendimiento, los ingredientes y el costo de producción.
        </Typography>
      </Box>

      <RecipeForm
        isSubmitting={isLoading}
        submitError={submitError}
        onCancel={returnToRecipes}
        onSubmit={submitRecipe}
      />
    </Stack>
  );
}

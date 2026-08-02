import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { paths } from "../../../app/router/paths";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { useDebouncedValue } from "../../../shared/hooks/useDebouncedValue";
import { PRODUCT_CATEGORY_LABELS } from "../../products/types/Product.types";
import { useGetRecipesQuery } from "../api/RecipesApi";
import { RecipeDetailsDrawer } from "../components/RecipeDetailsDrawer";
import { RecipesEmptyState } from "../components/RecipesEmptyState";
import { RecipesFilters } from "../components/RecipesFilters";
import { RecipesSummary } from "../components/RecipesSummary";
import { RecipesTable } from "../components/RecipesTable";
import {
  hideRecipeDetails,
  resetRecipesFilters,
  setRecipesCategory,
  setRecipesCostStatus,
  setRecipesSearch,
  setRecipesStatus,
  showRecipeDetails,
} from "../store/RecipesSlice";
import { RECIPE_STATUS_LABELS } from "../types/Recipe.types";
import { getRecipeCostStatus } from "../utils/recipeFormatters";

export function RecipeListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    search,
    category,
    status,
    costStatus,
    selectedRecipeId,
    detailsOpen,
  } = useAppSelector((state) => state.recipes);
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebouncedValue(searchInput, 300);
  const { data, isError, isFetching, isLoading, refetch } =
    useGetRecipesQuery();
  const recipes = useMemo(() => data?.recipes ?? [], [data?.recipes]);

  useEffect(() => {
    dispatch(setRecipesSearch(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  const filteredRecipes = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("es");

    return recipes.filter((recipe) => {
      if (category !== "all" && recipe.productCategory !== category)
        return false;
      if (status !== "all" && recipe.status !== status) return false;
      if (
        costStatus !== "all" &&
        getRecipeCostStatus(recipe, recipe.salePrice) !== costStatus
      )
        return false;
      if (!term) return true;

      return (
        recipe.name.toLocaleLowerCase("es").includes(term) ||
        recipe.code.toLocaleLowerCase("es").includes(term) ||
        recipe.productName.toLocaleLowerCase("es").includes(term) ||
        PRODUCT_CATEGORY_LABELS[recipe.productCategory]
          .toLocaleLowerCase("es")
          .includes(term) ||
        RECIPE_STATUS_LABELS[recipe.status]
          .toLocaleLowerCase("es")
          .includes(term)
      );
    });
  }, [category, costStatus, recipes, search, status]);

  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId,
  );
  const hasActiveFilters =
    searchInput.trim().length > 0 ||
    category !== "all" ||
    status !== "all" ||
    costStatus !== "all";
  const hasInitialError = isError && data === undefined;
  const hasRefetchError = isError && data !== undefined;

  const resetFilters = () => {
    setSearchInput("");
    dispatch(resetRecipesFilters());
  };

  const editRecipe = (recipeId: string) => {
    dispatch(hideRecipeDetails());
    navigate(paths.recipeEdit(recipeId));
  };

  return (
    <Stack
      spacing={2.5}
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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          alignItems: { xs: "stretch", sm: "flex-start" },
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography component="h1" variant="h4" sx={{ mb: 0.75 }}>
            Recetas
          </Typography>
          <Typography color="text.secondary">
            Administrá composiciones, rendimientos y costos de producción.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => void refetch()}
            disabled={isFetching}
            startIcon={<Icon icon="solar:refresh-linear" width={20} />}
          >
            Actualizar
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate(paths.recipeNew)}
            startIcon={<Icon icon="solar:add-circle-linear" width={20} />}
          >
            Nueva receta
          </Button>
        </Stack>
      </Stack>

      {isLoading ? (
        <Box
          sx={{
            display: "grid",
            gap: 1.5,
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
          }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={82}
              animation="wave"
            />
          ))}
        </Box>
      ) : (
        <RecipesSummary recipes={recipes} />
      )}

      <Paper variant="outlined" sx={{ p: 2 }}>
        <RecipesFilters
          search={searchInput}
          category={category}
          status={status}
          costStatus={costStatus}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={setSearchInput}
          onCategoryChange={(value) => dispatch(setRecipesCategory(value))}
          onStatusChange={(value) => dispatch(setRecipesStatus(value))}
          onCostStatusChange={(value) => dispatch(setRecipesCostStatus(value))}
          onReset={resetFilters}
        />
      </Paper>

      <Box sx={{ minHeight: 400 }}>
        {isFetching && !isLoading && (
          <LinearProgress aria-label="Actualizando recetas" />
        )}

        {hasRefetchError && (
          <Alert severity="warning" role="status" sx={{ mb: 2 }}>
            No pudimos actualizar las recetas. Se mantienen visibles los últimos
            datos disponibles.
          </Alert>
        )}

        {hasInitialError ? (
          <Alert
            severity="error"
            action={
              <Button color="inherit" onClick={() => void refetch()}>
                Reintentar
              </Button>
            }
          >
            No pudimos cargar las recetas. Intentá nuevamente.
          </Alert>
        ) : isLoading ? (
          <Skeleton variant="rounded" height={430} animation="wave" />
        ) : filteredRecipes.length === 0 ? (
          <RecipesEmptyState
            hasActiveFilters={hasActiveFilters}
            onCreate={() => navigate(paths.recipeNew)}
            onReset={resetFilters}
          />
        ) : (
          <RecipesTable
            recipes={filteredRecipes}
            onSelect={(recipeId) => dispatch(showRecipeDetails(recipeId))}
            onEdit={editRecipe}
          />
        )}
      </Box>

      <RecipeDetailsDrawer
        recipe={selectedRecipe}
        open={detailsOpen}
        onClose={() => dispatch(hideRecipeDetails())}
        onEdit={editRecipe}
      />
    </Stack>
  );
}

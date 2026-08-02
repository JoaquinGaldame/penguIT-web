import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { getApiErrorMessage } from "../../../app/api/getApiErrorMessage";
import { paths } from "../../../app/router/paths";
import { useCreateProductMutation } from "../api/ProductsApi";
import { ProductForm } from "../components/ProductForm";
import type { ProductFormValues } from "../schemas/productSchema";

export function CreateProductPage() {
  const navigate = useNavigate();

  const [createProductMutation, { isLoading: isSubmitting }] =
    useCreateProductMutation();

  const [submitError, setSubmitError] = useState<string>();

  const returnToProducts = () => {
    navigate(paths.inventoryProducts);
  };

  const createProduct = async (values: ProductFormValues) => {
    setSubmitError(undefined);

    try {
      await createProductMutation(values).unwrap();

      navigate(paths.inventoryProducts, {
        replace: true,
      });
    } catch (error) {
      setSubmitError(
        getApiErrorMessage(
          error,
          "No pudimos crear el producto. Intentá nuevamente.",
        ),
      );
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Breadcrumbs sx={{ mb: 1 }}>
          <Link component="button" onClick={returnToProducts}>
            Productos
          </Link>
          <Typography color="text.primary">Agregar</Typography>
        </Breadcrumbs>
        <Typography component="h1" variant="h4">
          Agregar producto
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Completá la información necesaria para incorporarlo al catálogo.
        </Typography>
      </Box>

      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <ProductForm
          isSubmitting={isSubmitting}
          submitError={submitError}
          onCancel={returnToProducts}
          onSubmit={createProduct}
        />
      </Paper>
    </Stack>
  );
}

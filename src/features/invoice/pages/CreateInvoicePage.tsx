import { useState } from "react";

import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { paths } from "../../../app/router/paths";
import { useCreateInvoiceMutation} from "../api/InvoicesApi";
import { useGetCustomersQuery } from "../../clients/api/ClientsApi";
import { InvoiceForm } from "../components/InvoiceForm";
import type { InvoiceFormValues } from "../schemas/invoiceSchemas";
import type {
  CreateInvoiceRequest,
  InvoiceStatus,
} from "../types/Invoice.types";

type CreateInvoiceStatus = Extract<InvoiceStatus, "draft" | "sent">;

function getCreateInvoiceErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = error.data;

    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      return data.message;
    }
  }

  return "No pudimos crear la factura. Intentá nuevamente.";
}

export function CreateInvoicePage() {
  const navigate = useNavigate();
  const [createInvoiceMutation, { isLoading: isSubmitting }] =
    useCreateInvoiceMutation();
  const {
    data: customersData,
    isError: isCustomersError,
    isLoading: isCustomersLoading,
  } = useGetCustomersQuery();
  const [submitError, setSubmitError] = useState<string>();

  const returnToInvoices = () => {
    navigate(paths.billing);
  };

  const createInvoice = async (
    values: InvoiceFormValues,
    status: CreateInvoiceStatus,
  ) => {
    setSubmitError(undefined);

    const request: CreateInvoiceRequest = {
      ...values,
      status,
    };

    try {
      const response = await createInvoiceMutation(request).unwrap();

      navigate(paths.billingInvoicePreview(response.invoice.id), {
        replace: true,
      });
    } catch (error) {
      setSubmitError(getCreateInvoiceErrorMessage(error));
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Breadcrumbs sx={{ mb: 1 }}>
          <Link component="button" onClick={returnToInvoices}>
            Facturas
          </Link>
          <Typography color="text.primary">Crear</Typography>
        </Breadcrumbs>

        <Typography component="h1" variant="h4">
          Crear factura
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Completá los datos del cliente y los conceptos que serán facturados.
        </Typography>
      </Box>

      <InvoiceForm
        customers={customersData?.customers ?? []}
        customersError={
          isCustomersError
            ? "No pudimos cargar los clientes disponibles."
            : undefined
        }
        isCustomersLoading={isCustomersLoading}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onCancel={returnToInvoices}
        onSubmit={createInvoice}
      />
    </Stack>
  );
}

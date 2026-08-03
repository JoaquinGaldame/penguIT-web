import { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

import { appConfig } from "../../../app/config/appConfig";
import { AppIcon } from "../../../shared/components/AppIcon";
// Schemas and Formatters
import {
  invoiceSchema,
  type InvoiceFormInput,
  type InvoiceFormValues,
} from "../schemas/invoiceSchemas";
import type {
  InvoiceCurrency,
  InvoiceCustomer,
  InvoiceStatus,
} from "../types/Invoice.types";
import { formatInvoiceCurrency } from "../utils/invoiceFormatters";

type CreateInvoiceStatus = Extract<InvoiceStatus, "draft" | "sent">;

interface InvoiceFormProps {
  customers: InvoiceCustomer[];
  customersError?: string;
  isCustomersLoading?: boolean;
  isSubmitting?: boolean;
  submitError?: string;
  onCancel: () => void;
  onSubmit: (
    values: InvoiceFormValues,
    status: CreateInvoiceStatus,
  ) => Promise<void>;
}

const fieldGridSx = {
  display: "grid",
  gap: 2,
  gridTemplateColumns: {
    xs: "minmax(0, 1fr)",
    md: "repeat(2, minmax(0, 1fr))",
  },
};

function toInputDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDefaultDates() {
  const issueDate = new Date();
  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + 7);

  return {
    issueDate: toInputDate(issueDate),
    dueDate: toInputDate(dueDate),
  };
}

export function InvoiceForm({
  customers,
  customersError,
  isCustomersLoading = false,
  isSubmitting = false,
  submitError,
  onCancel,
  onSubmit,
}: InvoiceFormProps) {
  const defaultDates = useMemo(() => getDefaultDates(), []);
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<InvoiceFormInput, unknown, InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customerId: "",
      issueDate: defaultDates.issueDate,
      dueDate: defaultDates.dueDate,
      currency: "ARS",
      items: [
        {
          description: "",
          quantity: 1,
          unitPrice: 0,
          taxRate: 21,
        },
      ],
      notes: "",
    },
    mode: "onBlur",
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: "items",
  });
  const selectedCustomerId = useWatch({ control, name: "customerId" });
  const currency = useWatch({ control, name: "currency" }) as InvoiceCurrency;
  const watchedItems = useWatch({ control, name: "items" });
  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId,
  );

  const totals = useMemo(
    () =>
      (watchedItems ?? []).reduce(
        (result, item) => {
          const quantity = Number(item.quantity) || 0;
          const unitPrice = Number(item.unitPrice) || 0;
          const taxRate = Number(item.taxRate) || 0;
          const lineSubtotal = quantity * unitPrice;

          return {
            subtotal: result.subtotal + lineSubtotal,
            tax: result.tax + lineSubtotal * (taxRate / 100),
          };
        },
        { subtotal: 0, tax: 0 },
      ),
    [watchedItems],
  );

  const submitWithStatus = (status: CreateInvoiceStatus) =>
    handleSubmit((values) => onSubmit(values, status));

  return (
    <Box component="form" noValidate>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            lg: "minmax(0, 1fr) 300px",
          },
        }}
      >
        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              p: { xs: 2, md: 3 },
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Avatar
                variant="rounded"
                sx={{ bgcolor: "primary.main", height: 48, width: 48 }}
              >
                <AppIcon icon="solar:bill-list-bold" width={26} />
              </Avatar>
              <Box>
                <Typography variant="h6">Nueva factura</Typography>
                <Typography color="text.secondary" variant="body2">
                  {appConfig.name} · Comprobante comercial
                </Typography>
              </Box>
            </Stack>

            <Typography color="text.secondary" variant="body2">
              El número se asignará al crearla
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={3} sx={{ p: { xs: 2, md: 3 } }}>
            {submitError && <Alert severity="error">{submitError}</Alert>}
            {customersError && <Alert severity="error">{customersError}</Alert>}

            <Box component="section">
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
                Cliente y fechas
              </Typography>

              <Box sx={fieldGridSx}>
                <Controller
                  name="customerId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Facturar a"
                      disabled={isCustomersLoading}
                      error={Boolean(errors.customerId)}
                      helperText={errors.customerId?.message}
                      slotProps={{
                        inputLabel: { shrink: true },
                        select: { displayEmpty: true },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Seleccionar cliente
                      </MenuItem>
                      {customers.map((customer) => (
                        <MenuItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <TextField select label="Moneda" {...register("currency")}>
                  <MenuItem value="ARS">Peso argentino (ARS)</MenuItem>
                  <MenuItem value="USD">Dólar estadounidense (USD)</MenuItem>
                </TextField>

                <TextField
                  type="date"
                  label="Fecha de emisión"
                  error={Boolean(errors.issueDate)}
                  helperText={errors.issueDate?.message}
                  slotProps={{ inputLabel: { shrink: true } }}
                  {...register("issueDate")}
                />

                <TextField
                  type="date"
                  label="Fecha de vencimiento"
                  error={Boolean(errors.dueDate)}
                  helperText={errors.dueDate?.message}
                  slotProps={{ inputLabel: { shrink: true } }}
                  {...register("dueDate")}
                />
              </Box>

              {selectedCustomer && (
                <Paper
                  variant="outlined"
                  sx={{ bgcolor: "action.hover", mt: 2, p: 2 }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={0.75}
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        {selectedCustomer.name}
                      </Typography>
                      <Typography color="text.secondary" variant="caption">
                        {selectedCustomer.email}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: { sm: "right" } }}>
                      <Typography color="text.secondary" variant="caption">
                        CUIT {selectedCustomer.taxId}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        variant="caption"
                        sx={{ display: "block" }}
                      >
                        {selectedCustomer.address} · {selectedCustomer.city}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              )}
            </Box>

            <Divider />

            <Box component="section">
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                    Conceptos facturados
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Agregá productos, servicios o cargos adicionales.
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  startIcon={
                    <AppIcon icon="solar:add-circle-linear" width={20} />
                  }
                  onClick={() =>
                    append({
                      description: "",
                      quantity: 1,
                      unitPrice: 0,
                      taxRate: 21,
                    })
                  }
                >
                  Agregar ítem
                </Button>
              </Stack>

              <Stack spacing={1.5}>
                {fields.map((field, index) => (
                  <Paper key={field.id} variant="outlined" sx={{ p: 2 }}>
                    <Box
                      sx={{
                        alignItems: "start",
                        display: "grid",
                        gap: 1.5,
                        gridTemplateColumns: {
                          xs: "minmax(0, 1fr)",
                          md: "minmax(220px, 1fr) 110px 150px 125px 44px",
                        },
                      }}
                    >
                      <TextField
                        label="Descripción"
                        error={Boolean(errors.items?.[index]?.description)}
                        helperText={errors.items?.[index]?.description?.message}
                        {...register(`items.${index}.description`)}
                      />
                      <TextField
                        type="number"
                        label="Cantidad"
                        error={Boolean(errors.items?.[index]?.quantity)}
                        helperText={errors.items?.[index]?.quantity?.message}
                        slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
                        {...register(`items.${index}.quantity`)}
                      />
                      <TextField
                        type="number"
                        label="Precio unitario"
                        error={Boolean(errors.items?.[index]?.unitPrice)}
                        helperText={errors.items?.[index]?.unitPrice?.message}
                        slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
                        {...register(`items.${index}.unitPrice`)}
                      />
                      <TextField
                        select
                        label="IVA"
                        {...register(`items.${index}.taxRate`)}
                      >
                        <MenuItem value={21}>21%</MenuItem>
                        <MenuItem value={10.5}>10,5%</MenuItem>
                        <MenuItem value={0}>Exento</MenuItem>
                      </TextField>
                      <Tooltip title="Eliminar ítem">
                        <span>
                          <IconButton
                            color="error"
                            disabled={fields.length === 1}
                            aria-label={`Eliminar ítem ${index + 1}`}
                            onClick={() => remove(index)}
                            sx={{ mt: 0.25 }}
                          >
                            <AppIcon
                              icon="solar:trash-bin-trash-linear"
                              width={21}
                            />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Box>
                  </Paper>
                ))}
              </Stack>

              {errors.items?.root?.message && (
                <Alert severity="error" sx={{ mt: 1.5 }}>
                  {errors.items.root.message}
                </Alert>
              )}
            </Box>

            <Divider />

            <Box
              sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  md: "minmax(0, 1fr) 320px",
                },
              }}
            >
              <TextField
                multiline
                minRows={4}
                label="Notas para el cliente"
                placeholder="Condiciones de pago o información adicional"
                error={Boolean(errors.notes)}
                helperText={errors.notes?.message}
                {...register("notes")}
              />

              <Stack spacing={1.25}>
                <SummaryRow
                  label="Subtotal"
                  value={formatInvoiceCurrency(totals.subtotal, currency)}
                />
                <SummaryRow
                  label="Impuestos"
                  value={formatInvoiceCurrency(totals.tax, currency)}
                />
                <Divider />
                <SummaryRow
                  emphasized
                  label="Total"
                  value={formatInvoiceCurrency(
                    totals.subtotal + totals.tax,
                    currency,
                  )}
                />
              </Stack>
            </Box>
          </Stack>
        </Paper>

        <Stack
          spacing={2}
          sx={{ alignSelf: "start", position: { lg: "sticky" }, top: 24 }}
        >
          <Paper variant="outlined" sx={{ p: 2.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>
              Acciones
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
              Guardala para continuar después o creala lista para enviar.
            </Typography>

            <Stack spacing={1.25}>
              <Button
                variant="contained"
                disabled={isSubmitting}
                startIcon={<AppIcon icon="solar:plain-2-linear" width={20} />}
                onClick={submitWithStatus("sent")}
              >
                {isSubmitting ? "Creando…" : "Crear y marcar enviada"}
              </Button>
              <Button
                variant="outlined"
                disabled={isSubmitting}
                startIcon={<AppIcon icon="solar:diskette-linear" width={20} />}
                onClick={submitWithStatus("draft")}
              >
                Guardar borrador
              </Button>
              <Button
                color="inherit"
                disabled={isSubmitting}
                onClick={onCancel}
              >
                Cancelar
              </Button>
            </Stack>
          </Paper>

          <Alert
            severity="info"
            variant="outlined"
            icon={<AppIcon icon="solar:info-circle-linear" width={22} />}
          >
            Los impuestos y totales se recalcularán en el servidor al crear la
            factura.
          </Alert>
        </Stack>
      </Box>
    </Box>
  );
}

interface SummaryRowProps {
  emphasized?: boolean;
  label: string;
  value: string;
}

function SummaryRow({ emphasized = false, label, value }: SummaryRowProps) {
  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between" }}>
      <Typography
        color={emphasized ? "text.primary" : "text.secondary"}
        sx={{ fontWeight: emphasized ? 800 : 500 }}
      >
        {label}
      </Typography>
      <Typography
        variant={emphasized ? "h6" : "body2"}
        sx={{ fontWeight: 800, textAlign: "right" }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

import { z } from "zod";

const invoiceLineSchema = z.object({
  description: z
    .string()
    .trim()
    .min(2, "Ingresá una descripción.")
    .max(180, "La descripción admite hasta 180 caracteres."),
  quantity: z.coerce
    .number()
    .finite("Ingresá una cantidad válida.")
    .positive("La cantidad debe ser mayor a cero."),
  unitPrice: z.coerce
    .number()
    .finite("Ingresá un precio válido.")
    .min(0, "El precio no puede ser negativo."),
  taxRate: z.coerce.number().refine((value) => [0, 10.5, 21].includes(value), {
    message: "Seleccioná una alícuota válida.",
  }),
});

export const invoiceSchema = z
  .object({
    customerId: z.string().min(1, "Seleccioná un cliente."),
    issueDate: z.string().min(1, "Ingresá la fecha de emisión."),
    dueDate: z.string().min(1, "Ingresá la fecha de vencimiento."),
    currency: z.enum(["ARS", "USD"]),
    items: z
      .array(invoiceLineSchema)
      .min(1, "Agregá al menos un concepto a la factura."),
    notes: z
      .string()
      .trim()
      .max(500, "Las notas admiten hasta 500 caracteres."),
  })
  .superRefine((values, context) => {
    if (
      values.issueDate &&
      values.dueDate &&
      values.dueDate < values.issueDate
    ) {
      context.addIssue({
        code: "custom",
        path: ["dueDate"],
        message: "El vencimiento no puede ser anterior a la emisión.",
      });
    }
  });

export type InvoiceFormInput = z.input<typeof invoiceSchema>;
export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
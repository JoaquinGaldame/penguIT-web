import { useState } from "react";

import { Icon } from "@iconify/react";
import {
  Alert,
  Box,
  Breadcrumbs,
  GlobalStyles,
  IconButton,
  Link,
  Skeleton,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { paths } from "../../../app/router/paths";
import { useGetInvoiceQuery } from "../api/InvoicesApi";
import { InvoiceDocument } from "../components/InvoiceDocument";

export function InvoicePreview() {
  const navigate = useNavigate();
  const { invoiceId = "" } = useParams();
  const { data, isError, isLoading, refetch } = useGetInvoiceQuery(invoiceId, {
    skip: !invoiceId,
  });
  const [shareMessage, setShareMessage] = useState<string>();

  const downloadInvoice = () => {
    const previousTitle = document.title;
    document.title = `Factura-${data?.invoice.number ?? invoiceId}`;

    try {
      window.print();
    } finally {
      document.title = previousTitle;
    }
  };

  const shareInvoice = async () => {
    const shareData = {
      title: data?.invoice.number ?? "Factura",
      text: `Factura ${data?.invoice.number ?? ""}`.trim(),
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setShareMessage("Enlace copiado al portapapeles.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setShareMessage("No pudimos compartir la factura.");
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
        "@media print": {
          display: "block",
          width: "100%",
          height: "auto",
          overflow: "visible",
          p: 0,
        },
      }}
    >
      <GlobalStyles
        styles={{
          "@page": { margin: 0, size: "A4 portrait" },
          "@media print": {
            "html, body, #root": {
              backgroundColor: "#fff",
              minHeight: "auto",
            },
            body: {
              margin: 0,
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact",
            },
            ".MuiSnackbar-root": { display: "none !important" },
          },
        }}
      />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          alignItems: { xs: "stretch", sm: "flex-start" },
          justifyContent: "space-between",
          "@media print": { display: "none" },
        }}
      >
        <Box>
          <Breadcrumbs sx={{ mb: 1 }}>
            <Link component="button" onClick={() => navigate(paths.billing)}>
              Facturas
            </Link>
            <Typography color="text.primary">Vista previa</Typography>
          </Breadcrumbs>
          <Typography component="h1" variant="h4">
            Vista previa de factura
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{ alignSelf: { xs: "flex-end", sm: "auto" } }}
        >
          <Tooltip title="Imprimir o guardar como PDF">
            <span>
              <IconButton
                aria-label="Imprimir o guardar factura como PDF"
                disabled={!data?.invoice}
                onClick={downloadInvoice}
                sx={{ border: 1, borderColor: "divider" }}
              >
                <Icon icon="solar:download-minimalistic-linear" width={22} />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Compartir">
            <span>
              <IconButton
                aria-label="Compartir factura"
                disabled={!data?.invoice}
                onClick={shareInvoice}
                sx={{ border: 1, borderColor: "divider" }}
              >
                <Icon icon="solar:share-linear" width={22} />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Stack>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Skeleton
            variant="rounded"
            height="297mm"
            animation="wave"
            sx={{ maxWidth: "210mm", width: "100%" }}
          />
        </Box>
      ) : isError || !data?.invoice ? (
        <Alert
          severity="error"
          action={
            <IconButton
              color="inherit"
              aria-label="Reintentar"
              onClick={() => refetch()}
            >
              <Icon icon="solar:refresh-linear" width={20} />
            </IconButton>
          }
        >
          No pudimos cargar la factura solicitada.
        </Alert>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            "@media print": { display: "block" },
          }}
        >
          <InvoiceDocument invoice={data.invoice} />
        </Box>
      )}

      <Snackbar
        autoHideDuration={3000}
        message={shareMessage}
        open={Boolean(shareMessage)}
        onClose={() => setShareMessage(undefined)}
      />
    </Stack>
  );
}

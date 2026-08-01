import type { Customer } from "../types/Customer.types";

export const customersMock: Customer[] = [
  {
    id: "customer-001",
    name: "Bodega del Sur",
    email: "administracion@bodegadelsur.com",
    initials: "BS",
    taxId: "30-71845216-9",
    address: "Av. San Martín 1840",
    city: "Mendoza, Argentina",
  },
  {
    id: "customer-002",
    name: "Estudio Arenales",
    email: "pagos@estudioarenales.com",
    initials: "EA",
    taxId: "30-70988452-4",
    address: "Arenales 2631",
    city: "CABA, Argentina",
  },
  {
    id: "customer-003",
    name: "Mercado Norte",
    email: "cuentas@mercadonorte.com.ar",
    initials: "MN",
    taxId: "30-71553740-1",
    address: "Belgrano 920",
    city: "Córdoba, Argentina",
  },
  {
    id: "customer-004",
    name: "Hotel Costanera",
    email: "compras@hotelcostanera.com",
    initials: "HC",
    taxId: "30-69874213-8",
    address: "Costanera Norte 455",
    city: "Rosario, Argentina",
  },
];

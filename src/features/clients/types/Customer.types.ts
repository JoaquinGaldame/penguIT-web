export interface Customer {
  id: string;
  name: string;
  email: string;
  initials: string;
  taxId?: string;
  address?: string;
  city?: string;
}

export interface GetCustomersResponse {
  customers: Customer[];
}

export interface ClientsState {
  selectedCustomerId: string | null;
}

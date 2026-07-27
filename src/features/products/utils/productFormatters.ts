import type {
  Product,
  ProductStockStatus,
} from '../types/Product.types';

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('es-AR', {
  maximumFractionDigits: 2,
});

const relativeTimeFormatter = new Intl.RelativeTimeFormat('es-AR', {
  numeric: 'auto',
});

export function formatProductCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function formatProductStock(value: number) {
  return numberFormatter.format(value);
}

export function formatProductRelativeTime(value: string) {
  const elapsedMinutes = Math.round(
    (new Date(value).getTime() - Date.now()) / 60_000,
  );
  const absoluteMinutes = Math.abs(elapsedMinutes);

  if (absoluteMinutes < 60) {
    return relativeTimeFormatter.format(elapsedMinutes, 'minute');
  }

  const elapsedHours = Math.round(elapsedMinutes / 60);

  if (Math.abs(elapsedHours) < 24) {
    return relativeTimeFormatter.format(elapsedHours, 'hour');
  }

  return relativeTimeFormatter.format(
    Math.round(elapsedHours / 24),
    'day',
  );
}

export function getProductCurrentStock(product: Product) {
  return product.currentStock ?? product.initialStock ?? 0;
}

export function getProductStockStatus(
  product: Product,
): ProductStockStatus {
  if (!product.trackStock) {
    return 'untracked';
  }

  const stock = getProductCurrentStock(product);
  const minimum = product.minimumStock ?? 0;

  if (stock <= minimum) {
    return 'critical';
  }

  if (minimum > 0 && stock <= minimum * 1.5) {
    return 'low';
  }

  return 'normal';
}

export function getProductStockRatio(product: Product) {
  if (!product.trackStock) {
    return null;
  }

  const stock = getProductCurrentStock(product);
  const minimum = product.minimumStock ?? 0;

  if (minimum <= 0) {
    return stock > 0 ? 100 : 0;
  }

  return Math.min(100, Math.round((stock / (minimum * 2)) * 100));
}

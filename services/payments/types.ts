export interface SavedPaymentMethod {
  id: string;
  stripePaymentMethodId: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  createdAt: string;
}

export interface SavePaymentMethodDto {
  paymentMethodId: string;
  setAsDefault?: boolean;
}

export interface SetDefaultPaymentMethodDto {
  paymentMethodId: string;
}

export type CardBrand =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'discover'
  | 'diners'
  | 'jcb'
  | 'unionpay'
  | 'unknown';

export function getCardBrandDisplayName(brand: string): string {
  const brands: Record<string, string> = {
    visa: 'Visa',
    mastercard: 'Mastercard',
    amex: 'American Express',
    discover: 'Discover',
    diners: 'Diners Club',
    jcb: 'JCB',
    unionpay: 'UnionPay',
  };
  return brands[brand.toLowerCase()] ?? 'Card';
}

export function getCardBrandIcon(brand: string): string {
  // Returns a class name or icon identifier for the card brand
  const icons: Record<string, string> = {
    visa: 'visa',
    mastercard: 'mastercard',
    amex: 'amex',
    discover: 'discover',
    diners: 'diners',
    jcb: 'jcb',
    unionpay: 'unionpay',
  };
  return icons[brand.toLowerCase()] ?? 'card';
}

export function formatExpiryDate(month: number, year: number): string {
  const monthStr = month.toString().padStart(2, '0');
  const yearStr = year.toString().slice(-2);
  return `${monthStr}/${yearStr}`;
}

export enum PaymentMethod {
  PROMPTPAY = "PROMPTPAY",
  BANK_TRANSFER = "BANK_TRANSFER"
}

export const PAYMENT_METHOD_LABEL_MAP: Record<PaymentMethod, string> = {
  [PaymentMethod.PROMPTPAY]: "Prompt Pay",
  [PaymentMethod.BANK_TRANSFER]: "Bank Transfer"
};

export interface PaymentMethodBadgeProps {
  method: PaymentMethod | string;
}

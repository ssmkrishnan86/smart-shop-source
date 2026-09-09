import { z } from 'zod';

export const addressSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(4, 'Zip / Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().min(7, 'Valid phone number is required'),
});

export type AddressFormData = z.infer<typeof addressSchema>;

export const paymentSchema = z.object({
  paymentMethod: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'UPI', 'NET_BANKING', 'CASH_ON_DELIVERY']),
  cardNumber: z.string().optional(),
  cardHolder: z.string().optional(),
  expiry: z.string().optional(),
  cvv: z.string().optional(),
  upiId: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;

import { Currency } from '../enums';

export function formatCurrency(amount: number, currency: Currency = Currency.INR): string {
  if (currency === Currency.INR) {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  if (currency === Currency.USD) {
    return `$${(amount / 83.5).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

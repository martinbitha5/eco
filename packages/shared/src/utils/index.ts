export function formatCurrency(amount: number, currency = 'CDF'): string {
  return new Intl.NumberFormat('fr-CD', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('243')) return `+${cleaned}`;
  if (cleaned.startsWith('0')) return `+243${cleaned.slice(1)}`;
  return `+243${cleaned}`;
}

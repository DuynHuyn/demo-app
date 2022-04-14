export const formatCurrency = (
  v: number,
  c: string = 'USD',
  l: string = 'en-US'
): string =>
  new Intl.NumberFormat(l, {
    style: 'currency',
    currency: c,
  }).format(v)

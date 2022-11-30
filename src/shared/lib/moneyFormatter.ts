const rubFormatter = new Intl.NumberFormat('ru', {
  style: 'currency',
  currency: 'RUB',
  maximumSignificantDigits: 1,
});

export const formatMoney = (amount: number) => rubFormatter.format(amount);

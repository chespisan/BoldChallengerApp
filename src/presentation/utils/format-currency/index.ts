export const formatCurrency = (num: number | string) => {
  return `$ ${Number(num)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

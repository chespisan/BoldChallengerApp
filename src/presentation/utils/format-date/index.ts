export const formatDate = (date: number, flag?: boolean) => {
  const format = new Date(date);
  const day = flag ? format.getDate() + 1 : format.getDate();
  const month = format.getMonth() + 1;
  const year = format.getFullYear();
  const hours = format.getHours();
  const minutes = format.getMinutes();
  const seconds = format.getSeconds();
  const formattedDate = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

export const parseInputToDate = (date: string) => {
  const [day, month, year] = date.split('.');
  return Date.parse(`${year}-${month}-${day}`);
};

export const parseDate = (date: string) => {
  return Date.parse(date);
};

export const formatDate = (date: string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedDay}.${formattedMonth}.${year}, ${formattedHours}:${formattedMinutes}`;
};

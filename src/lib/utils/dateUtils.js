import dayjs from 'dayjs';

export const formatDate = (dateString) => {
  if (!dateString) {
    return ""; 
  }
  return dayjs(dateString).format('YYYY-MM-DD');
};

export const isCurrentDay = (dateString) => {
  const givenDate = dayjs(dateString);
  const currentDate = dayjs();
  return givenDate.isSame(currentDate, 'day');
};

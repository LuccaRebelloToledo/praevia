import dayjs from 'dayjs';

export const getCurrentDate = (): Date => {
  return dayjs().toDate();
};

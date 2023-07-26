export const formatDateShort = (input: Date) => {
  if (!input) {
    return '';
  }

  const options = { hour12: false };
  const date = new Date(input);
  const dateString = `${date.toLocaleDateString(undefined, options)}`;
  return dateString;
};

export const getDateString = (dateString: string): string => {
  let date;
  try {
    date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
  } catch (e) {
    console.error(e);
    // If the date is invalid, return the original string
    return dateString;
  }
  return date.toDateString();
};

export const getDateTime = (date: Date, time: Date): Date => {
  let mDate = new Date(date);

  mDate.setHours(time.getHours());
  mDate.setMinutes(time.getMinutes());
  mDate.setSeconds(time.getSeconds());
  mDate.setMilliseconds(time.getMilliseconds());

  return mDate;
};

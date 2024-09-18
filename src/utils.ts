import { DataRow, FormValues } from './interfaces';

export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  const result: T[][] = [];
  array.forEach((_, index) => {
    if (index % chunkSize === 0) {
      result.push(array.slice(index, index + chunkSize));
    }
  });
  return result;
};
const isoToDateTimeLocal = (dateString: string): string => {
  const date = new Date(dateString.trim());
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const dateTimeLocalToIso = (dateString: string): string => {
  const formattedDateStr = dateString.includes('T') ? dateString : dateString.split(' ').join('T');
  const localDate = new Date(formattedDateStr);
  return localDate.toISOString();
};

export const formatValuesForServer = (values: FormValues): FormValues => ({
  ...values,
  companySigDate: dateTimeLocalToIso(values.companySigDate),
  employeeSigDate: dateTimeLocalToIso(values.employeeSigDate),
});

const formatDateFields = (row: DataRow): DataRow => ({
  ...row,
  companySigDate: isoToDateTimeLocal(row.companySigDate),
  employeeSigDate: isoToDateTimeLocal(row.employeeSigDate),
});

export const formatRow = (row: DataRow): DataRow => formatDateFields(row);
export const formatRows = (data: DataRow[]): DataRow[] => data.map(formatDateFields);

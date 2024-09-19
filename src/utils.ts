import dayjs from 'dayjs';
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
export const isoToDateTimeLocal = (dateString: string): string => dayjs(dateString.trim()).format('YYYY-MM-DD HH:mm');

export const formatValuesForServer = (values: FormValues): FormValues => ({
  ...values,
  companySigDate: dayjs(values.companySigDate).toISOString(),
  employeeSigDate: dayjs(values.employeeSigDate).toISOString(),
});

const formatDateFields = (row: DataRow): DataRow => ({
  ...row,
  companySigDate: isoToDateTimeLocal(row.companySigDate),
  employeeSigDate: isoToDateTimeLocal(row.employeeSigDate),
});

export const formatRow = (row: DataRow): DataRow => formatDateFields(row);
export const formatRows = (data: DataRow[]): DataRow[] => data.map(formatDateFields);

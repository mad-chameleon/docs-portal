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
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
};

const dateTimeLocalToIso = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString();
};

export const formatValuesForServer = (values: FormValues): FormValues => ({
  ...values,
  companySigDate: values.companySigDate ? dateTimeLocalToIso(values.companySigDate) : '',
  employeeSigDate: values.employeeSigDate ? dateTimeLocalToIso(values.employeeSigDate) : '',
});

const formatDateFields = (row: DataRow): DataRow => ({
  ...row,
  companySigDate: isoToDateTimeLocal(row.companySigDate),
  employeeSigDate: isoToDateTimeLocal(row.employeeSigDate),
});

export const formatRow = (row: DataRow): DataRow => formatDateFields(row);
export const formatRows = (data: DataRow[]): DataRow[] => data.map(formatDateFields);

import dayjs from 'dayjs';

export {};

export interface DataRow {
    id: string,
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
}

export interface FormValues {
    companySigDate: dayjs.Dayjs | null | string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: dayjs.Dayjs | null | string;
    employeeSignatureName: string;
}

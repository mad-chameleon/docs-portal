import * as Yup from "yup";

export interface DataRow {
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
}


export const initialRows: DataRow[] = [
    {
        companySigDate: '2022-12-23T11:19:27.017Z\t',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2022-12-23T11:19:27.017Z\t',
        employeeSignatureName: 'Jane Smith',
    },
    {
        companySigDate: '2022-12-23T11:19:27.017Z\t',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2022-12-23T11:19:27.017Z\t',
        employeeSignatureName: 'Jane Smith',
    },
    {
        companySigDate: '2022-12-23T11:19:27.017Z\t',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2022-12-23T11:19:27.017Z\t',
        employeeSignatureName: 'Jane Smith',
    },
    {
        companySigDate: '2022-12-23T11:19:27.017Z\t',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2022-12-23T11:19:27.017Z\t',
        employeeSignatureName: 'Jane Smith',
    },
    {
        companySigDate: '2022-12-23T11:19:27.017Z\t',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2022-12-23T11:19:27.017Z\t',
        employeeSignatureName: 'Jane Smith',
    },
    {
        companySigDate: '2022-12-23T11:19:27.017Z\t',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2022-12-23T11:19:27.017Z\t',
        employeeSignatureName: 'Jane Smith',
    },
    {
        companySigDate: '2022-12-23T11:19:27.017Z\t',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2022-12-23T11:19:27.017Z\t',
        employeeSignatureName: 'Jane Smith',
    },
    {
        companySigDate: '2022-12-23T11:19:27.017Z\t',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2022-12-23T11:19:27.017Z\t',
        employeeSignatureName: 'Jane Smith',
    },
    {
        companySigDate: '2022-12-23T11:19:27.017Z\t',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2022-12-23T11:19:27.017Z\t',
        employeeSignatureName: 'Jane Smith',
    },
    {
        companySigDate: '2022-12-23T11:19:27.017Z\t',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2022-12-23T11:19:27.017Z\t',
        employeeSignatureName: 'Jane Smith',
    },
    {
        companySigDate: '2022-12-23T11:19:27.017Z\t',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2022-12-23T11:19:27.017Z\t',
        employeeSignatureName: 'Jane Smith',
    },
    {
        companySigDate: '2022-12-23T11:19:27.017Z\t',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2022-12-23T11:19:27.017Z\t',
        employeeSignatureName: 'Jane Smith',
    },
    {
        companySigDate: '2024-01-01',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2024-01-02',
        employeeSignatureName: 'Jane Smith',
    },
    {
        companySigDate: '2024-01-01',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2024-01-02',
        employeeSignatureName: 'Jane Smith',
    },  {
        companySigDate: '2024-01-01',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2024-01-02',
        employeeSignatureName: 'Jane Smith',
    },
    {
        companySigDate: '2024-01-01',
        companySignatureName: 'John Doe',
        documentName: 'Contract',
        documentStatus: 'Signed',
        documentType: 'Employment',
        employeeNumber: 'E12345',
        employeeSigDate: '2024-01-02',
        employeeSignatureName: 'Jane Smith',
    },
];

interface FieldConfig {
    title: string;
    errorMessage: string;
    type?: string;
    shrink?: boolean;
}

export const tableData: Record<string, FieldConfig> = {
    companySigDate: { title: 'Company Signature Date', errorMessage: 'Введите дату подписания', type: 'datetime-local', shrink: true },
    companySignatureName: { title: 'Company Signature Name', errorMessage: 'Введите имя подписанта'},
    documentName: { title: 'Document Name', errorMessage: 'Введите название документа' },
    documentStatus: { title: 'Document Status', errorMessage: 'Введите статус документа'},
    documentType: { title: 'Document Type', errorMessage: 'Введите тип документа'},
    employeeNumber: { title: 'Employee Number', errorMessage: 'Введите номер сотрудника'},
    employeeSigDate: { title: 'Employee Signature Date', errorMessage: 'Введите дату подписания', type: 'datetime-local', shrink: true},
    employeeSignatureName: { title: 'Employee Signature Name', errorMessage: 'Введите имя сотрудника'},
};

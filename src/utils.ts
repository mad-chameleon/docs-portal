import {format, parseISO} from "date-fns";


interface DataRow {
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
}

export const chunkArray = (array: { title: string, key: string, type?: string, shrink?: boolean }[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
};

const formatDate = (dateString: string): string => {
    try {
        const date = parseISO(dateString.trim());
        return format(date, "yyyy-MM-dd'T'HH:mm");
    } catch (error) {
        console.error("Invalid date format:", error);
        return '';
    }
};

export const transformData = (data: DataRow[]): DataRow[] => {
    return data.map(row => ({
        ...row,
        companySigDate: formatDate(row.companySigDate),
        employeeSigDate: formatDate(row.employeeSigDate),
    }));
};

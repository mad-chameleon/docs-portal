const tableColumnsData = [
  {
    title: 'Company Signature Date',
    key: 'companySigDate',
    type: 'datetime-local',
    shrink: true,
    errorMessages: {
      required: 'Введите дату подписания',
      typeError: 'Введите корректную дату',
      min: 'Минимально допустимая дата: 01.01.1900',
      max: 'Максимально допустимая дата: 31.12.2099',
    },
  },
  { title: 'Company Signature Name', key: 'companySignatureName', errorMessage: 'Введите имя подписанта' },
  { title: 'Document Name', key: 'documentName', errorMessage: 'Введите название документа' },
  { title: 'Document Status', key: 'documentStatus', errorMessage: 'Введите статус документа' },
  { title: 'Document Type', key: 'documentType', errorMessage: 'Введите тип документа' },
  { title: 'Employee Number', key: 'employeeNumber', errorMessage: 'Введите номер сотрудника' },
  {
    title: 'Employee Signature Date',
    key: 'employeeSigDate',
    type: 'datetime-local',
    errorMessages: {
      required: 'Введите дату подписания',
      typeError: 'Введите корректную дату',
      min: 'Минимально допустимая дата: 01.01.1900',
      max: 'Максимально допустимая дата: 31.12.2099',
    },
    shrink: true,
  },
  { title: 'Employee Signature Name', key: 'employeeSignatureName', errorMessage: 'Введите имя сотрудника' },
];

export default tableColumnsData;

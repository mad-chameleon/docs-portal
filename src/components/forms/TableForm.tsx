import {Alert, Box, Button, CircularProgress, TextField} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {FormikHelpers, useFormik} from "formik";
import * as Yup from "yup";
import { hideModal } from "../../store/slices/modalSlice";
import {addRow, editRow} from "../../store/slices/tableSlice";
import React, {useState} from "react";
import {ErrorOutline} from "@mui/icons-material";
import {chunkArray} from "../../utils";
import {tableData} from "../../data";

interface FormValues {
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
};

const tableColumns = [
    { title: 'Company Signature Date', key: 'companySigDate', type: 'datetime-local', shrink: true },
    { title: 'Company Signature Name', key: 'companySignatureName' },
    { title: 'Document Name', key: 'documentName' },
    { title: 'Document Status', key: 'documentStatus' },
    { title: 'Document Type', key: 'documentType' },
    { title: 'Employee Number', key: 'employeeNumber' },
    { title: 'Employee Signature Date', key: 'employeeSigDate', type: 'datetime-local', shrink: true },
    { title: 'Employee Signature Name', key: 'employeeSignatureName' },
];

const TableForm = () => {
    const dispatch = useDispatch();
    const { currentRowId, modalType } = useSelector((state: RootState) => state.modal);
    const rows = useSelector((state: RootState) => state.table.tableData);
    const editedRow = currentRowId !== null ? rows[currentRowId] : null;

    const [formState, setFormState] = useState({
        isError: false,
        errorMessage: '',
    });
    const [loading, setLoading] = useState(true);

    const chunkedRows = chunkArray(tableColumns, 2);

    const initialValues: FormValues = editedRow || {
        companySigDate: '',
        companySignatureName: '',
        documentName: '',
        documentStatus: '',
        documentType: '',
        employeeNumber: '',
        employeeSigDate: '',
        employeeSignatureName: '',
    };

    const validationSchema = Yup.object(
        Object.keys(tableData).reduce((schema, key) => {
            const field = tableData[key];
            schema[key] = Yup.string().required(field.errorMessage);
            return schema;
        }, {} as Record<string, Yup.StringSchema>)
    );

    const formik = useFormik<FormValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
            // if (modalType === 'add') {
            //     dispatch(addRow(values))
            // } else {}
            // if (currentRowId !== null) {
            //     dispatch(editRow({ index: currentRowId, updatedRow: values }));
            // }
            // dispatch(hideModal());

            if (modalType === 'add') {
                await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 секунды задержки
                dispatch(addRow(values));
            }

            if (currentRowId !== null) {
                await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 секунды задержки
                dispatch(editRow({ index: currentRowId, updatedRow: values }));
            }

            await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 секунда задержки
            // dispatch(hideModal());

        //     setSubmitting(true);
        //     try {
        //         await new Promise((_, reject) => {
        //             setTimeout(() => {
        //                 reject(new Error('kjj'));
        //             }, 2000);
        //         });
        //     } catch(err) {
        //         setFormState({ isError: true, errorMessage: 'Ошибка сети. Попробуйте позже.'})
        //         setSubmitting(false);
        //     }
        },
        enableReinitialize: true,
    });

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                backgroundColor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 4,
            }}
        >
            <h2 id="edit-modal-title">{modalType === 'edit' ? 'Редактировать строку': 'Добавить строку'}</h2>
            {formState.isError && <Alert icon={<ErrorOutline fontSize="inherit" />} severity="error">
                {formState.errorMessage}
            </Alert>}
            <form onSubmit={formik.handleSubmit} noValidate>
                {chunkedRows.map((row, rowIndex) => (
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }} key={rowIndex}>
                        {row.map((col) => (
                            <TextField
                                key={col.key}
                                type={col.type || 'text'}
                                name={col.key as keyof FormValues} // Указание типа ключа
                                label={col.title}
                                fullWidth
                                margin="normal"
                                value={formik.values[col.key as keyof FormValues]} // Указание типа ключа
                                onChange={formik.handleChange}
                                error={formik.touched[col.key as keyof FormValues] && Boolean(formik.errors[col.key as keyof FormValues])} // Указание типа ключа
                                helperText={formik.touched[col.key as keyof FormValues] && formik.errors[col.key as keyof FormValues]} // Указание типа ключа
                                slotProps={ col.shrink ? {
                                    inputLabel: {
                                        shrink: true,
                                    }
                                } : undefined }
                            />
                        ))}
                    </Box>
                ))}

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="contained" color="secondary" onClick={() => dispatch(hideModal())}>
                        Отменить
                    </Button>
                    <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                            <>
                                <CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />
                                Подождите...
                            </>
                        ) : modalType === 'edit' ? 'Сохранить' : 'Добавить'}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default TableForm;

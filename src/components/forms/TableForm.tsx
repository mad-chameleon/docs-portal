/* eslint-disable */
import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert, Box, Button, CircularProgress, TextField,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ErrorOutline } from '@mui/icons-material';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { hideModal } from '../../store/slices/modalSlice';
import { RootState } from '../../store';
import { chunkArray, formatValuesForServer, formatRow } from '../../utils';
import tableColumnsData from '../../tableColumnsData';
import routes from '../../routes';
import api from '../../api';
import { addRow, editRow } from '../../store/slices/tableSlice';
import { FormValues } from '../../interfaces';

const getInitialValues = (editedRow: FormValues | null): FormValues => (
  editedRow || {
    companySigDate: null,
    companySignatureName: '',
    documentName: '',
    documentStatus: '',
    documentType: '',
    employeeNumber: '',
    employeeSigDate: null,
    employeeSignatureName: '',
  }
);

const createValidationSchema = (columnsData: typeof tableColumnsData) => Yup.object(
  columnsData.reduce((schema, column) => {
    const fieldSchema = column.type === 'datetime-local'
      ? Yup.date()
        .typeError(column.errorMessages.typeError)
        .min(dayjs('1900-01-01').toDate(), column.errorMessages.min)
        .max(dayjs('2099-12-31T23:59:59').toDate(), column.errorMessages.max)
        .required(column.errorMessages.required)
      : Yup.string().required(column.errorMessage);

    schema[column.key] = fieldSchema as Yup.Schema<any>;
    return schema;
  }, {} as Record<string, Yup.Schema<any>>),
);

const TableForm = () => {
  const dispatch = useDispatch();
  const { currentRowId, modalType } = useSelector((state: RootState) => state.modal);
  const rows = useSelector((state: RootState) => state.table.tableData);
  const [formState, setFormState] = useState({ isError: false, errorMessage: '' });

  const editedRow = useMemo(() => {
    const row = rows.find(({ id }) => id === currentRowId) || null;
    if (!row) return null;

    const rowKeys = Object.keys(row) as Array<keyof FormValues>;

    const transformedRow = rowKeys.reduce((acc, key) => {
      const column = tableColumnsData.find(({ key: colKey }) => colKey === key);
      if (!column) return acc;

      const { type } = column;

      if (type === 'datetime-local') {
        acc[key] = row[key] ? dayjs(row[key]) : null;
      } else {
        acc[key] = row[key] || '';
      }
      return acc;
    }, {} as any);

    return transformedRow;
  }, [rows, currentRowId, tableColumnsData]);

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: getInitialValues(editedRow),
    onSubmit: useCallback(async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      setSubmitting(true);
      setFormState({ isError: false, errorMessage: '' });
      try {
        const formattedValues = formatValuesForServer(values);
        const url = modalType === 'add' ? routes.addRow() : routes.editRow(currentRowId as string);
        const response = await api.post(url, formattedValues);
        const formattedRow = formatRow(response.data.data);

        if (modalType === 'add') {
          dispatch(addRow(formattedRow));
        } else if (currentRowId !== null) {
          dispatch(editRow(formattedRow));
        }
        dispatch(hideModal());
      } catch {
        setFormState({
          isError: true,
          errorMessage: 'Ошибка сохранения данных. Попробуйте позже.',
        });
      } finally {
        setSubmitting(false);
      }
    }, [dispatch, modalType, currentRowId]),
    validationSchema: createValidationSchema(tableColumnsData),
  });

  const renderField = (col: typeof tableColumnsData[0]) => (
    col.type === 'datetime-local' ? (
      <Box key={col.key} sx={{ width: '100%' }}>
        <DesktopDateTimePicker
          sx={{ width: '100%' }}
          label={col.title}
          ampm={false}
          name={col.key as keyof FormValues}
          value={
          formik.values[col.key as keyof FormValues] ? dayjs(formik.values[col.key as keyof FormValues]) : null
        }
          onChange={(value) => {
            formik.setFieldValue(col.key as keyof FormValues, dayjs(value) || null);
          }}
          slotProps={{
            textField: {
              variant: 'outlined',
              error:
                  formik.touched[col.key as keyof FormValues] && Boolean(formik.errors[col.key as keyof FormValues]),
              helperText:
                  formik.touched[col.key as keyof FormValues] && formik.errors[col.key as keyof FormValues],
            },
          }}
        />
      </Box>
    ) : (
      <Box key={col.key} sx={{ width: '100%' }}>
        <TextField
          type="text"
          name={col.key as keyof FormValues}
          label={col.title}
          fullWidth
          value={formik.values[col.key as keyof FormValues]}
          onChange={formik.handleChange}
          error={
          formik.touched[col.key as keyof FormValues] && Boolean(formik.errors[col.key as keyof FormValues])
        }
          helperText={
          formik.touched[col.key as keyof FormValues] && formik.errors[col.key as keyof FormValues]
        }
        />
      </Box>
    )
  );

  return (
    <>
      <h2 id="edit-modal-title">{modalType === 'edit' ? 'Редактировать строку' : 'Добавить строку'}</h2>
      {formState.isError && (
        <Alert icon={<ErrorOutline fontSize="inherit" />} severity="error">
          {formState.errorMessage}
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit} noValidate>
        {chunkArray(tableColumnsData, 2).map((row) => (
          <Box
            sx={{
              display: 'flex', gap: 2, mb: 2, pt: 2,
            }}
            key={row[0].key}
          >
            {row.map(renderField)}
          </Box>
        ))}
        <Box sx={{
          mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2,
        }}
        >
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
    </>
  );
};

export default TableForm;

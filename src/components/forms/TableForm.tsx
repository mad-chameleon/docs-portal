import {
  Alert, Box, Button, CircularProgress, TextField,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import React, { useCallback, useMemo, useState } from 'react';
import { ErrorOutline } from '@mui/icons-material';
import { hideModal } from '../../store/slices/modalSlice';
import { RootState } from '../../store';
import { chunkArray, formatValuesForServer, formatRow } from '../../utils';
import tableColumnsData from '../../tableColumnsData';
import routes from '../../routes';
import api from '../../api';
import { addRow, editRow } from '../../store/slices/tableSlice';
import { FormValues } from '../../interfaces';

const TableForm = () => {
  const dispatch = useDispatch();
  const { currentRowId, modalType } = useSelector((state: RootState) => state.modal);
  const rows = useSelector((state: RootState) => state.table.tableData);
  const editedRow = useMemo(() => (currentRowId ? rows
    .find((row) => row.id === currentRowId) : null), [currentRowId, rows]);

  const [formState, setFormState] = useState({
    isError: false,
    errorMessage: '',
  });

  const getInitialValues = useCallback((): FormValues => (
    editedRow || {
      companySigDate: '',
      companySignatureName: '',
      documentName: '',
      documentStatus: '',
      documentType: '',
      employeeNumber: '',
      employeeSigDate: '',
      employeeSignatureName: '',
    }
  ), [editedRow]);

  const validationSchema = useMemo(() => Yup.object(
    tableColumnsData.reduce((schema, column) => {
      // eslint-disable-next-line no-param-reassign
      schema[column.key] = Yup.string().required(column.errorMessage);
      return schema;
    }, {} as Record<string, Yup.StringSchema>),
  ), []);

  // eslint-disable-next-line max-len
  const handleFormSubmit = useCallback(async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    setSubmitting(true);
    try {
      const formattedValues = formatValuesForServer(values);
      console.log({ values, formattedValues });

      const url = modalType === 'add' ? routes.addRow() : routes.editRow(currentRowId as string);
      const response = await api.post(url, formattedValues);
      console.log(response.data.data);
      const formattedRow = formatRow(response.data.data);

      // const formattedRow = formatRow(formattedValues);

      if (modalType === 'add') {
        dispatch(addRow(formattedRow));
      } else if (currentRowId !== null) {
        dispatch(editRow(formattedRow));
      }
      dispatch(hideModal());
    } catch (error) {
      // console.log(values)
      setFormState({
        isError: true,
        errorMessage: 'Ошибка сохранения данных. Попробуйте позже.',
      });
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, modalType, currentRowId]);

  const formik = useFormik<FormValues>({
    initialValues: getInitialValues(),
    validationSchema,
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
  });

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
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }} key={row[0].key}>
            {row.map((col) => (
              <TextField
                key={col.key}
                type={col.type || 'text'}
                name={col.key as keyof FormValues}
                label={col.title}
                fullWidth
                margin="normal"
                value={formik.values[col.key as keyof FormValues]}
                onChange={formik.handleChange}
                error={
                  // eslint-disable-next-line max-len
                  formik.touched[col.key as keyof FormValues] && Boolean(formik.errors[col.key as keyof FormValues])
              }
                helperText={
                  // eslint-disable-next-line max-len
                  formik.touched[col.key as keyof FormValues] && formik.errors[col.key as keyof FormValues]
              }
                slotProps={col.shrink ? {
                  inputLabel: {
                    shrink: true,
                  },
                } : undefined}
              />
            ))}
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

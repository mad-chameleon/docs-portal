import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, CircularProgress, Container, Typography,
} from '@mui/material';
import axios from 'axios';
import DocumentsTable from '../DocumentsTable';
import { setTableData } from '../../store/slices/tableSlice';
import { RootState } from '../../store';
import ModalDialog from '../ModalDialog';
import { formatRows } from '../../utils';
import api from '../../api';
import routes from '../../routes';
import NotificationBar from '../NotificationBar';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.modal);
  const [loading, setLoading] = useState(false);

  const [errorState, setErrorState] = useState({
    isError: false,
    errorMessage: '',
  });

  useEffect(() => {
    const fetchTableData = async () => {
      const token = localStorage.getItem('authId');
      setLoading(true);
      try {
        const response = await api.get(routes.tableData(), {
          headers: {
            'x-auth': token,
          },
        });

        if (response.data.error_code) {
          if (response.data.error_code === 2004) {
            setErrorState({ isError: true, errorMessage: 'Ошибка получения данных. Перезагрузите страницу.' });
            return;
          }
          setErrorState({ isError: true, errorMessage: 'Неизвестная ошибка. Перезагрузите страницу.' });
          return;
        }
        const transformedData = formatRows(response.data.data);
        dispatch(setTableData(transformedData));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorState({ isError: true, errorMessage: 'Ошибка сети. Перезагрузите страницу.' });
          return;
        }
        setErrorState({ isError: true, errorMessage: 'Неизвестная ошибка. Перезагрузите страницу.' });
      } finally {
        setLoading(false);
      }
    };
    // dispatch(setTableData([
    //     {
    //         "id": "7e3d477c-717d-403f-a2c0-3fbfd8c1da6f",
    //         "documentStatus": "Подписан",
    //         "employeeNumber": "1234",
    //         "documentType": "Приказ о приеме",
    //         "documentName": "Договор 2.pdf",
    //         "companySignatureName": "Приказ.sig",
    //         "employeeSignatureName": "Приказ 2.sig",
    //         "employeeSigDate": "2022-11-24T02:19:27",
    //         "companySigDate": "2022-11-03T02:19:30"
    //     }
    // ]))
    fetchTableData();
  }, [dispatch]);

  return (
    <>
      {errorState.isError && <NotificationBar errorMessage={errorState.errorMessage} isOpen />}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80vh',
              textAlign: 'center',
            }}
          >
            <CircularProgress size={60} />
            <Typography sx={{ mt: 2 }} variant="h6" component="div">
              Загрузка данных...
            </Typography>
          </Box>
        ) : (
          <DocumentsTable />
        )}
        { isOpen && <ModalDialog /> }
      </Container>
    </>
  );
};

export default ProfilePage;

import React, {
  useEffect, useState, useCallback, useRef,
} from 'react';
import {
  Box,
  Fab,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import {
  Edit as EditIcon, Delete as DeleteIcon, Cancel, CheckCircle, PlaylistAdd,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { removeRow } from '../store/slices/tableSlice';
import { showModal } from '../store/slices/modalSlice';
import routes from '../routes';
import api from '../api';
import { DataRow } from '../interfaces';
import NotificationBar from './NotificationBar';
import tableColumnsData from '../tableColumnsData';

const DocumentsTable = () => {
  const dispatch = useDispatch();
  const { tableData } = useSelector((state: RootState) => state.table);
  const { currentRowId: RowIndexToEdit } = useSelector((state: RootState) => state.modal);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowIndexToDelete, setRowIndexToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState({ isError: false, errorMessage: '' });

  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const { target } = event;
      const clickedOutside = !Object.values(buttonRefs.current)
        .some((ref) => ref && ref.contains(target as Node));
      if (clickedOutside) {
        setRowIndexToDelete(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setPage(0);
  }, [tableData]);

  const paginatedRows = tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleEditRow = useCallback((id: string) => {
    dispatch(showModal({ modalType: 'edit', id }));
  }, [dispatch]);

  const handleAddRow = useCallback(() => {
    dispatch(showModal({ modalType: 'add' }));
  }, [dispatch]);

  const handleDeleteRow = useCallback(async (id: string) => {
    if (rowIndexToDelete === id) {
      setErrorState({ isError: false, errorMessage: '' });
      setIsLoading(true);
      try {
        const response = await api.post(routes.deleteRow(id));

        if (response.data.error_code !== 0) {
          setErrorState({ isError: true, errorMessage: 'Ошибка удаления данных. Попробуйте позже.' });
        } else {
          dispatch(removeRow({ id }));
        }
      } catch (error) {
        setErrorState({ isError: true, errorMessage: 'Ошибка удаления данных. Попробуйте позже.' });
      } finally {
        setIsLoading(false);
        setRowIndexToDelete(null);
      }
    } else {
      setRowIndexToDelete(id);
    }
  }, [dispatch, rowIndexToDelete]);

  const handleCancelDelete = useCallback(() => {
    setRowIndexToDelete(null);
  }, []);

  return (
    <>
      {errorState.isError && <NotificationBar errorMessage={errorState.errorMessage} isOpen />}
      <TableContainer component={Paper} sx={{ height: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ fontWeight: 'bold' }}>
              <TableCell>
                <Box sx={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',
                }}
                >
                  <Fab onClick={handleAddRow} aria-label="add" color="success" size="small">
                    <PlaylistAdd />
                  </Fab>
                </Box>
              </TableCell>
              {tableColumnsData.map(({ title }) => (
                <TableCell key={title} sx={{ fontWeight: 'bold' }}>{title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow
                onDoubleClick={() => handleEditRow(row.id)}
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  border: RowIndexToEdit === row.id ? '2px solid green' : 'none',
                  '&:hover': { backgroundColor: 'rgba(189, 189, 189, 0.3)' },
                  backgroundColor: index % 2 === 1 ? 'transparent' : '#f5f5f5',
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {rowIndexToDelete === row.id ? (
                      <>
                        <IconButton
                          ref={(el) => { buttonRefs.current.confirm = el; }}
                          disabled={isLoading}
                          color="success"
                          aria-label="confirm"
                          size="small"
                          onClick={() => handleDeleteRow(row.id)}
                        >
                          <CheckCircle fontSize="small" />
                        </IconButton>
                        <IconButton
                          ref={(el) => {
                            buttonRefs.current.cancel = el;
                          }}
                          disabled={isLoading}
                          color="error"
                          aria-label="cancel"
                          size="small"
                          onClick={handleCancelDelete}
                        >
                          <Cancel fontSize="small" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          ref={(el) => {
                            buttonRefs.current.edit = el;
                          }}
                          aria-label="edit"
                          color="secondary"
                          size="small"
                          onClick={() => handleEditRow(row.id)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          ref={(el) => {
                            buttonRefs.current.delete = el;
                          }}
                          aria-label="delete"
                          color="info"
                          size="small"
                          onClick={() => handleDeleteRow(row.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </TableCell>
                {tableColumnsData.map(({ key }) => (
                  <TableCell key={key}>{row[key as keyof DataRow]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={tableData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Строк на странице"
      />
    </>
  );
};

export default DocumentsTable;

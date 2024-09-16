import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
    Alert,
    Box,
    Fab,
    IconButton,
    Snackbar,
    TablePagination,
} from "@mui/material";
import {useEffect, useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Cancel, CheckCircle, Close, DeleteOutline, ErrorOutline, PlaylistAdd} from "@mui/icons-material";
import { DataRow } from "../data";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {removeRow} from "../store/slices/tableSlice";
import {showModal} from "../store/slices/modalSlice";

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

const EmployeeTable = () => {
    const { tableData } = useSelector((state: RootState) => state.table);
    const [rows, setRows] = useState<DataRow[]>(tableData);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [rowIndexToDelete, setRowIndexToDelete] = useState<number | null>(null);

    const dispatch = useDispatch();
    const {  currentRowId: RowIndexToEdit } = useSelector((state: RootState) => state.modal);

  useEffect(() => {
        setRows(tableData);
    }, [tableData]);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEditRow = (index: number) => {
        dispatch(showModal( { modalType: 'edit', id: index }));
    };

    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({
        isError: false,
        errorMessage: '',
    });
    const handleDeleteRow = async  (index: number) => {
        // if (rowIndexToDelete === index) {
        //     setIsLoading(true)
        //     setTimeout(() => {
        //         dispatch(removeRow({ id: index }));
        //         setRowIndexToDelete(null);
        //         setIsLoading(false)
        //     }, 1000); // Задержка в 1000 мс (1 секунда)
        // } else {
        //     setRowIndexToDelete(index);
        // }
        if (rowIndexToDelete === index) {
            setIsLoading(true);
            setFormState({ isError: false, errorMessage: ''})
            setTimeout(() => {
                try {


                    throw new Error('Simulated error occurred while deleting row.');


                    // dispatch(removeRow({ id: index }));
                    // setRowIndexToDelete(null);
                } catch (err) {
                    setFormState({ isError: true, errorMessage: 'Ошибка сети. Попробуйте позже.'});
                    // setTimeout(() => {
                    //     setFormState({ isError: false, errorMessage: ''});
                    // }, 2000)
                    setRowIndexToDelete(null);
                    setOpen(true)

                } finally {
                    setIsLoading(false);
                }
            }, 1000);
        } else {
            setRowIndexToDelete(index);
        }
        // if (rowIndexToDelete === index) {
        //     dispatch(removeRow({ id:  index }));
        //     setRowIndexToDelete(null);
        // } else {
        //     setRowIndexToDelete(index);
        // }
    };

    const handleCancelDelete = () => {
        setRowIndexToDelete(null);
    };

    const [open, setOpen] = useState(false);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            {formState.isError &&
              <Snackbar onClose={handleClose} open={open} autoHideDuration={3000} anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
              }}>
                <Alert  sx={{ mb: 2}} icon={<ErrorOutline fontSize="inherit" />} severity="error" variant="filled">
                    {formState.errorMessage}
                </Alert>
              </Snackbar>
            }
            <TableContainer component={Paper} sx={{ height: 'auto' }}>
                <Table  sx={{ minWidth: 650 }}  aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ fontWeight: 'bold'}}>
                            <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Fab onClick={() => dispatch(showModal({ modalType: 'add'}))}  aria-label="add" color="success" size="small">
                                        <PlaylistAdd />
                                    </Fab>
                                </Box>
                            </TableCell>
                            {tableColumns.map(({ title }) => (
                                <TableCell key={title} sx={{ fontWeight: 'bold' }}>{title}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    border: RowIndexToEdit === index ? '2px solid green' : 'none',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    },
                                }}
                            >
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        {rowIndexToDelete === index ? (
                                            <>
                                                <IconButton disabled={isLoading} color="success" aria-label="confirm" size="small" onClick={() => handleDeleteRow(index)}>
                                                    <CheckCircle fontSize="small" />
                                                </IconButton>
                                                <IconButton disabled={isLoading} color="error" aria-label="cancel" size="small" onClick={handleCancelDelete}>
                                                    <Cancel fontSize="small" />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <>
                                                <IconButton aria-label="edit" color="secondary" size="small" onClick={() =>  handleEditRow(index)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton aria-label="delete" color="info" size="small" onClick={() => handleDeleteRow(index)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </>
                                        )}
                                    </Box>
                                </TableCell>
                                {tableColumns.map(({ key }) => (
                                    <TableCell key={key}>{row[key as keyof DataRow]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Строк на странице"
            />

        </>
    );
}

export default EmployeeTable;

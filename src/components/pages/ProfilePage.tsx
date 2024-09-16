import EmployeeTable from "../EmployeeTable";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { setTableData } from "../../store/slices/tableSlice";
import { initialRows } from "../../data";
import {Box, CircularProgress, Container, Typography} from "@mui/material";
import {RootState} from "../../store";
import ModalDialog from "../ModalDialog";
import {transformData} from "../../utils";

const ProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state: RootState) => state.modal);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // setLoading(true);
        // setTimeout(() => {
            const transformedData = transformData(initialRows);
            dispatch(setTableData(transformedData));
            // setLoading(false);
        // }, 2000);
    }, [dispatch]);

    return (
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '80vh',
                            textAlign: 'center'
                        }}
                    >
                        <CircularProgress size={60} />
                        <Typography sx={{ mt: 2 }} variant="h6" component="div">
                            Загрузка данных...
                        </Typography>
                    </Box>
                ) : (
                    <EmployeeTable />
                )}
                { isOpen && <ModalDialog /> }
            </Container>
    );
};

export default ProfilePage;


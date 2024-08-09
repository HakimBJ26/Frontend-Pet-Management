import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VaccineRecordService from '../../../../service/VaccinRecordService';
import { Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, colors } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Loader from '../../../../Loading/Loader';

const VaccineRecord = () => {
    const [records, setRecords] = useState([]);
    const [vaccineName, setVaccineName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [editId, setEditId] = useState(null);
    const [healthPassportId, setHealthPassportId] = useState();
    const [filterName, setFilterName] = useState('');
    const location = useLocation();
    const { state } = location;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadSortedVaccineRecords();
    }, [healthPassportId]);

    const loadVaccineRecords = async () => {
        try {
            const result = await VaccineRecordService.getAllVaccineRecordsByHealthPassportId(healthPassportId);
            setRecords(result);
        } catch (error) {
            console.error('Error loading vaccine records:', error);
        }
    };

    const loadSortedVaccineRecords = async () => {
        try {
            const result = await VaccineRecordService.getAllVaccineRecordsByHealthPassportIdSortedByDateDesc(healthPassportId);
            setRecords(result);
        } catch (error) {
            console.error('Error loading sorted vaccine records:', error);
        }
    };

    const filterVaccineRecords = async () => {
        setIsLoading(true)
        try {
            const result = await VaccineRecordService.getAllVaccineRecordsByHealthPassportIdAndVaccineName(healthPassportId, filterName);
            setRecords(result);
        } catch (error) {
            console.error('Error filtering vaccine records:', error);
        } finally { setIsLoading(false) }
    };

    const saveOrUpdateVaccineRecord = async (e) => {
        e.preventDefault();
        const record = { id: editId, vaccineName, description, date };

        try {
            if (editId) {
                await VaccineRecordService.updateVaccineRecord(editId, record);
                setEditId(null);
            } else {
                await VaccineRecordService.createVaccineRecord(healthPassportId, record);
            }
            loadSortedVaccineRecords();
            clearForm();
        } catch (error) {
            console.error('Error saving or updating vaccine record:', error);
        }
    };

    const editVaccineRecord = (record) => {
        setVaccineName(record.vaccineName);
        setDescription(record.description);
        setDate(record.date);
        setEditId(record.id);
    };

    const deleteVaccineRecord = async (id) => {
        try {
            await VaccineRecordService.deleteVaccineRecord(id);
            loadSortedVaccineRecords();
        } catch (error) {
            console.error('Error deleting vaccine record:', error);
        }
    };

    const clearForm = () => {
        setVaccineName('');
        setDescription('');
        setDate('');
        setEditId(null);
    };

    return (
        <Box sx={{ padding: 3, marginTop: 5 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Vaccine Records
            </Typography>
            <Paper sx={{ padding: 3, marginBottom: 3 }}>
                <form onSubmit={saveOrUpdateVaccineRecord}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Vaccine Name"
                            value={vaccineName}
                            onChange={(e) => setVaccineName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Veterinarian"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <TextField
                            label="Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button type="submit" variant="contained" color="primary">
                                {editId ? 'Update' : 'Add'}
                            </Button>
                            <Button type="button" variant="outlined" color="secondary" onClick={clearForm}>
                                Clear
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Paper>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
                <TextField
                    label="Search By Vaccine Name"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={filterVaccineRecords}>
                    {isLoading ? <Loader size={24} color={colors.grey[200]} /> : <span>Search</span>}
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vaccine Name</TableCell>
                            <TableCell>Veterinarian</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell>{record.vaccineName}</TableCell>
                                <TableCell>{record.description}</TableCell>
                                <TableCell>{record.date}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => editVaccineRecord(record)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteVaccineRecord(record.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default VaccineRecord;

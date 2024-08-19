import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MedicalRecordService from '../../../service/MedicalRecordService';
import { Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, colors } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Loader from '../../../Loading/Loader';

const MedicalRecord = () => {
    const [records, setRecords] = useState([]);
    const [recordType, setRecordType] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [editId, setEditId] = useState(null);
    const [healthPassportId, setHealthPassportId] = useState();
    const [filterType, setFilterType] = useState('');
    const location = useLocation();
    const { state } = location;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadSortedMedicalRecords();
    }, [healthPassportId]);

    const loadMedicalRecords = async () => {
        setIsLoading(true)
        try {
            const result = await MedicalRecordService.getAllMedicalRecordsByHealthPassportId(healthPassportId);
            setRecords(result);
        } catch (error) {
            console.error('Error loading medical records:', error);
        } finally { setIsLoading(false) }
    };

    const loadSortedMedicalRecords = async () => {
        try {
            const result = await MedicalRecordService.getAllMedicalRecordsByHealthPassportIdSortedByDateDesc(healthPassportId);
            setRecords(result);
        } catch (error) {
            console.error('Error loading sorted medical records:', error);
        }
    };

    const filterMedicalRecords = async () => {
        try {
            const result = await MedicalRecordService.getAllMedicalRecordsByHealthPassportIdAndRecordType(healthPassportId, filterType);
            setRecords(result);
        } catch (error) {
            console.error('Error filtering medical records:', error);
        }
    };

    const saveOrUpdateMedicalRecord = async (e) => {
        e.preventDefault();
        const record = { id: editId, recordType, description, date };
        try {
            if (editId) {
                await MedicalRecordService.updateMedicalRecord(editId, record);
                setEditId(null);
            } else {
                await MedicalRecordService.createMedicalRecord(healthPassportId, record);
            }
            loadSortedMedicalRecords();
            clearForm();
        } catch (error) {
            console.error('Error saving or updating medical record:', error);
        }
    };

    const editMedicalRecord = (record) => {
        setRecordType(record.surgeryType);
        setDescription(record.description);
        setDate(record.date);
        setEditId(record.id);
    };

    const deleteMedicalRecord = async (id) => {
        try {
            await MedicalRecordService.deleteMedicalRecord(id);
            loadSortedMedicalRecords();
        } catch (error) {
            console.error('Error deleting medical record:', error);
        }
    };

    const clearForm = () => {
        setRecordType('');
        setDescription('');
        setDate('');
        setEditId(null);
    };

    return (
        <Box sx={{ padding: 3, marginTop: 5 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Medical Records
            </Typography>
            <Paper sx={{ padding: 3, marginBottom: 3 }}>
                <form onSubmit={saveOrUpdateMedicalRecord}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Medicament"
                            value={recordType}
                            onChange={(e) => setRecordType(e.target.value)}
                            required
                        />
                        <TextField
                            label="Description"
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
                    label="Search By Medicament"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={filterMedicalRecords}>
                    {isLoading ? <Loader size={24} color={colors.grey[200]} /> : <span>Search</span>}

                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Medicament</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell>{record.recordType}</TableCell>
                                <TableCell>{record.description}</TableCell>
                                <TableCell>{record.date}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => editMedicalRecord(record)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteMedicalRecord(record.id)}>
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

export default MedicalRecord;

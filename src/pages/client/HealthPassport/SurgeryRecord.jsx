import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SurgeryRecordService from '../../../service/SurgeryRecordService';
import { Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const SurgeryRecord = () => {
    const [records, setRecords] = useState([]);
    const [surgeryType, setSurgeryType] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [editId, setEditId] = useState(null);
    const [healthPassportId, setHealthPassportId] = useState(3);
    const [filterType, setFilterType] = useState('');
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        loadSortedSurgeryRecords();
    }, [healthPassportId]);

    const loadSurgeryRecords = async () => {
        try {
            const result = await SurgeryRecordService.getAllSurgeryRecordsByHealthPassportId(healthPassportId);
            setRecords(result);
        } catch (error) {
            console.error('Error loading surgery records:', error);
        }
    };

    const loadSortedSurgeryRecords = async () => {
        try {
            const result = await SurgeryRecordService.getAllSurgeryRecordsByHealthPassportIdSortedByDateDesc(healthPassportId);
            setRecords(result);
        } catch (error) {
            console.error('Error loading sorted surgery records:', error);
        }
    };

    const filterSurgeryRecords = async () => {
        try {
            const result = await SurgeryRecordService.getAllSurgeryRecordsByHealthPassportIdAndSurgeryType(healthPassportId, filterType);
            setRecords(result);
        } catch (error) {
            console.error('Error filtering surgery records:', error);
        }
    };

    const saveOrUpdateSurgeryRecord = async (e) => {
        e.preventDefault();
        const record = { id: editId, surgeryType, description, date };
        console.log(record, editId)
        try {
            if (editId) {
                await SurgeryRecordService.updateSurgeryRecord(editId, record);
                setEditId(null);
            } else {
                await SurgeryRecordService.createSurgeryRecord(healthPassportId, record);
            }
            loadSortedSurgeryRecords();
            clearForm();
        } catch (error) {
            console.error('Error saving or updating surgery record:', error);
        }
    };

    const editSurgeryRecord = (record) => {
        setSurgeryType(record.surgeryType);
        setDescription(record.description);
        setDate(record.date);
        setEditId(record.id);
    };

    const deleteSurgeryRecord = async (id) => {
        try {
            await SurgeryRecordService.deleteSurgeryRecord(id);
            loadSortedSurgeryRecords();
        } catch (error) {
            console.error('Error deleting surgery record:', error);
        }
    };

    const clearForm = () => {
        setSurgeryType('');
        setDescription('');
        setDate('');
        setEditId(null);
    };

    return (
        <Box sx={{ padding: 3, marginTop: 5 }}>
            <Typography variant="h4" component="h2" gutterBottom>
            Surgery Records
            </Typography>
            <Paper sx={{ padding: 3, marginBottom: 3 }}>
                <form onSubmit={saveOrUpdateSurgeryRecord}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Surgery Type"
                            value={surgeryType}
                            onChange={(e) => setSurgeryType(e.target.value)}
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
                    label="Search By Surgery Type"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={filterSurgeryRecords}>
                    Search
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Surgery Type</TableCell>
                            <TableCell>Veterinarian</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell>{record.surgeryType}</TableCell>
                                <TableCell>{record.description}</TableCell>
                                <TableCell>{record.date}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => editSurgeryRecord(record)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteSurgeryRecord(record.id)}>
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

export default SurgeryRecord;

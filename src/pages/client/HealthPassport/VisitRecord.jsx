import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VisitRecordService from '../../../service/VisitRecordService';
import { Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const VisitRecord = () => {
    const [records, setRecords] = useState([]);
    const [visitType, setVisitType] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [editId, setEditId] = useState(null);
    const [healthPassportId, setHealthPassportId] = useState(3);
    const [filterType, setFilterType] = useState('');
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        loadSortedVisitRecords();
    }, [healthPassportId]);

    const loadVisitRecords = async () => {
        try {
            const result = await VisitRecordService.getAllVisitRecordsByHealthPassportId(healthPassportId);
            setRecords(result);
        } catch (error) {
            console.error('Error loading visit records:', error);
        }
    };

    const loadSortedVisitRecords = async () => {
        try {
            const result = await VisitRecordService.getAllVisitRecordsByHealthPassportIdSortedByDateDesc(healthPassportId);
            setRecords(result);
        } catch (error) {
            console.error('Error loading sorted visit records:', error);
        }
    };

    const filterVisitRecords = async () => {
        try {
            const result = await VisitRecordService.getAllVisitRecordsByHealthPassportIdAndVisitType(healthPassportId, filterType);
            setRecords(result);
        } catch (error) {
            console.error('Error filtering visit records:', error);
        }
    };

    const saveOrUpdateVisitRecord = async (e) => {
        e.preventDefault();
        const record = { id: editId, visitType, description, date };
        console.log(record, editId)
        try {
            if (editId) {
                await VisitRecordService.updateVisitRecord(editId, record);
                setEditId(null);
            } else {
                await VisitRecordService.createVisitRecord(healthPassportId, record);
            }
            loadSortedVisitRecords();
            clearForm();
        } catch (error) {
            console.error('Error saving or updating visit record:', error);
        }
    };

    const editVisitRecord = (record) => {
        setVisitType(record.visitType);
        setDescription(record.description);
        setDate(record.date);
        setEditId(record.id);
    };

    const deleteVisitRecord = async (id) => {
        try {
            await VisitRecordService.deleteVisitRecord(id);
            loadSortedVisitRecords();
        } catch (error) {
            console.error('Error deleting visit record:', error);
        }
    };

    const clearForm = () => {
        setVisitType('');
        setDescription('');
        setDate('');
        setEditId(null);
    };

    return (
        <Box sx={{ padding: 3, marginTop: 5 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Visit Records
            </Typography>
            <Paper sx={{ padding: 3, marginBottom: 3 }}>
                <form onSubmit={saveOrUpdateVisitRecord}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Visit Type"
                            value={visitType}
                            onChange={(e) => setVisitType(e.target.value)}
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
                    label="Search By Visit Type"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={filterVisitRecords}>
                    Search
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Visit Type</TableCell>
                            <TableCell>Veterinarian</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell>{record.visitType}</TableCell>
                                <TableCell>{record.description}</TableCell>
                                <TableCell>{record.date}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => editVisitRecord(record)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteVisitRecord(record.id)}>
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

export default VisitRecord;

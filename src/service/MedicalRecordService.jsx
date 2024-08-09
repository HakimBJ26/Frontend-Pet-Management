import axios from 'axios';
import { axiosPrivate } from '../common/configuration/ApiAuth';
import { HEADER_CREDENTIALS } from '../common/configuration/constants/Paths';

const API_URL = 'http://localhost:8090/api/medical_records';


class MedicalRecordService {
    static async createMedicalRecord(healthPassportId, medicalRecordDto) {
        try {
            const response = await axiosPrivate.post(`${API_URL}/${healthPassportId}`, medicalRecordDto,
                HEADER_CREDENTIALS
               );
            return response.data;
        } catch (error) {
            console.error('Error creating medical record:', error);
            throw error;
        }
    }

    static async updateMedicalRecord(id, medicalRecordDto) {
        try {
            const response = await axiosPrivate.put(`${API_URL}/${id}`, medicalRecordDto,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating medical record:', error);
            throw error;
        }
    }

    static async deleteMedicalRecord(id) {
        try {
            await axiosPrivate.delete(`${API_URL}/${id}`,
                HEADER_CREDENTIALS
            );
        } catch (error) {
            console.error('Error deleting medical record:', error);
            throw error;
        }
    }

    static async getAllMedicalRecordsByHealthPassportId(healthPassportId) {
        try {
            const response = await axiosPrivate.get(`${API_URL}/health_passport/${healthPassportId}`,
                HEADER_CREDENTIALS
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching medical records by health passport ID:', error);
            throw error;
        }
    }

    static async getAllMedicalRecordsByHealthPassportIdSortedByDateDesc(healthPassportId) {
        try {
            const response = await axiosPrivate.get(`${API_URL}/health_passport/${healthPassportId}/sorted`,
                HEADER_CREDENTIALS
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching sorted medical records:', error);
            throw error;
        }
    }

    static async getAllMedicalRecordsByHealthPassportIdAndRecordType(healthPassportId, recordType) {
        try {
            const response = await axiosPrivate.get(`${API_URL}/health_passport/${healthPassportId}/search`, {
                params: { recordType }
            },
            HEADER_CREDENTIALS);
            return response.data;
        } catch (error) {
            console.error('Error fetching filtered medical records:', error);
            throw error;
        }
    }
}

export default MedicalRecordService;

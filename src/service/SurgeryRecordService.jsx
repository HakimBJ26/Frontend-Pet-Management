import axios from 'axios';
import { axiosPrivate } from '../common/configuration/ApiAuth';
import { HEADER_CREDENTIALS } from '../common/configuration/constants/Paths';

const API_URL = 'http://localhost:8090/api/surgery_records';

class SurgeryRecordService {
    static async createSurgeryRecord(healthPassportId, surgeryRecordDto) {
        try {
            const response = await axiosPrivate.post(`${API_URL}/${healthPassportId}`, surgeryRecordDto,
                HEADER_CREDENTIALS
            );
            return response.data;
        } catch (error) {
            console.error('Error creating surgery record:', error);
            throw error;
        }
    }

    static async updateSurgeryRecord(id, surgeryRecordDto) {
        try {
            const response = await axiosPrivate.put(`${API_URL}/${id}`, surgeryRecordDto,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating surgery record:', error);
            throw error;
        }
    }

    static async deleteSurgeryRecord(id) {
        try {
            await axiosPrivate.delete(`${API_URL}/${id}`,
                HEADER_CREDENTIALS
            );
        } catch (error) {
            console.error('Error deleting surgery record:', error);
            throw error;
        }
    }

    static async getAllSurgeryRecordsByHealthPassportId(healthPassportId) {
        try {
            const response = await axiosPrivate.get(`${API_URL}/health_passport/${healthPassportId}`,
                HEADER_CREDENTIALS
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching surgery records by health passport ID:', error);
            throw error;
        }
    }

    static async getAllSurgeryRecordsByHealthPassportIdSortedByDateDesc(healthPassportId) {
        try {
            const response = await axiosPrivate.get(`${API_URL}/health_passport/${healthPassportId}/sorted`,
                HEADER_CREDENTIALS
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching sorted surgery records:', error);
            throw error;
        }
    }

    static async getAllSurgeryRecordsByHealthPassportIdAndSurgeryType(healthPassportId, surgeryType) {
        try {
            const response = await axiosPrivate.get(`${API_URL}/health_passport/${healthPassportId}/search`, {
                params: { surgeryType }
            },
            HEADER_CREDENTIALS);
            return response.data;
        } catch (error) {
            console.error('Error fetching filtered surgery records:', error);
            throw error;
        }
    }
}

export default SurgeryRecordService;

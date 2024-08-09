import axios from 'axios';
import { axiosPrivate } from '../common/configuration/ApiAuth';
import { HEADER_CREDENTIALS } from '../common/configuration/constants/Paths';

const API_URL = 'http://localhost:8090/api/vaccine_records';

class VaccineRecordService {
    static async createVaccineRecord(healthPassportId, vaccineRecordDto) {
        try {
            const response = await axiosPrivate.post(`${API_URL}/health_passport/${healthPassportId}`, vaccineRecordDto,
                HEADER_CREDENTIALS
            );
            return response.data;
        } catch (error) {
            console.error('Error creating vaccine record:', error);
            throw error;
        }
    }

    static async updateVaccineRecord(id, vaccineRecordDto) {
        try {
            const response = await axiosPrivate.put(`${API_URL}/${id}`, vaccineRecordDto,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating vaccine record:', error);
            throw error;
        }
    }

    static async deleteVaccineRecord(id) {
        try {
            await axiosPrivate.delete(`${API_URL}/${id}`,
                HEADER_CREDENTIALS
            );
        } catch (error) {
            console.error('Error deleting vaccine record:', error);
            throw error;
        }
    }

    static async getVaccineRecordById(id) {
        try {
            const response = await axiosPrivate.get(`${API_URL}/${id}`,
                HEADER_CREDENTIALS
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching vaccine record:', error);
            throw error;
        }
    }

    static async getAllVaccineRecordsByHealthPassportId(healthPassportId,

    ) {
        try {
            const response = await axiosPrivate.get(`${API_URL}/health_passport/${healthPassportId}`,
                HEADER_CREDENTIALS
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching vaccine records by health passport ID:', error);
            throw error;
        }
    }


    static async getAllVaccineRecordsByHealthPassportIdSortedByDateDesc(healthPassportId) {
        try {
            const response = await axiosPrivate.get(`${API_URL}/health_passport/${healthPassportId}/sorted`,
                HEADER_CREDENTIALS
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching sorted vaccine records:', error);
            throw error;
        }
    }


    static async getAllVaccineRecordsByHealthPassportIdAndVaccineName(healthPassportId, vaccineName) {
        try {
            const response = await axiosPrivate.get(`${API_URL}/health_passport/${healthPassportId}/search`, {
                params: { vaccineName },

            },
            HEADER_CREDENTIALS
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching filtered vaccine records:', error);
            throw error;
        }
    }
}

export default VaccineRecordService;

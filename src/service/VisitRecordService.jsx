import axios from 'axios';
import { axiosPrivate } from '../common/configuration/ApiAuth';

const API_URL = 'http://localhost:8090/api/visit_records';

class VisitRecordService {
    static async createVisitRecord(healthPassportId, visitRecordDto) {
        console.log(healthPassportId
        )
        try {
            const response = await axiosPrivate.post(`${API_URL}/${healthPassportId}`, visitRecordDto);
            return response.data;
        } catch (error) {
            console.error('Error creating visit record:', error);
            throw error;
        }
    }

    static async updateVisitRecord(id, visitRecordDto) {
        try {
            const response = await axiosPrivate.put(`${API_URL}/${id}`, visitRecordDto,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating visit record:', error);
            throw error;
        }
    }

    static async deleteVisitRecord(id) {
        try {
            await axiosPrivate.delete(`${API_URL}/${id}`);
        } catch (error) {
            console.error('Error deleting visit record:', error);
            throw error;
        }
    }

    static async getAllVisitRecordsByHealthPassportId(healthPassportId) {
        try {
            const response = await axiosPrivate.get(`${API_URL}/health_passport/${healthPassportId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching visit records by health passport ID:', error);
            throw error;
        }
    }

    static async getAllVisitRecordsByHealthPassportIdSortedByDateDesc(healthPassportId) {
        try {
            const response = await axiosPrivate.get(`${API_URL}/health_passport/${healthPassportId}/sorted`);
            return response.data;
        } catch (error) {
            console.error('Error fetching sorted visit records:', error);
            throw error;
        }
    }

    static async getAllVisitRecordsByHealthPassportIdAndVisitType(healthPassportId, visitType) {
        try {
            const response = await axiosPrivate.get(`${API_URL}/health_passport/${healthPassportId}/search`, {
                params: { visitType }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching filtered visit records:', error);
            throw error;
        }
    }
}

export default VisitRecordService;

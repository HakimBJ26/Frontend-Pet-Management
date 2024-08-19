import { axiosPrivate } from '../common/configuration/ApiAuth';
import { HEADER_CREDENTIALS } from '../common/configuration/constants/Paths';
import { VISIT_RECORD_API } from '../common/configuration/constants/PathBack';

class VisitRecordService {
    static async createVisitRecord(healthPassportId, visitRecordDto) {
        try {
            const response = await axiosPrivate.post(`${VISIT_RECORD_API}/${healthPassportId}`, visitRecordDto, HEADER_CREDENTIALS);
            return response.data;
        } catch (error) {
            console.error('Error creating visit record:', error);
            throw error;
        }
    }

    static async updateVisitRecord(id, visitRecordDto) {
        try {
            const response = await axiosPrivate.put(`${VISIT_RECORD_API}/${id}`, visitRecordDto,
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
            await axiosPrivate.delete(`${VISIT_RECORD_API}/${id}`, HEADER_CREDENTIALS);
        } catch (error) {
            console.error('Error deleting visit record:', error);
            throw error;
        }
    }

    static async getAllVisitRecordsByHealthPassportId(healthPassportId) {
        try {
            const response = await axiosPrivate.get(`${VISIT_RECORD_API}/health_passport/${healthPassportId}`, HEADER_CREDENTIALS);
            return response.data;
        } catch (error) {
            console.error('Error fetching visit records by health passport ID:', error);
            throw error;
        }
    }

    static async getAllVisitRecordsByHealthPassportIdSortedByDateDesc(healthPassportId) {
        try {
            const response = await axiosPrivate.get(`${VISIT_RECORD_API}/health_passport/${healthPassportId}/sorted`, HEADER_CREDENTIALS);
            return response.data;
        } catch (error) {
            console.error('Error fetching sorted visit records:', error);
            throw error;
        }
    }

    static async getAllVisitRecordsByHealthPassportIdAndVisitType(healthPassportId, visitType) {
        try {
            const response = await axiosPrivate.get(`${VISIT_RECORD_API}/health_passport/${healthPassportId}/search`, {
                params: { visitType }, HEADER_CREDENTIALS
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching filtered visit records:', error);
            throw error;
        }
    }
}

export default VisitRecordService;

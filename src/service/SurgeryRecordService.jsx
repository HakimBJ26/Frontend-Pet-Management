import { axiosPrivate } from '../common/configuration/ApiAuth';
import { HEADER_CREDENTIALS } from '../common/configuration/constants/Paths';
import { SURGERY_RECORD_API } from '../common/configuration/constants/PathBack';

class SurgeryRecordService {
    static async createSurgeryRecord(healthPassportId, surgeryRecordDto) {
        try {
            const response = await axiosPrivate.post(`${SURGERY_RECORD_API}/${healthPassportId}`, surgeryRecordDto,
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
            const response = await axiosPrivate.put(`${SURGERY_RECORD_API}/${id}`, surgeryRecordDto,
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
            await axiosPrivate.delete(`${SURGERY_RECORD_API}/${id}`,
                HEADER_CREDENTIALS
            );
        } catch (error) {
            console.error('Error deleting surgery record:', error);
            throw error;
        }
    }

    static async getAllSurgeryRecordsByHealthPassportId(healthPassportId) {
        try {
            const response = await axiosPrivate.get(`${SURGERY_RECORD_API}/health_passport/${healthPassportId}`,
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
            const response = await axiosPrivate.get(`${SURGERY_RECORD_API}/health_passport/${healthPassportId}/sorted`,
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
            const response = await axiosPrivate.get(`${SURGERY_RECORD_API}/health_passport/${healthPassportId}/search`, {
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

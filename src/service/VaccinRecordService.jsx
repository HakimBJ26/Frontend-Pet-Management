import { axiosPrivate } from '../common/configuration/ApiAuth';
import { HEADER_CREDENTIALS } from '../common/configuration/constants/Paths';
import { VACCINE_RECORD_API } from '../common/configuration/constants/PathBack';


class VaccineRecordService {
    static async createVaccineRecord(healthPassportId, vaccineRecordDto) {
        try {
            const response = await axiosPrivate.post(`${VACCINE_RECORD_API}/health_passport/${healthPassportId}`, vaccineRecordDto,
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
            const response = await axiosPrivate.put(`${VACCINE_RECORD_API}/${id}`, vaccineRecordDto,
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
            await axiosPrivate.delete(`${VACCINE_RECORD_API}/${id}`,
                HEADER_CREDENTIALS
            );
        } catch (error) {
            console.error('Error deleting vaccine record:', error);
            throw error;
        }
    }

    static async getVaccineRecordById(id) {
        try {
            const response = await axiosPrivate.get(`${VACCINE_RECORD_API}/${id}`,
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
            const response = await axiosPrivate.get(`${VACCINE_RECORD_API}/health_passport/${healthPassportId}`,
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
            const response = await axiosPrivate.get(`${VACCINE_RECORD_API}/health_passport/${healthPassportId}/sorted`,
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
            const response = await axiosPrivate.get(`${VACCINE_RECORD_API}/health_passport/${healthPassportId}/search`, {
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

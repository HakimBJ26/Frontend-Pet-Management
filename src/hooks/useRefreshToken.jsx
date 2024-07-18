import useAuth from "./useAuth";
import { axiosInstance } from '../common/configuration/ApiAuth';

const useRefreshToken = () => {
    const { setCurrentUser } = useAuth();

    const refresh = async () => {
        try {
            const response = await axiosInstance.get("/refreshToken", {
                withCredentials: true
            });
            setCurrentUser(prev => {
                return { ...prev, accessToken: response.data.accessToken };
            });
            return response.data.accessToken;
        } catch (err) {
            console.error('Refresh token failed:', err);
            throw err;
        }
    }

    return refresh;
};

export default useRefreshToken;

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://10.41.126.87:8000/api";

export const createBusiness = async (data) => {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
        throw new Error('No authentication token found');
    }

    const response = await axios.post(
        `${BASE_URL}/business/create/`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`, 
            }
        }
    );

    return response.data;
};

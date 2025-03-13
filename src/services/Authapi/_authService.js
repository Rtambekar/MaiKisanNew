import axios from 'axios';

const BASE_URL =     "http://10.41.126.87:8000/api";  


// 'http://127.0.0.1:8000/api';  original url.........

// Request OTP
export const requestOtp = async (mobileNumber) => {
  const response = await axios.post(`${BASE_URL}/auth/request-otp/`, { mobile: mobileNumber });
  return response.data;
};

// Verify OTP
export const verifyOtp = async (mobileNumber, otp) => {
    const response = await axios.post(`${BASE_URL}/auth/verify-otp/`, { mobile: mobileNumber, otp });
    return response.data;  // contains token, business flag, etc.
  };
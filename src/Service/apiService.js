import { axiosInstance } from "./axiosInstance";


const Login = (data) => {
    return axiosInstance.post("api/user/login/", data);
  };

  const getQRCodeData = () => {
    return axiosInstance.get(`api/customer/qr-code`);
  };

const apiService = {
    Login,
    getQRCodeData
}

export default apiService;
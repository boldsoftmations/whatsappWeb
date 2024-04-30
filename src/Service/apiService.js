import { axiosInstance } from "./axiosInstance";


const Login = (data) => {
    return axiosInstance.post("api/user/login/", data);
  };

  const getQRCodeData = () => {
    return axiosInstance.get(`api/customer/qr-code`);
  };

  const createCustomer = (data) => {
    return axiosInstance.post("api/whatsapp/customer-data/", data);
  };

  const createGroup = (data) => {
    return axiosInstance.post("api/whatsapp/customer-group/", data);
  };

  const getGroupData = () => {
    return axiosInstance.get(`api/whatsapp/customer-group/`);
  };
  
  const sendMessage = (data) => {
    return axiosInstance.post("api/whatsapp/customer-whatsapp/", data);
  };

  const getAllCustomerMessage = () => {
    return axiosInstance.get(`api/whatsapp/customer-whatsapp/ `);
  };

const apiService = {
    Login,
    getQRCodeData,
    createCustomer,
    createGroup,
    getGroupData,
    sendMessage,
    getAllCustomerMessage
}

export default apiService;
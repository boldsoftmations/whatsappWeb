import { axiosInstance } from "./axiosInstance";


const Login = (data) => {
    return axiosInstance.post("api/user/customer-login/", data);
  };

  const getQRCodeData = () => {
    return axiosInstance.get(`api/customer/qr-code`);
  };

  const createCustomer = (data) => {
    return axiosInstance.post("api/whatsapp/customer-data/", data);
  };

  const getCustomerData = ( searchValue) => {
    const params = new URLSearchParams();
  
    if (searchValue) {
      params.append("search", searchValue);
    }
    return axiosInstance.get(`api/whatsapp/customer-data/?${params.toString()}`);
  };

  const updateCustomer = (id, data) => {
    return axiosInstance.patch(`api/whatsapp/customer-data/${id}/`, data);
  };
  
  const createGroup = (data) => {
    return axiosInstance.post("api/whatsapp/customer-group/", data);
  };

  const getGroupData = ( page,searchValue) => {
    const params = new URLSearchParams();
  
    if (page) {
      params.append("page", page);
    }


    if (searchValue) {
      params.append("search", searchValue);
    }
    return axiosInstance.get(`api/whatsapp/customer-group/?${params.toString()}`);
  };

  const sendMessage = (data) => {
    return axiosInstance.post("api/whatsapp/customer-whatsapp/", data);
  };
  
  const getAllCustomerMessage = (page) => {
    const params = new URLSearchParams();

    if (page) {
      params.append("page", page);
    }

    return axiosInstance.get(`api/whatsapp/customer-whatsapp/?${params.toString()}`);
  };

  const getWhatsappStatus = () => {
    return axiosInstance.get(`api/whatsapp/qr-status/ `);
  };
const apiService = {
    Login,
    getQRCodeData,
    createCustomer,
    getCustomerData,
    updateCustomer,
    createGroup,
    getGroupData,
    sendMessage,
    getAllCustomerMessage,
    getWhatsappStatus
}

export default apiService;
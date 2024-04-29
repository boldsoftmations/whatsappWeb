import React, { useState } from "react";
import { CssBaseline, Box, Toolbar, Stack } from "@mui/material";
import AccordionItem from "../components/AccordionItem";
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";
import CustomModal from "../components/CustomModal";
import SendMessage from "./SendMessage";
import AddCustomer from "./AddCustomer";
import AddGroup from "./AddGroup";
import { CustomLoader } from "../components/CustomLoader";
import apiService from "../Service/apiService";
import { useNotificationHandling } from "../components/useNotificationHandling";
import { MessageAlert } from "../components/MessageAlert";
import { users } from './../config/UsersList';

const Home = () => {
  const [modals, setModals] = useState({
    sendMessage: false,
    addCustomer: false,
    addGroup: false,
  });
  const [open, setOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } = useNotificationHandling();

  const handleModal = (modalName, isOpen) => {
    setModals(prevModals => ({ ...prevModals, [modalName]: isOpen }));
  };

  
  const fetchQRCode = async () => {
    setOpen(true); // Show loader
    try {
      const response = await apiService.getQRCodeData();
      setQrCodeUrl(response.data.qr_code);
      handleSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setOpen(false); // Hide loader
    }
  };

  return (
    <>
      <MessageAlert open={alertInfo.open} onClose={handleCloseSnackbar} severity={alertInfo.severity} message={alertInfo.message} />
      <CustomLoader open={open} />
      <CssBaseline />
      <CustomHeader />
      <Toolbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#f0f2f5", width: "100%" }}>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginBottom: 4 }}>
          <CustomButton onClick={() => handleModal("sendMessage", true)} variant="contained" sx={{ bgcolor: "#075e54", "&:hover": { bgcolor: "#075e54" }, color: "white" }}>Send Message</CustomButton>
          <CustomButton onClick={() => handleModal("addCustomer", true)} variant="contained" sx={{ bgcolor: "#075e54", "&:hover": { bgcolor: "#075e54" }, color: "white" }}>Add Customer</CustomButton>
          <CustomButton onClick={() => handleModal("addGroup", true)} variant="contained" sx={{ bgcolor: "#075e54", "&:hover": { bgcolor: "#075e54" }, color: "white" }}>Add Group</CustomButton>
          {qrCodeUrl ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <a href={qrCodeUrl} download={`QRCode-${Date.now()}.png`} style={{ textDecoration: "none" }}>
                <CustomButton variant="contained" sx={{ bgcolor: "#075e54", "&:hover": { bgcolor: "#075e54" }, color: "white" }}>
                  Download QR Code
                </CustomButton>
              </a>
            </Box>
          ) : (
            <CustomButton onClick={fetchQRCode} variant="contained" sx={{ bgcolor: "#075e54", "&:hover": { bgcolor: "#075e54" }, color: "white" }}>
              Get QR Code
            </CustomButton>
          )}
        </Stack>
        {users.map((user) => (
          <AccordionItem key={user.id} user={user} />
        ))}
      </Box>
      <CustomModal title="Send Message" openPopup={modals.sendMessage} setOpenPopup={() => handleModal("sendMessage", false)}>
        <SendMessage setOpenPopup={() => handleModal("sendMessage", false)} />
      </CustomModal>
      <CustomModal title="Add Customer" openPopup={modals.addCustomer} setOpenPopup={() => handleModal("addCustomer", false)}>
        <AddCustomer setOpenPopup={() => handleModal("addCustomer", false)} />
      </CustomModal>
      <CustomModal title="Add Group" openPopup={modals.addGroup} setOpenPopup={() => handleModal("addGroup", false)}>
        <AddGroup setOpenPopup={() => handleModal("addGroup", false)} />
      </CustomModal>
    </>
  );
};

export default Home;

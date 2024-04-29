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
      console.log("response",response)
      setQrCodeUrl(response.data.data.qr_code);
      handleSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setOpen(false); // Hide loader
    }
  };

  console.log("qrCodeUrl", qrCodeUrl);  // Debugging to check QR code URL updates

  return (
    <>
      <MessageAlert open={alertInfo.open} onClose={handleCloseSnackbar} severity={alertInfo.severity} message={alertInfo.message} />
      <CustomLoader open={open} />
      <CssBaseline />
      <CustomHeader />
      <Toolbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#f0f2f5", width: "100%" }}>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginBottom: 4 }}>
          <CustomButton sx={{ bgcolor: "#075e54", "&:hover": { bgcolor: "#075e54" }, color: "white" }} onClick={() => handleModal("sendMessage", true)} variant="contained">Send Message</CustomButton>
          <CustomButton sx={{ bgcolor: "#075e54", "&:hover": { bgcolor: "#075e54" }, color: "white" }} onClick={() => handleModal("addCustomer", true)} variant="contained">Add Customer</CustomButton>
          <CustomButton sx={{ bgcolor: "#075e54", "&:hover": { bgcolor: "#075e54" }, color: "white" }} onClick={() => handleModal("addGroup", true)} variant="contained">Add Group</CustomButton>
          {qrCodeUrl ? (
            <a href={qrCodeUrl} download={`QRCode-${Date.now()}.png`} style={{ textDecoration: "none" }}>
              <CustomButton sx={{ bgcolor: "#075e54", "&:hover": { bgcolor: "#075e54" }, color: "white" }} variant="contained">
                Download QR Code
              </CustomButton>
            </a>
          ) : (
            <CustomButton sx={{ bgcolor: "#075e54", "&:hover": { bgcolor: "#075e54" }, color: "white" }} onClick={fetchQRCode} variant="contained">
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

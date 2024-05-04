import React, { useEffect, useState, useCallback } from "react";
import { CssBaseline, Box, Toolbar, Stack } from "@mui/material";
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";
import CustomModal from "../components/CustomModal";
import SendMessage from "./SendMessage";
import { CustomLoader } from "../components/CustomLoader";
import apiService from "../Service/apiService";
import { useNotificationHandling } from "../components/useNotificationHandling";
import { MessageAlert } from "../components/MessageAlert";
import CustomAccordion from "../components/AccordionItem";
import CustomerView from "./Customer/CustomerView";
import GroupView from "./Group/GroupView";
import { CustomPagination } from "../components/CustomPagination";

const Home = () => {
  const [modals, setModals] = useState({
    sendMessage: false,
    addCustomer: false,
    addGroup: false,
    showQRCode: false,
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [customerMessage, setCustomerMessage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const handleModal = useCallback((modalName, isOpen) => {
    setModals((prevModals) => ({ ...prevModals, [modalName]: isOpen }));
  }, []);

  const fetchCustomerMessages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.getAllCustomerMessage(currentPage);
      setCustomerMessage(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 25));
      console.info("Fetched customer messages:", response.data);
    } catch (error) {
      console.error("Error fetching customer messages", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]); // Dependencies include any values from the component scope that change over time and are used in the function

  useEffect(() => {
    fetchCustomerMessages();
  }, [fetchCustomerMessages]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const fetchQRCode = async () => {
    setOpen(true);
    try {
      const response = await apiService.getQRCodeData();
      if (response.data.data.qr_code) {
        setQrCodeUrl(response.data.data.qr_code);
      }
      handleSuccess(response.data.message);
      handleModal("showQRCode", true);
      setOpen(false);
    } catch (error) {
      console.log("error", error);
      handleError(error);
      setOpen(false);
    }
  };

  const fetchWhatsappStatus = useCallback(async () => {
    setLoading(true); // Activate the loader for WhatsApp status check.
    const checkStatus = async () => {
      try {
        const response = await apiService.getWhatsappStatus();
        handleSuccess(response.data);
        if (response.data.status !== "authenticated") {
          setTimeout(checkStatus, 3000); // Keep checking every 3 seconds
        } else {
          handleModal("showQRCode", false); // Close the QR code modal on success
          setLoading(false); // Deactivate the loader
        }
      } catch (error) {
        handleError(error);
        setLoading(false); // Deactivate the loader on error
      }
    };
    checkStatus();
  }, [handleError, handleSuccess, handleModal]);

  return (
    <>
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />
      <CustomLoader open={open} />
      <CssBaseline />
      <CustomHeader />
      <Toolbar />
      <Box
        component="main"
        className="main-content" // Applying the new CSS class
        // sx={{ flexGrow: 1, p: 3, backgroundColor: "#f0f2f5" }}
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ marginBottom: 4 }}
        >
          <CustomButton
            sx={{
              bgcolor: "#075e54",
              "&:hover": { bgcolor: "#075e54" },
              color: "white",
            }}
            onClick={() => handleModal("sendMessage", true)}
            variant="contained"
          >
            Send Message
          </CustomButton>
          <CustomButton
            sx={{
              bgcolor: "#075e54",
              "&:hover": { bgcolor: "#075e54" },
              color: "white",
            }}
            onClick={() => handleModal("addCustomer", true)}
            variant="contained"
          >
            Customer
          </CustomButton>
          <CustomButton
            sx={{
              bgcolor: "#075e54",
              "&:hover": { bgcolor: "#075e54" },
              color: "white",
            }}
            onClick={() => handleModal("addGroup", true)}
            variant="contained"
          >
           Group
          </CustomButton>
          <CustomButton
            sx={{
              bgcolor: "#075e54",
              "&:hover": { bgcolor: "#075e54" },
              color: "white",
            }}
            onClick={fetchQRCode}
            variant="contained"
          >
            Get QR Code
          </CustomButton>
        </Stack>
        {customerMessage.map((message) => (
          <CustomAccordion key={message.id} message={message} />
        ))}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </Box>
      </Box>
      <CustomModal
        title="Send Message"
        openPopup={modals.sendMessage}
        setOpenPopup={() => handleModal("sendMessage", false)}
      >
        <SendMessage
          setOpenPopup={() => handleModal("sendMessage", false)}
          fetchCustomerMessages={fetchCustomerMessages}
          page={currentPage}
        />
      </CustomModal>
      <CustomModal
        fullScreen={"fullScreen"}
        title="Customer"
        openPopup={modals.addCustomer}
        setOpenPopup={() => handleModal("addCustomer", false)}
      >
        <CustomerView />
      </CustomModal>
      <CustomModal
        fullScreen={"fullScreen"}
        title="Group"
        openPopup={modals.addGroup}
        setOpenPopup={() => handleModal("addGroup", false)}
      >
        <GroupView />
      </CustomModal>
      <CustomModal
        title="QR Code"
        openPopup={modals.showQRCode}
        setOpenPopup={() => handleModal("showQRCode", false)}
      >
        <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
          <CustomLoader open={loading} />
          <img
            src={qrCodeUrl}
            alt="QR Code"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
        <CustomButton
          sx={{
            width: "100%",
            bgcolor: "#075e54",
            "&:hover": { bgcolor: "#075e54" },
            color: "white",
          }}
          onClick={fetchWhatsappStatus}
          variant="contained"
        >
          Submit
        </CustomButton>
      </CustomModal>
    </>
  );
};

export default Home;

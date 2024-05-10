import React, { useEffect, useState, useCallback } from "react";
import { CssBaseline, Box, Toolbar, Stack, Typography } from "@mui/material";
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
  const [status, setStatus] = useState(null);
  const [contact, setContact] = useState(null);
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const WhatsappLogout = async () => {
    setOpen(true);
    try {
      const response = await apiService.WhatsappLogout();
      handleSuccess(response.data);
      setStatus(null);
      setContact(null);
    } catch (error) {
      console.log("error fetch", error);
      handleError(error);
    } finally {
      setOpen(false); // Ensure setOpen is called in finally to close the loader no matter what
    }
  };

  const fetchQRCode = useCallback(async () => {
    setOpen(true);
    try {
      const response = await apiService.getQRCodeData();
      if (response.data.status === "authenticated") {
        setStatus(response.data.status);
      }

      if (response.data.data && response.data.data.qr_code) {
        setQrCodeUrl(response.data.data.qr_code);
        handleModal("showQRCode", true);
      }
      handleSuccess(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setOpen(false);
    }
  }, [handleError, handleSuccess, handleModal]);

  const fetchWhatsappStatus = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.getWhatsappStatus();
      if (
        response.data.status !== "authenticated" &&
        response.data.status !== "standby" &&
        response.data.status !== "initialize" &&
        response.data.status !== "qr"
      ) {
        setTimeout(fetchWhatsappStatus, 3000);
      } else {
        setStatus(response.data.status);
        setContact(response.data.number);
        handleSuccess(response.data);
        if (response.data.status === "authenticated") {
          handleModal("showQRCode", false);
        }
        setLoading(false);
      }
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  }, [handleError, handleSuccess, handleModal]);

  useEffect(() => {
    fetchCustomerMessages();
    fetchWhatsappStatus();
  }, [fetchCustomerMessages, fetchWhatsappStatus]);

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
          {contact && (
            <Typography
              variant="body1"
              sx={{
                margin: "20px auto",
                textAlign: "center",
                fontWeight: "bold", // Keep the text bold
              }}
            >
              Whatsapp Logged in as: {contact}
            </Typography>
          )}

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
          {/* {status === "authenticated" ? (
            <CustomButton
              sx={{
                bgcolor: "#075e54",
                "&:hover": { bgcolor: "#075e54" },
                color: "white",
              }}
              onClick={WhatsappLogout}
              variant="contained"
            >
              Logout
            </CustomButton>
          ) : (
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
          )} */}
        </Stack>

        {customerMessage.map((message) => (
          <CustomAccordion key={message.id} message={message} />
        ))}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
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
        maxWidth={"lg"}
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
        <Typography
          variant="body1"
          sx={{ margin: "20px auto", textAlign: "center" }}
        >
          Please scan the QR Code before submitting.
        </Typography>
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

import React, { useEffect, useState, useCallback } from "react";
import { CssBaseline, Box, Toolbar, Stack, Pagination } from "@mui/material";
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
import CustomAccordion from "../components/AccordionItem";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // const websocketRef = useRef(null);
  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

    const handleModal = useCallback((modalName, isOpen) => {
      setModals((prevModals) => ({ ...prevModals, [modalName]: isOpen }));
    }, []);
  

  useEffect(() => {
    fetchCustomerMessages(page);
  }, [page]);

  // const connectWebSocket = () => {
  //   // Ensure the WebSocket connection closes before opening a new one
  //   if (websocketRef.current) {
  //     websocketRef.current.close();
  //   }

  //   // Replace 'yourserver.com/path' with your actual WebSocket server URL
  //   websocketRef.current = new WebSocket(
  //     "ws://crmbackend-glutape-staging.herokuapp.com/ws/custom_qr_login/"
  //   );

  //   websocketRef.current.onopen = () => {
  //     console.log("WebSocket connected.");
  //     // Send additional data to the server after the connection is established
  //     websocketRef.current.send(JSON.stringify({ type: "status" }));
  //   };

  //   websocketRef.current.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     if (data.scanned) {
  //       console.log("QR Code has been scanned");
  //       handleSuccess("QR Code has been scanned");
  //       fetchQRCode(); // Fetch QR code or perform any other action as needed
  //     }
  //   };

  //   websocketRef.current.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //     handleError("WebSocket error:", error);
  //   };

  //   websocketRef.current.onclose = () => {
  //     console.log("WebSocket disconnected. Attempting to reconnect...");
  //     // Attempt to reconnect every 5 seconds
  //     setTimeout(connectWebSocket, 5000);
  //   };
  // };

  const fetchCustomerMessages = async (page) => {
    setOpen(true);
    try {
      const response = await apiService.getAllCustomerMessage(page);
      setCustomerMessage(response.data.results);
      setTotalPages(
        Math.ceil(response.data.count / response.data.results.length)
      );
      console.info("Fetched customer messages:", response.data);
    } catch (error) {
      console.error("Error fetching customer messages", error);
    } finally {
      setOpen(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const fetchQRCode = async () => {
    setOpen(true);
    try {
      const response = await apiService.getQRCodeData();
      if(response.data.data.qr_code){
      setQrCodeUrl(response.data.data.qr_code);
      }
      handleSuccess(response.data.message);
      handleModal("showQRCode", true);
      // connectWebSocket();
      setOpen(false);
    } catch (error) {
      console.log("error",error)
      handleError(error);
      setOpen(false);
    } 
  };

  const fetchWhatsappStatus = useCallback(async () => {
    setLoading(true); // Activate the loader for WhatsApp status check.
    const checkStatus = async () => {
      try {
        const response = await apiService.getWhatsappStatus();
        handleSuccess(response.data.status);
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

  console.log("qrCodeUrl", qrCodeUrl);

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
        sx={{ flexGrow: 1, p: 3, width: "100%", backgroundColor: "#f0f2f5" }}
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
            Add Customer
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
            Add Group
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
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
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
          page={page}
        />
      </CustomModal>
      <CustomModal
        title="Add Customer"
        openPopup={modals.addCustomer}
        setOpenPopup={() => handleModal("addCustomer", false)}
      >
        <AddCustomer setOpenPopup={() => handleModal("addCustomer", false)} />
      </CustomModal>
      <CustomModal
        title="Add Group"
        openPopup={modals.addGroup}
        setOpenPopup={() => handleModal("addGroup", false)}
      >
        <AddGroup setOpenPopup={() => handleModal("addGroup", false)} />
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

import { useState, useCallback } from "react";

export const useNotificationHandling = () => {
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const updateAlertInfo = useCallback((message, severity) => {
    setAlertInfo({
      open: true,
      message: message || "An unexpected event occurred",
      severity,
    });
  }, []);

  const handleSuccess = useCallback(
    (response) => {
      // Directly create a message from response object
      const message = response.message || "Operation successful";
      const status = response.status ? ` (Status: ${response.status})` : '';
      updateAlertInfo(`${message}${status}`, "success");
    },
    [updateAlertInfo]
  );

  const handleError = useCallback(
    (error) => {
      let message = "";  // Start with an empty message
  
      // Check for error responses from APIs
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'object' && errorData !== null) {
          // Use provided message if available, else leave the message empty
          message = errorData.message || "";
          if (errorData.status) {
            message += ` (Error Status: ${errorData.status})`; // Append status if available
          }
        }
      } else if (error instanceof Error) {
        // Handle JavaScript Error objects
        message = error.message;  // Use message from Error object
      } else if (typeof error === 'string') {
        // Handle simple string errors
        message = error;
      }
  
      // If after all checks the message is still empty, use a generic error message
      if (!message) {
        message = "Error occurred";  // Generic fallback message
      }
  
      // Call function to update UI or alert the user
      updateAlertInfo(message, "error");
    },
    [updateAlertInfo]
  );
  
  const handleCloseSnackbar = useCallback(() => {
    setAlertInfo((prev) => ({ ...prev, open: false }));
  }, []);

  return {
    alertInfo,
    handleSuccess,
    handleError,
    handleCloseSnackbar,
  };
};

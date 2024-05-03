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
      let message = "An unexpected error occurred";
      // Check if it's a direct error or an API response error
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        message = errorData.message || message;  // Use error message if available
        const status = errorData.status ? ` (Error Status: ${errorData.status})` : '';
        message = `${message}${status}`;
      } else if (typeof error === 'string') {
        message = error;  // Handle simple string errors
      }
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

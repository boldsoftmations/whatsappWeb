import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { CustomLoader } from "../components/CustomLoader";
import apiService from "../Service/apiService";
import { MessageAlert } from "../components/MessageAlert";
import { useNotificationHandling } from "../components/useNotificationHandling";

const SendMessage = ({ setOpenPopup, refreshData }) => {
  const [whatsappGroup, setWhatsappGroup] = useState([]);
  const [open, setOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isPdf, setIsPdf] = useState(false);
  const [filter, setFilter] = useState("message");
  const [errorMessage, setErrorMessage] = useState("");
  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  // Updated handleFileChange function
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    // Reset error message each time a file is selected
    setErrorMessage("");
    if (file.type.startsWith("video/") && file.size > 15728640) {
      setErrorMessage("Error: Video size must be less than or equal to 15MB.");
      setUploadedFile(null);
      setFilePreview(null);
      return;
    }

    setUploadedFile(file);
    setIsPdf(file.type === "application/pdf" || file.type.startsWith("video/"));

    if (
      file &&
      (file.type.startsWith("image/") ||
        file.type === "application/pdf" ||
        file.type.startsWith("video/"))
    ) {
      try {
        const fileURL = URL.createObjectURL(file);
        setFilePreview(fileURL);
      } catch (error) {
        console.error("Error converting file to base64", error);
      }
    } else {
      setFilePreview(null);
    }
  };

  // Effect for cleanup
  useEffect(() => {
    // Cleanup the object URL on unmount or when file changes
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const createWhatsappGroup = async (e) => {
    e.preventDefault();
    setOpen(true);

    try {
      const formData = new FormData();

      // Append each group ID as an individual entry to formData
      // formData.append("groups", JSON.stringify(selectedGroupIds.join(", ")));

      // Handle the file upload and associated data
      if (uploadedFile) {
        const fileKey = "file";
        const fileName = uploadedFile.name;
        formData.append(fileKey, uploadedFile);
        formData.append("filename", fileName);
        formData.append("caption", whatsappGroup.caption || "");
      } else {
        // For text-only messages
        formData.append("message", whatsappGroup.message || "");
      }

      // Select the appropriate API call
      const response = await apiService.sendMessage(formData);
      handleSuccess(response.data.message);
      setOpenPopup(false);
      await refreshData();
    } catch (error) {
      handleError(error);
      console.error("Error creating WhatsApp group", error);
    } finally {
      setOpen(false);
    }
  };

  const renderInputFields = () => {
    switch (filter) {
      case "message":
        return (
          <CustomTextField
            fullWidth
            multiline
            name="message"
            size="small"
            label="Message"
            variant="outlined"
            value={whatsappGroup["message"] || ""}
            onChange={(event) =>
              setWhatsappGroup({
                ...whatsappGroup,
                [event.target.name]: event.target.value,
              })
            }
          />
        );
      case "image":
      case "pdf":
      case "video":
        return (
          <>
            <CustomButton
              variant="contained"
              component="label"
              size="small"
              sx={{ mt: 1, mb: 2 }}
            >
              Upload File
              <input type="file" hidden onChange={handleFileChange} />
            </CustomButton>
            {errorMessage && (
              <Typography color="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Typography>
            )}
            {uploadedFile && (
              <Box sx={{ mt: 2, mb: 2 }}>
                {isPdf || filter === "pdf" ? (
                  <Typography variant="subtitle1">
                    {uploadedFile.name}
                  </Typography>
                ) : (
                  filePreview && (
                    <img
                      src={filePreview}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  )
                )}
              </Box>
            )}
            <CustomTextField
              fullWidth
              multiline
              name="caption"
              size="small"
              label="Caption"
              variant="outlined"
              value={whatsappGroup["caption"] || ""}
              onChange={(event) =>
                setWhatsappGroup({
                  ...whatsappGroup,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />
      <CustomLoader open={open} />
      <Box component="form" noValidate onSubmit={(e) => createWhatsappGroup(e)}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Type</FormLabel>
          <RadioGroup
            row
            aria-label="type"
            name="type"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <FormControlLabel
              value="message"
              control={<Radio />}
              label="Message"
            />
            <FormControlLabel value="image" control={<Radio />} label="Image" />
            <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
            <FormControlLabel value="video" control={<Radio />} label="Video" />
          </RadioGroup>
        </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {renderInputFields()}
          </Grid>
        </Grid>
        <CustomButton
          fullWidth
          type="submit"
          size="small"
          variant="contained"
          sx={{
            width: "100%",
            mt: 3,
            bgcolor: "#075e54",
            "&:hover": { bgcolor: "#075e54" },
            color: "white",
          }}
        >
          Submit
        </CustomButton>
      </Box>
    </>
  );
};

export default SendMessage;

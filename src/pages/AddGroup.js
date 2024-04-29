import React, { useCallback, useState } from "react";
import { Box, Grid } from "@mui/material";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { CustomLoader } from "../components/CustomLoader";
import { useNotificationHandling } from "../components/useNotificationHandling";
import { MessageAlert } from "../components/MessageAlert";
import apiService from "../Service/apiService";

const AddGroup = ({setOpenPopup}) => {
    const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState('');  // Simplified state handling for a single field
    const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } = useNotificationHandling();

    const handleInputChange = useCallback((event) => {
      setGroupName(event.target.value);  // Directly handle the input change
    }, []);

    const addGroup = async (e) => {
      e.preventDefault();
      setOpen(true);
      const payload = {
        name: groupName,
      };
      try {
        const response = await apiService.createGroup(payload);
        handleSuccess(response.data.message);
        setGroupName('');  // Reset the input field after successful submission
        setOpenPopup(false)
      } catch (error) {
        handleError(error);
        console.error("error", error);
      } finally {
        setOpen(false);
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
        <Box component="form" noValidate onSubmit={addGroup}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                name="name"
                size="small"
                label="Group Name"
                variant="outlined"
                value={groupName}  // Controlled component
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <CustomButton
            fullWidth
            type="submit"
            size="small"
            variant="contained"
            sx={{ width: "100%", mt: 3,bgcolor: "#075e54", "&:hover": { bgcolor: "#075e54" }, color: "white" }}
          >
            Submit
          </CustomButton>
        </Box>
      </>
    );
};

export default AddGroup;

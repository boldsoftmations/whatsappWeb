import React, { useCallback, useState } from "react";
import { Box, Chip, Grid, TextField, Autocomplete } from "@mui/material";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton";
import { CustomLoader } from "../../components/CustomLoader";
import { useNotificationHandling } from "../../components/useNotificationHandling";
import { MessageAlert } from "../../components/MessageAlert";
import apiService from "../../Service/apiService";

const CustomerCreate = ({setOpenPopup,getCustomersData,groupOptions}) => {
  const [open, setOpen] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "",
    number: "",
    groups: [],
  });
  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleGroupChange = (event, newValue) => {
    setCustomerData((prev) => ({ ...prev, groups: newValue }));
  };

  const addCustomer = async (e) => {
    e.preventDefault();
    setOpen(true);
    const payload = {
      number: customerData.number,
      groups: customerData.groups.map((group) => group.name), // Ensure each group has an 'id' property
      name: customerData.name,
    };
    try {
      const response = await apiService.createCustomer(payload);
      handleSuccess(response.data);
      getCustomersData()
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
      <Box component="form" noValidate onSubmit={addCustomer}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              name="name"
              size="small"
              label="Name"
              variant="outlined"
              onChange={handleInputChange}
              value={customerData.name}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              name="number"
              size="small"
              label="Contact"
              variant="outlined"
              onChange={handleInputChange}
              value={customerData.number}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="group-select"
              options={groupOptions}
              getOptionLabel={(option) => option.name} // Assuming option objects have a 'name' property
              value={customerData.groups}
              onChange={handleGroupChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Groups" placeholder="Select groups" />
              )}
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

export default CustomerCreate;

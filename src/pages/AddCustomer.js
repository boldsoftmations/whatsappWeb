import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { CustomLoader } from "../components/CustomLoader";

const AddCustomer = () => {
    const [open,setOpen]=useState(false);

  const addCustomer = async (e) => {
    e.preventDefault();
    try {
        setOpen(true)
    } catch (error) {
        console.log("error",error)
    } finally {
        setOpen(false)
    }
  };

  return (
    <>
      <CustomLoader open={open} />
      <Box component="form" noValidate onSubmit={(e) => addCustomer(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              multiline
              name="name"
              size="small"
              label="Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              multiline
              name="contact"
              size="small"
              label="Contact"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <CustomButton
          fullWidth
          type="submit"
          size="small"
          variant="contained"
          sx={{ width:"100%",mt: 3, }}
        >
          Submit
        </CustomButton>
      </Box>
    </>
  );
};

export default AddCustomer;

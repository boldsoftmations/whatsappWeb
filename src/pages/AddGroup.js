import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { CustomLoader } from "../components/CustomLoader";

const AddGroup = () => {
    const [open,setOpen]=useState(false);

  const addGroup = async (e) => {
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
      <Box component="form" noValidate onSubmit={(e) => addGroup(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              multiline
              name="name"
              size="small"
              label="Group Name"
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

export default AddGroup;

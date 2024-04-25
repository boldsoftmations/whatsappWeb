import React, { useState, useCallback } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import whatsappSVG from "../Images/whatsappSVG.svg";
import CustomButton from '../components/CustomButton';
import CustomTextField from "../components/CustomTextField";

function LoginForm() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("screen");
    console.log("Submitted", inputs);
    navigate("/home", { replace: true });
  };

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }, []);


  return (
    <Grid container sx={{ height: '100vh', width: '100%' }}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            height: '100%',
          }}
        >
          <img src={whatsappSVG} alt="WhatsApp" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
        <Card sx={{ margin: 4, padding: 4, width: '100%', maxWidth: '400px' }}>
          <Typography variant="h5" gutterBottom>
            BoldSoftmation LLP
          </Typography>
          <Box component="form" noValidate onSubmit={(e) => handleSubmit(e)}>
            <CustomTextField
              label="Username"
              name="username"
              type="text"
              value={inputs.username || ""}
              onChange={handleChange}
            />
            <CustomTextField
              label="Password"
              name="password"
              type="password"
              value={inputs.password || ""}
              onChange={handleChange}
            />
            <CustomButton onClick={handleSubmit} sx={{ width: '100%' }}>
              Log In
            </CustomButton>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default LoginForm;

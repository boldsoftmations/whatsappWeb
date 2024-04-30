import React, { useState, useCallback } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import whatsappSVG from "../Images/whatsappSVG.svg";
import CustomButton from '../components/CustomButton';
import CustomTextField from "../components/CustomTextField";
import { useNotificationHandling } from './../components/useNotificationHandling';
import { MessageAlert } from './../components/MessageAlert';
import { CustomLoader } from "../components/CustomLoader";
import  apiService  from "../Service/apiService";
import { setUserData } from "../Service/TokenService";

function LoginForm() {
  const [inputs, setInputs] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();
  const [open,setOpen]= useState(false);

  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setOpen(true);
      const req = {
        email: inputs.email,
        password: inputs.password,
      };
      const response = await apiService.Login(req);
      if (response.data.token.access) {
      }
      setUserData({ access: response.data.token.access, refresh: response.data.token.refresh });
      handleSuccess("Login successfully");
      navigate("/home");

      setOpen(false);
    } catch (error) {
      handleError(error);
      console.error("Login error", error);
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
                name="email"
                type="text"
                value={inputs.email || ""}
                onChange={handleChange}
              />
              <CustomTextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"} // Toggle between text and password type
                value={inputs.password || ""}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <CustomButton
                      onClick={handleTogglePassword}
                      variant="text"
                      color="primary"
                      sx={{ cursor: 'pointer' }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </CustomButton>
                  )
                }}
              />
              <CustomButton onClick={handleSubmit} sx={{ width: '100%',bgcolor: "#075e54", "&:hover": { bgcolor: "#075e54" }, color: "white" }}>
                Log In
              </CustomButton>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default LoginForm;

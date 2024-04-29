import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PropTypes from "prop-types";

const CustomTextField = ({ label, name, type, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const renderPasswordToggle = () => {
    if (type === "password") {
      return (
        <InputAdornment position="end">
          <IconButton onClick={handleTogglePassword} edge="end">
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </InputAdornment>
      );
    }
    return null; // No password toggle for other types
  };

  return (
    <TextField
      id={name}
      name={name}
      label={label}
      type={showPassword ? "text" : type}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      InputProps={{
        endAdornment: renderPasswordToggle(),
      }}
    />
  );
};

CustomTextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CustomTextField;

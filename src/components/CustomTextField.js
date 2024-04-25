// InputLabel.js
import React from "react";
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';

const CustomTextField = ({ label, name, type, value, onChange }) => {
  return (
    <TextField
      id={name}
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
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

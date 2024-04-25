// Button.js
import React from "react";
import PropTypes from "prop-types";
import Button from '@mui/material/Button';

const CustomButton = ({ children, onClick,sx }) => {
  return (
    <Button  variant="contained" onClick={onClick} sx={sx}>
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default CustomButton;

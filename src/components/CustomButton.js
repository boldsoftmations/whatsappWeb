import React from "react";
import PropTypes from "prop-types";
import Button from '@mui/material/Button';

// Extending the component to accept more props for better styling and functionality customization
const CustomButton = ({ children, onClick, sx, color = "primary", variant = "contained", size = "medium", disabled = false, ...rest }) => {
  return (
    <Button
      onClick={onClick}
      sx={sx}
      color={color}
      variant={variant}
      size={size}
      disabled={disabled}
      {...rest} // Spread the rest of the props to allow custom attributes like `type`, `form`, etc.
    >
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  sx: PropTypes.object,
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool
};

export default CustomButton;

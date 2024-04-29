import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const CustomModal = (props) => {
  const {
    title,
    children,
    openPopup,
    setOpenPopup,
    maxWidth,
    others,
    fullScreen,
  } = props;

  return (
    <BootstrapDialog
      fullScreen={fullScreen}
      {...others}
      maxWidth={maxWidth}
      onClose={() => {
        setOpenPopup(false);
      }}
      aria-labelledby="customized-dialog-title"
      open={openPopup}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={() => {
          setOpenPopup(false);
        }}
      >
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </BootstrapDialog>
  );
};

export default CustomModal;
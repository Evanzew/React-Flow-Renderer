//Mui没有封装通用的Dialog，以下是自己封装的Dialog

import React from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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

export const EnhancedDialog = (props) => {
  const {
    title = "Title",
    visible = false,
    children,
    onOk,
    onCancel,
    okText = "Save",
    cancelText = "Cancel",
    //设置Dialog的宽度，需要配合fullWidth使用
    //属性值从小到大为: ' xs', 'sm', 'md', 'lg', 'xl'
    maxWidth = "sm",  
  } = props;

  return (
    <BootstrapDialog
      onClose={onCancel}
      aria-labelledby="customized-dialog-title"
      open={visible}
      maxWidth={maxWidth}
      fullWidth={true}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onCancel}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button autoFocus variant="contained" onClick={onOk}>
          {okText}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

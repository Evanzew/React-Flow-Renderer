import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 12,
  padding: "3px 5px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#fff",
  borderColor: "#0063cc",
  color: "#0063cc",
  borderRadius: "20px",
  transitionProperty: "transform",
  transitionDuration: "0.2",
  transitionTimingFunction: "ease",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#fff",
    borderColor: "#0062cc",
    boxShadow: "none",
    transform: "scale(1.1)",
  },
  "&:active": {
    backgroundColor: "#fff",
    borderColor: "#005cbf",
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "none",
  },
});

export default function EdgeButton(props) {
  const { label, startIcon, onClick } = props;
  return label && <BootstrapButton variant="contained" startIcon={startIcon} onClick={onClick}>{label}</BootstrapButton>;
}

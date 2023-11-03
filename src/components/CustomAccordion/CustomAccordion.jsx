import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import React from "react";

export const CustomAccordion = (props) => {
  const { title, children } = props;

  return (
    <Accordion
      sx={{
        "&.Mui-expanded": {
          borderRadius: "5px",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          "& .MuiAccordionSummary-content": {
            "&.Mui-expanded": {
              m: 0,
            },
          },
        }}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

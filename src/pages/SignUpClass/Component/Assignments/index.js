import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Assignments.scss";

const Assignments = ({ homeworks }) => {
  return (
    <div>
     {homeworks && homeworks.map((item,index)=>(
        <Accordion key={index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ fontSize: "18px" }}
        >
          <Typography>{item.name}</Typography>
        </AccordionSummary>
       {/* {item.questions && item.questions.map((q,index)=>(
          <AccordionDetails key={index}>
          <Typography sx={{padding:"0px 20px", fontSize:"18px"}}>
           {q.name}
          </Typography>
        </AccordionDetails>
       ))} */}
      </Accordion>
     ))}
    </div>
  );
};

export default Assignments;

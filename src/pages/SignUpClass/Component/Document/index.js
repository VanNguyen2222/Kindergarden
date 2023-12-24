import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormCondition from "../../../../AutoComplete/FormCondition";
import ReactHtmlParser from "react-html-parser";
import "../Assignments/Assignments.scss";
import { Link } from "@mui/material";
const Document = ({ documents, priceCourse, nameClass }) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const handleLink = () => {
    setIsOpenConfirm(true);
  };
  const handlePay = () => {
    setIsOpenConfirm(false);
  };
  const handleClose = () => {
    setIsOpenConfirm(false);
  };
  return (
    <div>
      {documents &&
        documents.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{item.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                className="text-document"
                sx={{ padding: "0px 20px", fontSize: "18px" }}
              >
                {ReactHtmlParser(item.value)}
              </Typography>
              <Link className="text-link" onClick={handleLink}>
                Read more
              </Link>
              <FormCondition
                priceCourse={priceCourse}
                nameClass={nameClass}
                open={isOpenConfirm}
                handleOke={handlePay}
                handleClose={handleClose}
              ></FormCondition>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
};

export default Document;

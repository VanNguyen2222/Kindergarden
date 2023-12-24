import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
const listMethods = ["Thanh toán chuyển khoản", "Thanh toán trực tiếp"];
const FormCondition = (props) => {
  const [payMethods, setPayMethods] = useState("");
  const { handleOke, handleClose, open, handlePay, priceCourse, nameClass } =
    props;

  payMethods && handlePay(payMethods);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Box sx={{ flexGrow: 1 }}>
            <div className="title-big" style={{ padding: "0px 20px 20px" }}>
              <h2 className="btn-font">Đăng ký lớp học</h2>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <FormControl>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{
                      fontSize: "18px",
                      fontWeight: "900",
                      marginBottom: "20px",
                    }}
                  >
                    Phương thức thanh toán
                  </FormLabel>
                  {listMethods.map((item, index) => (
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={item}
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        key={index}
                        value={index}
                        onChange={() => setPayMethods(item)}
                        control={<Radio />}
                        label={item}
                      />
                    </RadioGroup>
                  ))}
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <TableContainer
                  sx={{ width: "170px", marginTop: "20px", fontSize: "18px" }}
                  component={Paper}
                >
                  <Table aria-label="spanning table">
                    <TableRow>
                      <TableCell sx={{ fontSize: "18px" }} colSpan={1}>
                        {nameClass}
                      </TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        sx={{ fontSize: "18px", fontWeight: "900" }}
                        colSpan={1}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "18px",
                          fontWeight: "900",
                          color: "red",
                        }}
                        align="right"
                      >
                        {priceCourse} $
                      </TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className="btn-pay" onClick={handleOke} autoFocus color="error">
          thanh toán
        </Button>
        <Button style={{ display: "none" }} onClick={handleClose}></Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormCondition;

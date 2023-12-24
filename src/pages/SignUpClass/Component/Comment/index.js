import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Avatar, Button, TextField } from "@mui/material";
import "../Assignments/Assignments.scss";
const Comment = (props) => {
  const { photoURL, name } = props;
  const [comment, setComment] = useState("");
  const handleChangeInput = (e) => {
    setComment(e.target.value);
  };
  return (
      <div>
    <Box sx={{ flexGrow: 1, margin: "20px 0px" }}>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "#a7989b59",
          borderRadius: "90px",
          height: 200,
        }}
      >
        <Grid item xs={1}></Grid>

        <Grid item xs={1} sx={{ float: "right" }}>
          <Avatar
            alt={name}
            sx={{ width: "50px", height: "50px", float: "right" }}
            src={photoURL}
          />
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            fontSize: "18px",
            flexDirection: "column",
            lineHeight: "2",
            fontWeight: "700",
            padding: "30px 0px",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "800" }}>{name}</div>
          <TextField
            rows={4}
            multiline
            fullWidth
            label=""
            id="fullWidth"
            onChange={handleChangeInput}
          ></TextField>
          <Button
            disabled={comment ? false : true}
            className="btn-comment-cancel"
          >
            Cancel
          </Button>
          <Button
            disabled={comment ? false : true}
            className="btn-comment-send"
          >
            Send
          </Button>
        </Grid>
        <Grid item xs={2} sx={{ marginTop: "38px", marginLeft: "0px" }}></Grid>
      </Grid>
    </Box>
    <Box sx={{ flexGrow: 1, margin: "20px 0px" }}>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "#a7989b59",
          borderRadius: "90px",
          height: 200,
        }}
      >
        <Grid item xs={1}></Grid>

        <Grid item xs={1} sx={{ float: "right" }}>
          <Avatar
            alt={name}
            sx={{ width: "50px", height: "50px", float: "right" }}
            src={photoURL}
          />
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            fontSize: "18px",
            flexDirection: "column",
            lineHeight: "2",
            fontWeight: "700",
            padding: "30px 0px",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "800" }}>{name}</div>
          <label>Great course, enthusiastic teachers</label>
        </Grid>
        <Grid item xs={2} sx={{ marginTop: "38px", marginLeft: "0px" }}></Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default Comment;

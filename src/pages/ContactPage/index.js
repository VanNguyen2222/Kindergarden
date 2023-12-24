import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useAlert } from 'react-alert'
import React, { useContext, useEffect, useState } from "react";
import { push, ref } from "firebase/database";
import { db } from "../../firebaseConfig";
import "./ContactPage.scss";
import { AuthContext } from "../../components/AuthContext";
const mapid =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15336.2444109068!2d108.22888132745896!3d16.062318722161805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219d555c4750f%3A0x99e09cca43d34b10!2zNzMsIDEyIFbDtSBWxINuIEtp4buHdCwgU3RyZWV0LCBTxqFuIFRyw6AsIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1653013639344!5m2!1svi!2s";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const listObject = [
  "From 3 - 6 age",
  "From 7 - 14 age",
  "From 15 - 18 age",
  "Over 18 age",
];
function ContactPage(props) {
  const user = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [object, setObject] = useState("");
  const [message, setMessage] = useState("");
  const [isInput, setIsInput] = useState(false);
  const alert = useAlert();
  const handleChange = (e) => {
    setObject(e.target.value);
  };
  const dateCur = new Date();
  const getMonth = dateCur.getMonth() + 1;
  const newDate =
    dateCur.getDate() +
    "-" +
    (getMonth >= 10 ? getMonth : "0" + getMonth) +
    "-" +
    dateCur.getFullYear();
  const newTime = " " +
    dateCur.getHours() +
    ":" +
    dateCur.getSeconds();
  useEffect(() => {
    if (user) {
      setName(user.name ? user.name : "");
      setEmail(user.email ? user.email : "")
    }
  }, [user])
  const handleSubmit = (e) => {
    if (name.length === 0 ||
      email.length === 0 ||
      object.length === 0 ||
      message.length === 0) {
      e.preventDefault();
      setIsInput(true)
    } else {

      const contactsRef = ref(db, "contacts/")
      push(contactsRef, {
        name,
        email,
        object,
        message,
        isResponse: false,
        time: newDate.concat(newTime)
      })
      setIsInput(false)
      alert.success("Your contact has been sent")
    }
  };

  return (
    <Box sx={{ flexGrow: 1, m: 7 }}>
      <Grid container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={5} className="box">
          <form className="form-item" onSubmit={handleSubmit}>
            <label className="form-item-title">Contact Us</label>
            <TextField
              id="outlined-basic"
              label="Full Name"
              className="form-item-text"
              onChange={(e) => setName(e.target.value)}
              fullWidth
              value={name}
              autocomplete="none"
            />
            <TextField
              id="outlined-basic"
              label="Email"
              className="form-item-text"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              value={email}
              autocomplete="none"
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl className="form-item-text" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Choose Object
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={object}
                  label="Age"
                  onChange={handleChange}
                >
                  {listObject.map((item, index) => (
                    <MenuItem className="item-select" value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              id="outlined-basic1"
              className="form-item-text"
              onChange={(e) => setMessage(e.target.value)}
              label="Message"
              fullWidth
              multiline
              value={message}
              rows={5}
              autocomplete="none"
            />
            {isInput && <div style={{ color: "red", margin: "20px", fontSize: "18px" }}>Please enter full infomation*</div>}
            <Button type="submit" className="form-item-submit" >
              Submit
            </Button>
          </form>
        </Grid>
        <Grid item xs={5}>
          <Item style={{ marginTop: "20px" }}>
            <div id="map" style={{ width: "500px", height: "500px" }}>
              <iframe
                title={mapid}
                src={mapid}
                style={{ width: "560px", height: "500px", border: "0" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
          </Item>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Box>
  );
}

export default ContactPage;

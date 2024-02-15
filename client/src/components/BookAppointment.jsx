import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Footer from "./Footer";
import Header from "./Header";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { Paper } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Form from "react-bootstrap/Form";
import Select from "@mui/material/Select";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ReactDatePicker from "react-datepicker";

const BookAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [successText, setSuccessText] = useState("");
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     user_email: data.get("user_email"),
  //     user_password: data.get("user_password"),
  //   });
  // };

  const loggedInUser = localStorage.getItem("authenticated");

  const [app_email, setAppEmail] = useState("");
  const [app_name, setAppName] = useState("");
  const [app_phone_no, setAppPhoneNo] = useState("");
  const [app_age, setAppAge] = useState("");
  const [app_diabetic, setAppDiabetic] = useState("");
  const [app_donated, setAppDonated] = useState("N");
  const [app_camp_address, setAppCampAddress] = useState("");
  const [app_date, setAppDate] = useState("");
  const [app_time, setAppTime] = useState("");
  const [app_blood_type, setAppBloodType] = useState("");

  const navigate = useNavigate();

  // const [value, setValue] = React.useState(null);
  // const handleChange1 = (e1) => {
  //   setBloodGroup((prev) => ({ ...prev, [e1.target.value]: e1.target.value }));
  //   setCampAddress((prev) => ({ ...prev, [e1.target.innerText]: e1.target.innerText }));
  //   setTime((prev) => ({ ...prev, [e1.target.innerText]: e1.target.innerText }));
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      !app_email ||
      !app_name ||
      !app_phone_no ||
      !app_age ||
      !app_diabetic ||
      !app_donated ||
      !app_camp_address ||
      !app_date ||
      !app_time ||
      !app_blood_type
    ) {
      setWarningText("All fields are required !!");
      setTimeout(() => {
        setWarningText("");
      }, 1500);
      return;
    }

    const appointment = JSON.stringify({
      app_email: app_email,
      app_name: app_name,
      app_phone_no: app_phone_no,
      app_age: app_age,
      app_diabetic: app_diabetic,
      app_donated: app_donated,
      app_camp_address: app_camp_address,
      app_date: app_date,
      app_time: app_time,
      app_blood_type: app_blood_type,
    });

    try {
      console.log(appointment)
      const response = await fetch(
        "http://localhost:8081/api/appointments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: appointment,
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setSuccessText(data.message);
        setTimeout(() => {
          setSuccessText("");
          navigate("/userdashboard");
        }, 2000);
      } else {
        setWarningText(data.message);
        setTimeout(() => {
          setWarningText("");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!loggedInUser) {
      // Redirect
      navigate("/userlogin");
      return;
    }
  }, []);

  return (
    <>
      <Header />
      <Container
        component="main"
        maxWidth="sm"
        style={{ marginBottom: "100px", marginTop: "100px" }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={10}
          square
          style={{
            marginTop: "10px",
            borderRadius: "10px",
            height: "900px",
            maxWidth: "600px",
            marginBottom: "0px",
          }}
        >
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              font: " 25px Montserrat, sans-serif",
            }}
          >
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Book Your Donation Appointment
              </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="app_name"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      onChange={(e) => setAppName(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="app_email"
                      autoComplete="email"
                      onChange={(e) => setAppEmail(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="app_phone_no"
                      label="Phone Number"
                      type="number"
                      id="phno"
                      autoComplete="Phno"
                      onChange={(e) => setAppPhoneNo(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      required
                      fullWidth
                      name="app_age"
                      label="Age"
                      type="number"
                      id="age"
                      autoComplete="age"
                      onChange={(e) => setAppAge(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      required
                      fullWidth
                      name="app_camp_address"
                      label="Camp Location"
                      type="text"
                      id="blood_group"
                      autoComplete="blood_group"
                      onChange={(e) => setAppCampAddress(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={8}>
                    <InputLabel htmlFor="demo-simple-select">
                      Blood Type
                    </InputLabel>
                    <Select
                      fullWidth
                      id="demo-simple-select"
                      // value={app_blood_type}
                      label="Blood Type"
                      placeholder="Blood Type"
                      onChange={(e) => setAppBloodType(e.target.value)}
                    >
                      <MenuItem value="A+">A+</MenuItem>
                      <MenuItem value="A-">A-</MenuItem>
                      <MenuItem value="B+">B+</MenuItem>
                      <MenuItem value="B-">B-</MenuItem>
                      <MenuItem value="AB+">AB+</MenuItem>
                      <MenuItem value="AB">AB-</MenuItem>
                      <MenuItem value="O+">O+</MenuItem>
                      <MenuItem value="O-">O-</MenuItem>
                    </Select>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Are you Diabetic?
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Y"
                          name="app_diabetic"
                          onChange={(e) => setAppDiabetic(e.target.value)}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="N"
                          name="app_diabetic"
                          onChange={(e) => setAppDiabetic(e.target.value)}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    {/* <TextField
                        required
                        fullWidth
                        id="email"
                        label="Appointment Date"
                        name="app_date"
                        autoComplete="email"
                        onChange={(e) => setAppDate(e.target.value)}
                      /> */}
                    <InputLabel htmlFor="demo-simple-select">Date</InputLabel>
                    <TextField
                      name="someDate"
                      type="date"
                      onChange={(e) => setAppDate(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={3}></Grid>
                  <Grid item xs={6}>
                    <InputLabel htmlFor="demo-simple-select">Time</InputLabel>
                    <Select
                      fullWidth
                      id="demo-simple-select"
                      value={app_time}
                      onChange={(e) => setAppTime(e.target.value)}
                    >
                      <MenuItem value="10:00AM">10:00 AM</MenuItem>
                      <MenuItem value="2:00PM">2:00 PM</MenuItem>
                      <MenuItem value="5:00PM">5:00 PM</MenuItem>
                    </Select>
                  </Grid>
                </Grid>

                <div
                  style={{
                    display: warningText ? "block" : "none",
                    textAlign: "center",
                    marginLeft: "0px",
                    marginTop: "10px",
                    maxWidth: "710px",
                    marginBottom: "-10px",
                    fontSize: "14px",
                  }}
                  className="alert alert-warning"
                >
                  {warningText}
                </div>

                <div
                  style={{
                    display: successText ? "block" : "none",
                    textAlign: "center",
                    marginTop: "10px",
                    maxWidth: "710px",
                    marginBottom: "-10px",
                    fontSize: "14px",
                  }}
                  className="alert alert-success"
                >
                  {successText}
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClick}
                  style={{ backgroundColor: "red" }}
                >
                  Book Appointment
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Container>
      {/* <Footer /> */}
    </>
  );
};
export default BookAppointment;

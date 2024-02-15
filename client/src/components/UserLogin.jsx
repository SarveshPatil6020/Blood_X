import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Collapse } from "react-bootstrap";
import { hideAlert, showAlert } from "../Redux/alertSlice";
import AlertComponent from "../ReusableComponents/AlertComponent";
import Loader from "../ReusableComponents/Loader";

function UserLogin() {
  
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const regexExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!user_email) {
      dispatch(
        showAlert({ text: "Please enter email address !!", type: "warning" })
      );
      setTimeout(() => {
        dispatch(hideAlert());
      }, 4000);
      return;
    } else if (!regexExp.test(user_email)) {
      dispatch(
        showAlert({
          text: "Please enter valid email address !!",
          type: "warning",
        })
      );
      setTimeout(() => {
        dispatch(hideAlert());
      }, 4000);
      return;
    }
    setLoading(true);
    let res = await fetch("http://localhost:8081/send-otp", {
      method: "POST",
      headers: {
        // "X-CSRFToken": getCookie("csrftoken"),
        "Content-Type": "application/json",
        // Authorization: `${token}`,
      },
      // credentials: "include",
      body: JSON.stringify({ user_email: user_email }),
    });
    let data = await res.json();
    console.log(data);

    if (data.status === "success") {
      setLoading(false);
      dispatch(showAlert({ text: data.message, type: "success" }));
      setIsOtpSent(true);
      setTimeout(() => {
        dispatch(hideAlert());
      }, 4000);
    } else {
      setLoading(false);
      dispatch(showAlert({ text: data.message, type: "warning" }));
      setTimeout(() => {
        dispatch(hideAlert());
      }, 4000);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length != 6) {
      dispatch(
        showAlert({ text: "Please enter valid 6-digit OTP", type: "warning" })
      );
      setTimeout(() => {
        dispatch(hideAlert());
      }, 4000);
      return;
    }
    setLoading(true);
    let res = await fetch("http://localhost:8081/verify-otp", {
      method: "POST",
      headers: {
        // "X-CSRFToken": getCookie("csrftoken"),
        "Content-Type": "application/json",
        // Authorization: `${token}`,
      },
      // credentials: "include",
      body: JSON.stringify({ user_email: user_email, user_otp: otp }),
    });
    let data = await res.json();
    console.log(data);

    if (data.status === "success") {
      setLoading(false);
      dispatch(showAlert({ text: data.message, type: "success" }));
      setTimeout(() => {
        dispatch(hideAlert());
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_type", data.user_type);
        localStorage.setItem("user_name", data.user_name);
        localStorage.setItem("user_photo", data.user_photo);
        localStorage.setItem("authenticated", true);
        navigate("/userdashboard");
      }, 2000);
    } else {
      setLoading(false);
      dispatch(showAlert({ text: data.message, type: "warning" }));
      setTimeout(() => {
        dispatch(hideAlert());
      }, 4000);
    }
  };

  return (
    <>
      <Header />
      <AlertComponent />
      {loading && <Loader/>}
      {/* <ThemeProvider theme={theme}> */}
      <Grid container component="main" sx={{ marginTop: "80px" }}>
   
        <Grid item xs={3.6}></Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={10}
          square
          style={{
            marginTop: "35px",
            borderRadius: "10px",
            height: "max-content",
            color: "red",
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
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "red" }}>
              <LockOutlinedIcon />
            </Avatar>
            <hr color="red"></hr>
            <Typography
              component="h1"
              variant="h5"
              style={{ font: " 25px Montserrat, sans-serif" }}
            >
              <b>User Login</b>
            </Typography>
            <br></br>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              style={{ width: "75%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="user_email"
                autoComplete="email"
                autoFocus
                disabled={isOtpSent ? true : false}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
              {isOtpSent ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="user_password"
                  label="OTP"
                  placeholder="Enter 6 digit OTP sent on your registered Email Address"
                  type="text"
                  id="otp"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
              ) : (
                ""
              )}

              <div
                style={{
                  display: warningText ? "block" : "none",
                  textAlign: "center",
                  marginLeft: "0px",
                  marginTop: "10px",
                  maxWidth: "710px",
                  marginBottom: "-10px",
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
                }}
                className="alert alert-success"
              >
                {successText}
              </div>

              {isOtpSent ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleVerifyOtp}
                    style={{
                      width: "150px",
                      borderRadius: "15px",
                    }}
                    sx={{
                      mt: 3,
                      mb: 3,
                      p: 1,
                      bgcolor: "red",
                      font: "18px Montserrat, sans-serif",
                    }}
                  >
                    <b>Verify OTP</b>
                  </Button>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSendOtp}
                    style={{
                      width: "150px",
                      borderRadius: "15px",
                    }}
                    sx={{
                      mt: 3,
                      mb: 3,
                      p: 1,
                      bgcolor: "red",
                      font: "18px Montserrat, sans-serif",
                    }}
                  >
                    <b>Get OTP</b>
                  </Button>
                </div>
              )}

              <Grid container style={{ textAlign: "center" }}>
                {/* <Grid item xs align="left">
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item style={{ width: "100%", marginTop: "20px" }}>
                  <Link href="/usersignup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* </ThemeProvider> */}
      {/* <Footer/> */}
    </>
  );
}

export default UserLogin;

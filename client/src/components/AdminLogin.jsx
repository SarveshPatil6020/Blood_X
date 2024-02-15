import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import Footer from './Footer.jsx';
import Header from './Header.jsx';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         BloodX
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const theme = createTheme();

function AdminLogin() {
  // const login1 = () =>{
  //   Axios.post("https://localhost:8081/userlogin",{
  //     user_email: user_email,
  //     user_password: user_password,
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

  const validateForm = React.useRef();
  const [warningText, setWarningText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [admin_email, setAdminEmail] = useState("");
  const [admin_password, setAdminPassword] = useState("");
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const [loginStatus, setLoginStatus] = useState("");

const navigate = useNavigate()

    const handleClick = async (e) => {
      e.preventDefault();

      if (!admin_email || !admin_password) {
        setWarningText("All fields are required!!");
        setTimeout(() => {
          setWarningText("");
        }, 2000);
        return;
      }

      try {
        const response = await fetch("http://localhost:8081/api/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            admin_email: admin_email,
            admin_password: admin_password,
          }),
        });

        const data = await response.json();

        if (data.status === "success") {
          setSuccessText(data.message);
          localStorage.setItem("user_type", "admin");
          localStorage.setItem("user_name", data.admin_name);
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            setSuccessText("");
            navigate("/admindashboard");
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

  
  return (
    <>
      <Header />
      {/* <ThemeProvider theme={theme}> */}
      <Grid
        container
        component="main"
        sx={{ height: "100vh", marginTop: "80px" }}
      >
        {/* <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> */}
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
            height: "550px",
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
              <b>Admin Login</b>
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
                name="admin_email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setAdminEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="admin_password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                }}
              />

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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleClick}
                style={{
                  marginLeft: "140px",
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
                <b>Sign In</b>
              </Button>

              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* </ThemeProvider> */}
      <Footer />
    </>
  );
}

export default AdminLogin;
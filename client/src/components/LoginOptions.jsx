import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./Footer";
import Header from "./Header";
import bloodbg from "./bloodbg.jpg";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

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

const theme = createTheme();

function Login() {
  const navigate = useNavigate("");
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  return (
    <>
      <Header />
      {/* <ThemeProvider theme={theme}> */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={0}></Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={10}
          square
          style={{
            marginTop: "120px",
            borderRadius: "10px",
            height: "300px",
            maxWidth: "350px",
            color: "red",
            marginBottom: "0px",
            margin: "auto",
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
              <b>User</b>
            </Typography>
            <br></br>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 3,
                  p: 1,
                  bgcolor: "red",
                  font: "18px Montserrat, sans-serif",
                }}
                onClick={() =>
                  localStorage.getItem("token") &&
                  localStorage.getItem("user_type") === "donor"
                    ? navigate("/userdashboard")
                    : navigate("/userlogin")
                }
                style={{
                  display: "flex",
                  fontWeight: "700",
                  alignItems: "center",
                }}
              >
                <ArrowRightOnRectangleIcon
                  style={{
                    height: "22px",
                    width: "22px",
                    marginRight: "5px",
                    marginTop: "-5px",
                  }}
                />
                Proceed
              </Button>

              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={0}></Grid>

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={10}
          square
          style={{
            marginTop: "120px",
            borderRadius: "10px",
            height: "300px",
            maxWidth: "350px",
            color: "red",
            marginBottom: "0px",
            margin: "auto",
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
              <b>Hospital</b>
            </Typography>
            <br></br>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 3,
                  p: 1,
                  bgcolor: "red",
                  font: "18px Montserrat, sans-serif",
                }}
                onClick={() =>
                  localStorage.getItem("token") &&
                  localStorage.getItem("user_type") === "hospital"
                    ? navigate("/hospitaldashboard")
                    : navigate("/hospitallogin")
                }
                style={{
                  display: "flex",
                  fontWeight: "700",
                  alignItems: "center",
                }}
              >
                <ArrowRightOnRectangleIcon
                  style={{
                    height: "22px",
                    width: "22px",
                    marginRight: "5px",
                    marginTop: "-5px",
                  }}
                />
                Proceed
              </Button>

              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={0}></Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={10}
          square
          style={{
            marginTop: "120px",
            borderRadius: "10px",
            height: "300px",
            maxWidth: "350px",
            color: "red",
            marginBottom: "0px",
            margin: "auto",
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
              <b>Admin</b>
            </Typography>
            <br></br>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 3,
                  p: 1,
                  bgcolor: "red",
                  font: "18px Montserrat, sans-serif",
                }}
                onClick={() =>
                  localStorage.getItem("token") &&
                  localStorage.getItem("user_type") === "admin"
                    ? navigate("/admindashboard")
                    : navigate("/adminlogin")
                }
                style={{
                  display: "flex",
                  fontWeight: "700",
                  alignItems: "center",
                }}
              >
                <ArrowRightOnRectangleIcon
                  style={{
                    height: "22px",
                    width: "22px",
                    marginRight: "5px",
                    marginTop: "-5px",
                  }}
                />
                Proceed
              </Button>

              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* </ThemeProvider> */}
      {/* <Footer /> */}
    </>
  );
}

export default Login;

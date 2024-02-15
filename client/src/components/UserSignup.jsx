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
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
  const [user, addUser] = useState({
    user_email: "",
    user_name: "",
    user_phone_no: null,
    user_gender: "",
    user_address: "",
    user_password: "",
    user_photo: "",
  });

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_email", email);
    formData.append("user_name", name);
    formData.append("user_phone_no", phone);
    formData.append("user_gender", gender);
    formData.append("user_address", address);
    formData.append("user_password", password);
    formData.append("user_photo", photo);

    try {
      await axios.post("http://localhost:8081/api/users/signup/", formData);
      navigate("/userlogin");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user);

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
            borderRadius: "10px",
            height: "max-content",
            maxWidth: "600px",
            marginBottom: "50px",
            paddingBottom: "20px",
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
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "red" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create New User Account
              </Typography>
              <Box component="form" noValidate sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="user_name"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="user_email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Male"
                          name="user_gender"
                          onChange={(e) => setGender(e.target.value)}
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="Female"
                          name="user_gender"
                          onChange={(e) => setGender(e.target.value)}
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="Other"
                          name="user_gender"
                          onChange={(e) => setGender(e.target.value)}
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="user_phone_no"
                      label="Phone Number"
                      type="number"
                      id="phno"
                      autoComplete="Phno"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="user_address"
                      label="Address"
                      type="text"
                      id="address"
                      autoComplete="address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="user_password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Upload Profile Photo
                    </FormLabel>
                    <TextField
                      required
                      fullWidth
                      name="user_photo"
                      type="file"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClick}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/userlogin" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};
export default UserSignup;

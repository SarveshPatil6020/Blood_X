import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Footer from './Footer';
import Header from './Header';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { Paper } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";


const HospitalDashboard = () => {
  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //         user_email: data.get('user_email'),
  //         user_password: data.get('user_password'),
  //     });
  // };
  const navigate = useNavigate()


  const [requests, addRequest] = useState({
    reg_no: null,
    request_blood_type: "",
    request_units: null,
    urgent: "",
    request_delivered: "N"
  });

  const handleChange = (e) => {
    addRequest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/requests", requests);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  console.log(requests);

  return (


    <>
      <Header />
      <Container component="main" maxWidth="sm" style={{ marginBottom: "100px" }}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={10} square style={{ marginTop: "10px", borderRadius: "10px", height: "500px", maxWidth: "600px", marginBottom: '0px' }}>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              font: " 25px Montserrat, sans-serif"
            }}
          >

            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >

              <Typography component="h1" variant="h5">
                Request Blood
              </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>

                  <Grid item xs={4}>

                    <TextField
                      required
                      fullWidth
                      id="regno"
                      label="Blood Group"
                      name="request_blood_type"
                      autoComplete="regno"
                      type="text"
                      onChange={handleChange}
                    />


                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      required
                      fullWidth
                      id="regno"
                      label="Quantity"
                      name="request_units"
                      autoComplete="regno"
                      type="number"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      fullWidth
                      id="regno"
                      label="Registration No."
                      name="reg_no"
                      autoComplete="regno"
                      type="number"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">Urgent</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel value="Y" name="urgent" onChange={handleChange} control={<Radio />} label="Yes" />
                        <FormControlLabel value="N" name="urgent" onChange={handleChange} control={<Radio />} label="No" />


                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClick}
                >
                  Request
                </Button>

              </Box>
            </Box>
          </Box>
        </Grid>

      </Container>
      <Footer />
    </>

  );
}
export default HospitalDashboard;
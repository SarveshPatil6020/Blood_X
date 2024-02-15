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


const HospitalSignup=()=> {
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         user_email: data.get('user_email'),
    //         user_password: data.get('user_password'),
    //     });
    // };

    const [hospital,addHospital] = useState({
        hospital_name:"",
        hospital_address:"",
        hospital_phone_no:null,
        hospital_password:""
    });

    const handleChange=(e)=>{
        addHospital((prev) => ({...prev, [e.target.name]:e.target.value}));
    };

    const navigate = useNavigate()

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8081/hospitals",hospital) 
            // navigate("/hospitallogin")
        }catch(err){
            console.log(err)
        }
    }

    console.log(hospital);

    return (

        
        <>
            <Header />
            <Container component="main" maxWidth="sm" style={{marginBottom:"100px" }}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={10} square style={{marginTop:"10px", borderRadius:"10px", height:"750px",maxWidth:"600px", marginBottom:'0px'}}>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              font:" 25px Montserrat, sans-serif"
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
                    <Avatar sx={{ m: 1, bgcolor: 'red' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Hospital Sign up
                    </Typography>
                    <Box component="form" noValidate  sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="hospital_name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Hospital Name"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            
                            

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="hospital_address"
                                    label="Address"
                                    type="text"
                                    id="address"
                                    autoComplete="address"
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="hospital_phone_no"
                                    label="Phone Number"
                                    type="number"
                                    id="phno"
                                    autoComplete="Phno"
                                    onChange={handleChange}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="hospital_password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
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
                                <Link href="Success.html" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
          </Box>
        </Grid>

            </Container>
           <Footer/>
        </>
       
    );
}
export default HospitalSignup;
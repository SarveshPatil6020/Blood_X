import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Grid } from "@mui/material";
import './Footer';
import { useNavigate } from "react-router-dom";





// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         BloodX
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

export const Footer = () => {
  const navigate = useNavigate("");
    let FooterStyle={
        font:"20px Montserrat, sans-serif"
    }

    let Footercolor = {
      backgroundColor: "rgb(57,57,57)",
    };

    


  return (
    <Box
      sx={{
        display: "inline",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box
        // style={{ backgroundImage: `url(${background})` }}
        style={Footercolor}
        sx={{
          py: 3,
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={12}>
            <Grid item xs={4}>
              <Typography color="red" style={FooterStyle}>
                <b>
                  <b>Blood Bank &</b>{" "}
                </b>
              </Typography>
              <Typography color="white" style={FooterStyle}>
                <b>Donor Management System </b>
              </Typography>
              <br></br>
              <p className="ftext" align="center" style={{ color: "white" }}>
                We here at BloodX believe in providing necessary support of
                blood and helping society in any way we can. Follow the below
                link to know more about us.
              </p>
            </Grid>
            <Grid item xs={5}>
              <Typography color="white" style={FooterStyle}>
                <h5 align="left">Address</h5>
                <br></br>
              </Typography>
              <Typography color="white" align="left">
                <p className="fa fa-envelope">&nbsp;&nbsp;</p>
                Pune
                <br></br>
                <p className="fa fa-phone">&nbsp;&nbsp;</p>
                9876543210
                <br></br>
                <p className="fa fa-map-marker">&nbsp;&nbsp;</p>
                support.bloodx@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography color="white" style={FooterStyle}>
                <h5 align="left">Quick Links</h5>
              </Typography>
              <br></br>
              <Link
                to="/"
                onClick={() => navigate("/")}
                className="footerlink"
                style={{ textDecoration: "none", cursor: "pointer" }}
                align="left"
              >
                Home
              </Link>
              <br></br>
              <br></br>
              <Link
                to="/"
                onClick={() => navigate("/about_us")}
                className="footerlink"
                style={{ textDecoration: "none", cursor: "pointer" }}
                align="left"
              >
                About us
              </Link>
              <br></br>
              <br></br>
              <Link
                to="/"
                onClick={() => navigate("/contact_us")}
                className="footerlink"
                style={{ textDecoration: "none", cursor: "pointer" }}
                align="left"
              >
                Contact Us
              </Link>
              <br></br>
              {/* <a href="#">Home</a> */}
            </Grid>
          </Grid>
          <Typography variant="body1" color="white" align="center">
            <hr></hr>© BloodX - Blood Bank Management System
          </Typography>
          {/* <Copyright /> */}
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;

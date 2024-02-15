import React from "react";
import bg_image from "./Dashboard_BG.jpg";
import "./Dashboard.css";
import Header from "./Header";
import Footer from "./Footer";
import { Carousel } from "react-bootstrap";
import carousel1 from "./carousel1.jpg";
import carousel2 from "./carousel2.jpg";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import doctor from "./doctor.png";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import usericon from "./usericon.png";
import bloodgroup from "./bloodgroup.jpg";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import bg_image1 from "./bgimage1.jpeg";

const Dashboard = () => {

  const navigate = useNavigate("");

  const [appnt, setappnt] = useState([])

  React.useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    })
    const fetchappnts = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/appointments/donated")
        setappnt(res.data);
        console.log(res)
      }

      catch (err) {
        console.log(err)
      }
    }
    fetchappnts();
  }, [])

  return (
    <>
      <Header />
      <Carousel style={{ marginTop: "80px" }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={bg_image1}
            alt="One Blood Donation saves Three Lives every day"
            style={{ height: "90vh" }}
          />
          {/* <Carousel.Caption>
          <h3></h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={bg_image} alt="Second slide" />

          {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel2} alt="Third slide" />

          {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
        </Carousel.Item>
      </Carousel>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "100vh",
          backgroundColor: "gray",
          color: "white",
        }}
      >
        <Grid container spacing={12}>
          <Grid item xs={3}>
            <Typography align="right">
              <img className="doctor" src={doctor} />
            </Typography>
          </Grid>
          <Grid item xs={5.5}>
            <Typography
              variant="h5"
              align="left"
              style={{ font: "25px Montserrat, sans-serif" }}
            >
              <br></br>
              <br></br>
              <b>Highly Professional Doctors</b>
            </Typography>
            <Typography
              align="left"
              style={{ font: "17px Montserrat, sans-serif" }}
            >
              <br></br>
              All specialists have practical experience and regularly training
              courses in educational centers of the world.
            </Typography>
          </Grid>
          <Grid item xs={2} align="left" classname="grid1">
            <div className="readmore" align="left">
              <Button
                style={{
                  backgroundColor: "gray",
                  borderColor: "white",
                  marginTop: "25px",
                }}
                align="left"
              >
                <div
                  style={{
                    font: "17px Montserrat, sans-serif",
                    width: "120%",
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginLeft: "-8px",
                    marginRight: "20px",
                  }}
                >
                  Read More{" "}
                </div>
              </Button>
            </div>
          </Grid>
        </Grid>
        <br></br>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "100vh",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          style={{ font: "25px Montserrat, sans-serif" }}
        >
          <br></br>
          <b>Some of the Donors</b>
        </Typography>
        <br></br>
        <hr></hr>
        <br></br>
        <Grid container spacing={12}>
          <Grid item xs={1.5}></Grid>

          {appnt.length > 0 ? (
            appnt.map((appnts) => (
              <Grid item xs={3}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={usericon} className="usericon" />
                  <Card.Body style={{ color: "black" }}>
                    <Card.Title>{appnts.app_name}</Card.Title>
                    <Card.Text align="left">
                      Email: {appnts.app_email}
                      <br></br>
                      Blood Group: {appnts.app_blood_type}
                    </Card.Text>
                    {/* <Button variant="primary">Request</Button> */}
                  </Card.Body>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                variant="h5"
                style={{
                  textAlign: "center",
                  // fontSize: "24px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Data Not Available
              </Typography>
            </Grid>
          )}


          <Grid item xs={1.5}></Grid>
        </Grid>

        <br></br>
        <br></br>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "100vh",
          backgroundColor: "white",
          color: "black",
          mb: 15,
        }}
      >
        <Grid container spacing={12}>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <Typography
              variant="h5"
              align="center"
              style={{ font: "23px Montserrat, sans-serif", color: "red" }}
            >
              <br></br>
              <b>BLOOD GROUPS</b>
            </Typography>
            <Typography
              align="left"
              style={{ font: "15px Montserrat, sans-serif" }}
            >
              <br></br>
              Blood group of any human being will mainly fall in any one of the
              following groups...
              <br></br>
              <br></br>
              <li>
                <b>A+ve or A-ve</b>
              </li>
              <li>
                <b>B+ve or B-ve</b>
              </li>
              <li>
                <b>O+ve or O-ve</b>
              </li>
              <li>
                <b>AB+ve or AB-ve</b>
              </li>
            </Typography>
            <Typography
              align="left"
              style={{ font: "15px Montserrat, sans-serif" }}
            >
              <br></br>A healthy diet helps ensure a successful blood donation,
              and also makes you feel better!
              <br></br>
              <br></br>
              Check out the following recommended foods to eat prior to your
              donation.
              <br></br>
              <br></br>
              <li>
                <b>Iron -</b> Meat, Eggs, Breads and Cereals, Fruits, Beans,
                Vegetables.
              </li>
              <br></br>
              <li>
                <b>Vitamin C -</b> Citrus fruits, Kiwi, Mango, Papaya,
                Pineapple, etc.
              </li>
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
            align="left"
            className="grid1"
            style={{ marginTop: "120px" }}
          >
            <img className="doctor" src={bloodgroup} />
          </Grid>
        </Grid>

        <Grid container spacing={12}>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <Typography
              variant="h5"
              align="left"
              style={{ font: "23px Montserrat, sans-serif", color: "red" }}
            >
              <br></br>
              <br></br>
              <b>UNIVERSAL DONORS AND RECIPIENTS</b>
            </Typography>
            <Typography
              align="left"
              style={{ font: "15px Montserrat, sans-serif" }}
            >
              <br></br>
              The most common blood type is O, followed by type A. Type O
              individuals are often called "universal donors" since their blood
              can be transfused into persons with any blood type. Those with
              type AB blood are called "universal recipients" because they can
              receive blood of any type.
            </Typography>
          </Grid>

          <Grid item xs={3} align="left" classname="grid1">
            <br></br>
            <br></br>
            <div className="readmore" align="left">
              <Button
                style={{
                  backgroundColor: "black",
                  borderColor: "white",
                  width: "115%",
                }}
                align="left"
                onClick={() => navigate("/userlogin")}
              >
                <p
                  className="donorbutton"
                  style={{
                    font: "17px Montserrat, sans-serif",
                    marginTop: "3%",
                    marginBottom: "3%",
                  }}
                >
                  Become a Donor
                </p>
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>

      <Footer />
      <Outlet />
    </>
  );
};

export default Dashboard;

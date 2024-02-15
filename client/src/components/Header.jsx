import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavDropdown } from "react-bootstrap";
import iconSvg from "./iconSvg.png";
import "./Header.css";
import Button from "react-bootstrap/Button";
import AdminDashboard from "./AdminDashboard";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import {
  InformationCircleIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/solid";

export const Header = (props) => {
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate("");
  let Headerstyle = {
    paddingRight: "50px",
    color: "white",
    font: "16px Montserrat, sans-serif",
    margin: "auto",
    display: "flex",
    alignItems: "center",
  };
  let Headerhead = {
    color: "white",
    font: "30px Poppins",
    cursor: "pointer",
  };
  let HeaderButton = {
    color: "white",
    font: "16px Montserrat, sans-serif",
    backgroundColor: "transparent",
    boxShadow: "0px 0px 0px 0px white",
    borderColor: "white",
    display: "flex",
    alignItems: "center",
  };

  const handleProfileDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_name");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <html>
      <head>{/* <link rel="stylesheet" href="./styles.css"></link> */}</head>
      <body>
        {loading && <div id="loader" className="lds-dual-ring overlay" />}
        <Navbar
          collapseOnSelect
          expand="lg"
          className="color-nav"
          sticky="top"
          style={{
            boxShadow: "inset 0px -5px 5px -5px rgba(0, 0, 0, 1.0)",
            position: "fixed",
            width: "100%",
            marginBottom: "20px",
            height: "auto",
            background:
              "linear-gradient(to bottom right,rgba(100,0,0,1), rgba(255,0,0,1) ,rgba(100,0,0,1))",
          }}
        >
          <Container>
            <img src={iconSvg} alt="Icon SVG" width="5%" height="5%" />
            <Navbar.Brand
              className="navbar-brand"
              color="white"
              style={Headerhead}
              onClick={() => navigate("/")}
            >
              BloodX
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav style={{ width: "max-content" }}>
                <Nav.Link
                  className={`navbar-link`}
                  style={Headerstyle}
                  onClick={() =>
                    localStorage.getItem("user_type") === "donor"
                      ? navigate("/userdashboard")
                      : localStorage.getItem("user_type") === "hospital"
                      ? navigate("/hospitaldashboard")
                      : navigate("/")
                  }
                >
                  <HomeIcon
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "10px",
                    }}
                  />
                  Home
                </Nav.Link>
                {/* <Nav.Link className={`navbar-link ${location.pathname === '/' ? 'active-link' : ''}`} href="#about" style={Headerstyle}>About Us</Nav.Link>
          <Nav.Link className={`navbar-link ${location.pathname === '/' ? 'active-link' : ''}`} href="#contact" style={Headerstyle}>Contact Us</Nav.Link> */}
                <Nav.Link
                  className={`navbar-link ${
                    location.pathname === "/" ? "active-link" : ""
                  }`}
                  onClick={() => navigate("/about_us")}
                  style={Headerstyle}
                >
                  <InformationCircleIcon
                    style={{
                      height: "20px",
                      width: "20px",

                      marginRight: "10px",
                    }}
                  />
                  About Us
                </Nav.Link>
                <Nav.Link
                  className={`navbar-link ${
                    location.pathname === "/" ? "active-link" : ""
                  }`}
                  onClick={() => navigate("/contact_us")}
                  style={Headerstyle}
                >
                  <PhoneIcon
                    style={{
                      height: "20px",
                      width: "20px",

                      marginRight: "10px",
                    }}
                  />
                  Contact
                </Nav.Link>
                {/* <Nav.Link className={`navbar-link ${location.pathname === '/' ? 'active-link' : ''}`} href="#searchdonor" style={Headerstyle}>Search Donor</Nav.Link> */}
                {/* <Nav.Link
                  className={`navbar-link ${
                    location.pathname === "/" ? "active-link" : ""
                  }`}
                  onClick={() => navigate("/adminlogin")}
                  style={Headerstyle}
                >
                  <UserCircleIcon
                    style={{
                      height: "20px",
                      width: "20px",
                      
                      marginRight: "10px",
                    }}
                  />
                  Admin
                </Nav.Link> */}
                {localStorage.getItem("token") !== null ? (
                  <>
                    <div>
                      <Nav.Link
                        className="button"
                        onClick={handleProfileDropdown}
                        style={{
                          ...Headerstyle,
                          border: "none",
                          textOverflow: "hidden",
                          marginTop: "20px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{
                            maxHeight: "25px",
                            maxWidth: "180px",
                            // overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {/* <UserCircleIcon
                            style={{
                              height: "24px",
                              width: "24px",
                              marginTop: "-2px",
                              marginRight: "10px",
                              marginLeft: "10px",
                            }}
                          /> */}
                          <img style={{height:"40px", width:"40px", borderRadius:"50%", border:"2px solid white", marginRight:"10px", boxShadow:"0px 4px 4px 0px rgba(0,0,0,0.25)"}} src={localStorage.getItem("user_photo")} />
                          Hi, {localStorage.getItem("user_name")}
                        </p>
                      </Nav.Link>
                      {isDropdownOpen && (
                        <div
                          style={{
                            background:
                              "linear-gradient(to bottom right,rgba(100,0,0,1), rgba(255,0,0,1) ,rgba(100,0,0,1))",
                            position: "absolute",
                            width: "180px",
                            borderRadius: "10px",
                            marginTop: "0px",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            padding: "5px",
                          }}
                        >
                          <Button
                            onClick=""
                            style={{
                              background: "transparent",
                              border: "none",
                              display: "flex",
                              alignItems: "center",
                            }}
                            className="ml-auto mr-auto"
                          >
                            <UserIcon
                              style={{
                                height: "20px",
                                width: "20px",
                                marginTop: "-2px",
                                marginRight: "10px",
                              }}
                            />
                            Profile
                          </Button>
                          <Button
                            onClick={handleLogout}
                            style={{
                              background: "transparent",
                              border: "none",
                              display: "flex",
                              alignItems: "center",
                            }}
                            className="ml-auto mr-auto"
                          >
                            <ArrowLeftOnRectangleIcon
                              style={{
                                height: "20px",
                                width: "20px",
                                marginTop: "-2px",
                                marginRight: "10px",
                              }}
                            />
                            Logout
                          </Button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <Button
                    className="button"
                    onClick={() => navigate("/login_options")}
                    style={HeaderButton}
                  >
                    <ArrowRightOnRectangleIcon
                      style={{
                        height: "20px",
                        width: "20px",

                        marginRight: "10px",
                      }}
                    />
                    Login
                  </Button>
                )}

                {/* <NavDropdown className="navbar-dropdown" title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item className="navbar-dropdown-item" href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item className="navbar-dropdown-item" href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item color="red" className="navbar-dropdown-item" href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="navbar-dropdown-item" href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
                {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
                {/* <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </body>
    </html>
  );
};

export default Header;

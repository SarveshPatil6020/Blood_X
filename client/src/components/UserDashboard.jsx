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
import Appointments from "./Appointments";
import AppointmentsList from "./AppointmentsList";
import Loader from "../ReusableComponents/Loader";
import AlertComponent from "../ReusableComponents/AlertComponent";
import { useDispatch } from "react-redux";
import { showAlert } from "../Redux/alertSlice";

const UserDashboard = () => {
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

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [appointments, setAppointments] = useState([]);

  // const [value, setValue] = React.useState(null);
  // const handleChange1 = (e1) => {
  //   setBloodGroup((prev) => ({ ...prev, [e1.target.value]: e1.target.value }));
  //   setCampAddress((prev) => ({ ...prev, [e1.target.innerText]: e1.target.innerText }));
  //   setTime((prev) => ({ ...prev, [e1.target.innerText]: e1.target.innerText }));
  // };

  useEffect(() => {
    if (!loggedInUser) {
      // Redirect
      navigate("/userlogin");
      return;
    }
  }, []);

  const fetchappnt = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `http://localhost:8081/api/appointments/fetch_user_appointments/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setAppointments(data.context);
        setLoading(false);
      }
      else {
        setLoading(false);
      }
      console.log(data.context);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchappnt();
  }, []);

  return (
    <>
      <Header />
      <AlertComponent />
      <div
        style={{ marginTop: "100px", marginLeft: "50px", marginRight: "50px" }}
      >
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <button
            style={{
              color: "red",
              background: "none",
              border: "2px solid red",
              boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
              marginTop: "10px",
            }}
            className="btn btn-primary"
            onClick={() => appointments?.length > 0 ? dispatch(showAlert({ text: "Complete Active Appointments to Book New Appointment", type: "warning" })) : navigate("/book_appointment")}
          >
            {" "}
            New Appointment
          </button>
        </div>
        {/* <Appointments /> */}
        {appointments?.length > 0 ? (
          <div className="w-1/2 ml-auto mr-auto items-center text-center">
            {appointments?.map((appointment) => (
              <div className="mt-10 shadow-xl rounded-xl flex justify-center h-52">
                <div className="bg-gradient-to-r from-red-500 to-gray-500 rounded-xl shadow-xl text-white w-100 h-1/3">
                  <div className="text-left px-4 flex justify-between items-center h-full">
                    <div className="">Appointment ID : {appointment._id}</div>
                    <div className="rounded-md p-2 bg-red-600 shadow-xl">{appointment.app_donated==="Y" ? "Donated" : "Booked"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={10}
            square
            className="rounded-xl"
          >
            No Active Appointments. Click on New Appointment to Proceed !!
          </Grid>
        )}
        {loading && <Loader />}
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default UserDashboard;

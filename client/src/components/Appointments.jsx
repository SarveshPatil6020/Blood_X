import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loader from "../ReusableComponents/Loader";
import AlertComponent from "../ReusableComponents/AlertComponent";
import { useDispatch } from 'react-redux';
import { hideAlert, showAlert } from '../Redux/alertSlice';


const Appointments = () => {

  const [appnts, setappnt] = useState([])
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const checkDonatedStatus = async (app_email) => {
    const res = await axios.get("http://localhost:8081/api/appointments/all");

    res.data.forEach(async (ele) => {
      if (app_email === ele.app_email) {
        let res = await handleDelete(app_email);
        if(res.app_donated == false){
          handleDelete(app_email)
        }
        // You may choose to break out of the loop here if needed
      }
    });
  }

  const handleDelete = async (app_email) => {
    try {
      setLoading(true);
      const response = await axios.delete("http://localhost:8081/api/appointments/delete/" + app_email);
      const data = response.data;

      if (response.status === 200) {
        setLoading(false);
        dispatch(showAlert({ text: data.message, type: "success" }));
        setTimeout(() => {
          dispatch(hideAlert());
        }, 4000);
        navigate("/admindashboard");
        window.location.reload()
        
      } else {
        setLoading(false);
        dispatch(showAlert({ text: data.message, type: "warning" }));
        setTimeout(() => {
          dispatch(hideAlert());
        }, 4000);
        window.location.reload()
      }
    } catch (error) {
      setLoading(false);
      console.error("Error deleting appointment:", error);
      dispatch(showAlert({ text: "Error deleting appointment", type: "error" }));
      setTimeout(() => {
        dispatch(hideAlert());
      }, 4000);
      navigate("/admindashboard");
      window.location.reload()
    }
  };



  const handleUpdate = async (app_email) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/appointments/update/${app_email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ app_email: app_email }),
        }
      );

      const data = await response.json();
      setappnt(data);
      console.log(data);
      window.location.reload()
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {
    const fetchappnt = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/appointments/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setappnt(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchappnt();
  }, [])
  return (
    <>
      <AlertComponent />
      {loading && <Loader />}
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" align="left " gutterBottom>
          <b>Recent Appointments</b>
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Phone No</b></TableCell>
              <TableCell><b>Blood Group</b></TableCell>
              <TableCell><b>Donation Camp</b></TableCell>
              <TableCell><b>Donated(Y/N)</b></TableCell>
              <TableCell><b>Operations</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appnts.map(appnt => (
              <TableRow>
                <TableCell>{appnt.app_date}</TableCell>
                <TableCell>{appnt.app_email}</TableCell>
                <TableCell>{appnt.app_name}</TableCell>
                <TableCell>{appnt.app_phone_no}</TableCell>
                <TableCell>{appnt.app_blood_type}</TableCell>
                <TableCell>{appnt.app_camp_address}</TableCell>
                <TableCell>{appnt.app_donated == true ? "Y" : "N"}</TableCell>
                <TableCell><Button variant="success" className="approve" onClick={() => handleUpdate(appnt.app_email)}>Approve</Button>{''} </TableCell>
                <TableCell> <Button variant="danger" className="delete" onClick={() => checkDonatedStatus(appnt.app_email)}>Delete</Button>{''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color="primary" to="/appntlist" onClick={preventDefault} sx={{ mt: 3 }}>
          See more orders
        </Link>
      </React.Fragment>
    </>
  )
}

function preventDefault(event) {
  event.preventDefault();
}

export default Appointments;
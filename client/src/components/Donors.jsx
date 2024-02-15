import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Footer from './Footer';
import axios from 'axios';
// import { mainListItems, secondaryListItems } from './listItems';
// import Chart from './Chart';
// import Deposits from './Deposits';

import { Outlet } from 'react-router-dom';
import './AdminDashboard.css';


const drawerWidth = 240;

function DashboardContent() {
   
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const[appnt,setappnt] = useState([])

  React.useEffect(()=>{
    const fetchappnts = async()=>{
    try{
      const res = await axios.get("http://localhost:8081/api/appointments/donated")
      setappnt(res.data);
      console.log(res)
    }
       
      catch(err){
        console.log(err)
      }
    }
    fetchappnts();
  },[])

  return (
    
  <>

     
        
        
      
        
        
                <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" align="left " gutterBottom>
         <b>Donors List</b>
    </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Phone No.</b></TableCell>
            <TableCell><b>Blood Group</b></TableCell>
            <TableCell><b>Camp Location</b></TableCell>
            <TableCell><b>Age</b></TableCell>
            <TableCell><b>Diabetic(Y/N)</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Time</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appnt.map(appnts => (
            <TableRow>
              <TableCell>{appnts.app_email}</TableCell>
              <TableCell>{appnts.app_name}</TableCell>
              <TableCell>{appnts.app_phone_no}</TableCell>
              <TableCell>{appnts.app_blood_type}</TableCell>
              <TableCell>{appnts.app_camp_address}</TableCell>
              <TableCell>{appnts.app_age}</TableCell>
              <TableCell>{appnts.app_diabetic}</TableCell>
              <TableCell>{appnts.app_date}</TableCell>
              <TableCell>{appnts.app_time}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
         
              
    
   
      <Outlet/>
  </>
      

    
  );
}

export default function Donors() {
  return <DashboardContent />;
}
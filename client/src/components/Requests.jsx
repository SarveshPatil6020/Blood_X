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


const Requests = ()=>{

  const[requests,setrequest] = useState([])

  const handleDelete = async(reg_no)=>{
    try{
      await axios.delete("http://localhost:8081/requests/"+reg_no );
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  const handleUpdate = async(reg_no)=>{
    try{
      await axios.put("http://localhost:8081/requests/"+reg_no );
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  React.useEffect(()=>{
    const fetchrequests = async()=>{
    try{
      const res = await axios.get("http://localhost:8081/requests")
      setrequest(res.data);
      console.log(res)
    }
       
      catch(err){
        console.log(err)
      }
    }
    fetchrequests();
  },[])
  return(
    <>
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" align="left " gutterBottom>
         <b>Blood Requests</b>
    </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Reg No.</b></TableCell>
            <TableCell><b>Blood Group</b></TableCell>
            <TableCell><b>Units</b></TableCell>
            <TableCell><b>Urgent</b></TableCell>
            <TableCell><b>Delivered(Y/N)</b></TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map(request => (
            <TableRow>
              <TableCell>{request.reg_no}</TableCell>
              <TableCell>{request.request_blood_type}</TableCell>
              <TableCell>{request.request_units}</TableCell>
              <TableCell>{request.urgent}</TableCell>
              <TableCell>{request.request_delivered}</TableCell>
              <TableCell><Button variant="success" className="approve" onClick={()=>handleUpdate(request.reg_no)}>Approve</Button>{''} </TableCell>
              <TableCell> <Button variant="danger" className="delete" onClick={()=>handleDelete(request.reg_no)}>Delete</Button>{''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
    </>
  )
}

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Tupelo, MS',
//     'VISA ⠀•••• 3719',
//     312.44,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'London, UK',
//     'VISA ⠀•••• 2574',
//     866.99,
//   ),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Gary, IN',
//     'AMEX ⠀•••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     'VISA ⠀•••• 5919',
//     212.79,
//   ),
// ];

function preventDefault(event) {
  event.preventDefault();
}

export default Requests;
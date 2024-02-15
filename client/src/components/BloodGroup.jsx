import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Footer from './Footer';
import Appointments from './Appointments';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Outlet } from 'react-router-dom';
import './AdminDashboard.css';
import Header from './Header';
import Requests from './Requests';
import Donors from './Donors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useState } from 'react';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [bgrequests, setbgrequest] = useState([])
  const [bgdonors, setbgdonor] = useState([])

  React.useEffect(() => {
    const fetchrequests = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/bloodstock/bloodgroupwisereq")
        setbgrequest(res.data);
        console.log(bgrequests)
      }

      catch (err) {
        console.log(err)
      }
    }
    const fetchdonors = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/bloodstock/bloodgroupwisedonar")
        setbgdonor(res.data);
        // console.log(bgdonors[0]._id)
        // console.log(bgdonors[0].totalDonations)

      }

      catch (err) {
        console.log(err)
      }
    }
    fetchdonors();
    fetchrequests();
  }, [])

  return (

    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex', color: "red" }}>
        <CssBaseline />
        <AppBar>
          <Header />
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: '75px',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {/* {mainListItems} */}
            <React.Fragment>
              <ListItemButton href="/admindashboard">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton href="/donorlist">
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Donor List" />
              </ListItemButton>

              <ListItemButton href="/hospitallist">
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Hospital List" />
              </ListItemButton>

            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
            <React.Fragment>
              <ListSubheader component="div" inset>
                Dashboard Items
              </ListSubheader>
              <ListItemButton href="/bg">
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Blood Groups" />
              </ListItemButton>
              <ListItemButton href="appntlist">
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Appointments" />
              </ListItemButton>
              <ListItemButton href="/bloodrequests">
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Blood Requests" />
              </ListItemButton>
              <ListItemButton href="/stock">
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Blood Stock" />
              </ListItemButton>
            </React.Fragment>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}

              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <React.Fragment>
                    <Typography component="h2" variant="h6" color="primary" align="left " gutterBottom>
                      <b>Blood Group Wise No. of Donors</b>
                    </Typography>
                    {bgdonors.length > 0 ? (
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><b>Blood Group</b></TableCell>
                            <TableCell><b>No. of Donors</b></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {bgdonors.map(bgdonor => (
                            <TableRow key={bgdonor._id}>
                              <TableCell>{bgdonor._id}</TableCell>
                              <TableCell>{bgdonor.totalDonations}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      "Empty"
                    )}


                    {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
                  </React.Fragment>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <React.Fragment>
                    <Typography component="h2" variant="h6" color="primary" align="left " gutterBottom>
                      <b>Blood Group Wise No. of Blood Requests</b>
                    </Typography>
                    {bgrequests.length > 0 ? (
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><b>Blood Group</b></TableCell>
                            <TableCell><b>No. of Blood Requests</b></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {bgrequests.map(bgrequest => (
                            <TableRow key={bgrequest._id}>
                              <TableCell>{bgrequest._id}</TableCell>
                              <TableCell>{bgrequest.totalDonations}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      "Empty"
                    )}
                    {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
                  </React.Fragment>
                </Paper>
              </Grid>
            </Grid>

          </Container>
        </Box>
      </Box>
      <Footer />
      <Outlet />
    </ThemeProvider>

  );
}

export default function BloodGroup() {
  return <DashboardContent />;
}
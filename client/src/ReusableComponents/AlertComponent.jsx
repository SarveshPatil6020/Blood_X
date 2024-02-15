// Alert.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../Redux/alertSlice";
import { Collapse } from "@mui/material";
import { Alert } from "@mui/material";
import "../App.css";

const AlertComponent = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleHideAlert = () => {
    dispatch(hideAlert());
  };

  return (
    <div className="alert">
      <Collapse in={!!alert.text}>
        <Alert
          className="alert"
          severity={alert.type}
          onClose={handleHideAlert}
        >
          {alert.text}
        </Alert>
      </Collapse>
    </div>
  );
};

export default AlertComponent;

import React from "react";
import style from "./Notification.css";
const Notification = ({ message, isError = false }) => {
  if (message === null) {
    return null;
  }

  return <div className={"message" + (isError ? " error" : "")}>{message}</div>;
};

export default Notification;

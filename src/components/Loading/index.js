import React from "react";
import { CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const Loading = (props) => {
  const { abstractHeight } = props;
  const useStyles = makeStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: `calc(100vh - ${abstractHeight ? abstractHeight : 250}px)`,
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default Loading;

import { AddCircleOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    border: "1px solid #cccc",
    boxShadow: "5px 5px #ccc",
    padding: "10px 15px",
  },
  wraper: {},
  image: {
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "15px",
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
  },
});

const CourseCard = ({ url, description, title, onSubmit }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.root} item container xs={12} md={10} gap={3}>
      <Grid item xs={2} sx={{ height: "120px" }}>
        <img
          className={classes.image}
          src={
            url
              ? url
              : "https://tse3.mm.bing.net/th?id=OIP.WD6bpRhI0hiUsXZiMSVA2AHaKd&pid=Api&P=0&w=134&h=190"
          }
        ></img>
      </Grid>

      <Grid container direction="column" className={classes.content} gap={2}>
        <Grid item>
          <Typography fontSize="18px" fontWeight="bold">
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography fontSize="16px">{description}</Typography>
        </Grid>
        <Grid item>
          <LoadingButton
            loading={false}
            variant="contained"
            color="success"
            onClick={onSubmit}
            startIcon={<AddCircleOutline size="large" />}
            sx={{ textTransform: "unset", fontSize: "16px" }}
          >
            Đăng ký
          </LoadingButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CourseCard;

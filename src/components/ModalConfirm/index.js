import _ from "lodash";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
// import { COLOR } from "../constants/theme";
import { LoadingButton } from "@mui/lab";
const COLOR = { primary: "primary" };

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  zIndex: 99,
};

const ModalConfirm = ({
  open,
  handleClose,
  title,
  description,
  submit,
  loading = false,
}) => {
  const useStyles = makeStyles((theme) => ({
    title: {
      color: _.get(COLOR, "primary"),
      fontSize: 24,
      fontWeight: 600,
    },
    description: {
      fontSize: 16,
      fontWeight: "normal",
      color: "#0A2240",
    },
    back: {
      backgroundColor: "#E2E1E1 !important",
      color: "#0A2240 !important",
      width: 150,
      height: 48,
    },
    confirm: {
      backgroundColor: _.get(COLOR, "primary"),
      color: "#fff",
      width: 150,
      height: 48,
      marginLeft: 12,
    },
  }));
  const classes = useStyles();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography className={clsx(classes.title)} variant='h6' component='h2'>
          {title}
        </Typography>
        <Typography className={clsx(classes.description)} sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          marginTop='30px'
          spacing={2}
        >
          <Grid item>
            <Button
              disabled={loading}
              variant='contained'
              size='small'
              onClick={handleClose}
              className={clsx(classes.back)}
            >
              Quay lại
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton
              loading={loading}
              variant='contained'
              size='small'
              onClick={submit}
              className={clsx(classes.confirm)}
            >
              Xác nhận
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalConfirm;

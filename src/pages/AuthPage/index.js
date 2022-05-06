import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
// import logo from "../../assets/ecoe_logo_v.svg";
import background from "../../assets/image/login_background.png";
import { Redirect } from "react-router";
// import {
//   sendPasswordReset,
//   signInWithEmailPassword,
// } from "../../firebase/services/email";
// import { user } from "../../constants/user";
import { useHistory } from "react-router-dom";
import logo from "../../assets/image/bku.png";
import swal from "sweetalert";
import * as _ from "lodash";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { useDispatch } from "react-redux";
import { userLoginApi } from "app/reducers/authReducer";

const useStyles = makeStyles(() => ({
  wrapper: {
    backgroundColor: "white",
    boxShadow: " 0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    padding: "160px 80px",

    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
  form: {
    width: "456px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  dialog: {
    "& > :nth-child(3) > div": {
      gap: 40,
      padding: "32px 40px",
      margin: 0,

      "& > div": {
        padding: 0,
      },
    },
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
}));

const AuthPage = ({ type }) => {
  const [showModal, setShowModal] = useState(false);
  const [emailReset, setEmailReset] = useState("");

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let token = localStorage.getItem("access_token");

  const classes = useStyles();
  // const router = useHistory();
  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    if (type === "login") {
      dispatch(userLoginApi({ ...data, history }));
    }
  };

  const methods = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  if (token) return <Redirect to='/' />;

  return (
    <FormProvider {...methods}>
      <Grid
        container
        style={{
          height: "100vh",
          position: "relative",
          // backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid item xs={6} style={{ paddingLeft: "80px" }}>
          <img
            src={logo}
            alt='bkelearning'
            style={{
              position: "absolute",
              top: 45,
              width: 70,
              height: 70,
              cursor: "pointer",
            }}
            onClick={() => {
              history.push("/");
            }}
          />
          <Typography
            color='secondary'
            variant='h1'
            style={{
              position: "absolute",
              top: "25%",
              opacity: ".7",
              maxWidth: "40%",
            }}
          >
            Chào mừng đến BKEL V2
          </Typography>
        </Grid>
        <Grid item container alignItems='center' xs={6}>
          <div className={classes.wrapper}>
            <Typography
              variant='h2'
              color='secondary'
              sx={{ fontWeight: "bold" }}
            >
              Xin Chào!
            </Typography>

            <form
              variant='filled'
              className={classes.form}
              onSubmit={handleSubmit(onSubmit)}
            >
              {type === "login" && <LoginPage />}
              {type === "register" && <RegisterPage />}
              <FormControlLabel
                control={<Checkbox />}
                label='Ghi nhớ mật khẩu'
              />
              {/* <LoadingButton loading={loading} variant="contained" color="primary" type="submit">Đăng nhập</LoadingButton>
               */}

              {/* <Button color='secondary' onClick={() => setShowModal(true)}>
                Quên mật khẩu
              </Button> */}
              <Dialog
                open={showModal}
                onClose={() => setShowModal(false)}
                fullWidth={true}
                className={classes.dialog}
              >
                <DialogActions>
                  <Button
                    onClick={() => setShowModal(false)}
                    variant='contained'
                    color='grey'
                    size='small'
                  >
                    Hủy
                  </Button>
                  {/* <LoadingButton
                  loading={loading}
                  onClick={handleResetPassword}
                  variant='contained'
                  color='primary'
                  size='small'
                >
                  Gửi
                </LoadingButton> */}
                  {/* <Button
                onClick={handleResetPassword}
                variant="contained"
                color="primary"
                size="small"
              >
                Gửi
              </Button> */}
                </DialogActions>
              </Dialog>
            </form>
          </div>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default AuthPage;

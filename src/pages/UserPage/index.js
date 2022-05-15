import {
  Autocomplete,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { enrolmentsApi } from "app/reducers/enrolmentsReducer";
import { listCourseApi } from "app/reducers/listCourseReducer";
import CourseCard from "components/Card/CourseCard";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseService } from "services";
import swal from "sweetalert";
import moment from "moment";

const useStyles = makeStyles({
  root: {},
  rightBar: {
    position: "relative",
    height: "100%",
    "&::after": {
      position: "absolute",
      content: `" "`,
      width: "2px",
      height: "100%",
      backgroundColor: "#ccc",
      // border: "1px solid #ccc",
      left: "-5px",
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
});

const UserPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);

  const { loading: enrolmentsLoading, data: enrolments } = useSelector(
    (state) => state.enrolmentsReducer
  );
  const { userInfo, loading: userLoading } = useSelector(
    (state) => state.authReducer
  );

  //   console.log(userInfo);

  const renderinfo = (userInfo) => {
    let userData = [
      { label: "Tên đăng nhập", value: userInfo.username },
      {
        label: "Họ và tên",
        value: `${userInfo.firstName} ${userInfo.lastName}`,
      },
      { label: "Số điện thoại", value: userInfo.phone },
      { label: "Email", value: userInfo.email },
      {
        label: "Địa chỉ",
        value: `${userInfo.city}-${userInfo.country}`,
      },
      {
        label: "Ngày vào học",
        value: `${moment(userInfo.dateInit).format("dd/MM/yyyy")}`,
      },
    ];
    return _.map(userData, ({ label, value }, index) => {
      return (
        <Grid item md={6} xs={12} key={index} display="flex" gap="20px">
          <Typography fontSize="16px" fontWeight={500}>
            {label}
          </Typography>
          <Typography fontSize="16px" fontWeight={300}>
            {value || "Chưa cập nhật"}
          </Typography>
        </Grid>
      );
    });
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      dispatch(enrolmentsApi({ userid: userInfo?.id }));
    }
  }, []);

  if (enrolmentsLoading) return <CircularProgress />;

  return (
    <Grid container flexDirection="column">
      <Typography fontSize="32px" fontWeight={600}>
        Thông tin cá nhân
      </Typography>
      <Paper sx={{ padding: "25px" }}>
        <Grid container>
          {/* userinfo */}
          <Typography fontSize="24px" fontWeight={600} paddingBottom="15px">
            Thông tin sinh viên
          </Typography>
          <Grid item container spacing={4}>
            {renderinfo(userInfo)}
            {/* <Grid item md={6} xs={12}>
              <Typography fontSize="16px" fontWeight={500}>
                Tên đăng nhập
              </Typography>
              <Typography fontSize="16px" fontWeight={300}></Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography fontSize="16px" fontWeight={500}>
                Họ và tên
              </Typography>
              <Typography fontSize="16px" fontWeight={300}></Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography fontSize="16px" fontWeight={500}>
                Số điện thoại
              </Typography>
              <Typography fontSize="16px" fontWeight={300}></Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography fontSize="16px" fontWeight={500}>
                Email
              </Typography>
              <Typography fontSize="16px" fontWeight={300}></Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography fontSize="16px" fontWeight={500}>
                Địa chỉ hiện tại
              </Typography>
              <Typography fontSize="16px" fontWeight={300}></Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography fontSize="16px" fontWeight={500}>
                Ngày vào học
              </Typography>
              <Typography fontSize="16px" fontWeight={300}></Typography>
            </Grid> */}
            <Grid
              xs={12}
              item
              display={"flex"}
              justifyContent="flex-end"
              gap="20px"
            >
              <Button variant="contained" color="success">
                Đổi thông tin tài khoản
              </Button>
              <Button variant="contained" color="warning">
                Đổi mật khẩu
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/*Devider  */}
        <Divider variant="fullWidth" sx={{ paddingBlock: "15px" }} />

        <Grid container>
          <Typography
            fontSize="24px"
            fontWeight={600}
            paddingBottom="15px"
            paddingTop="15px"
          >
            Thông tin đăng ký môn học
          </Typography>
        </Grid>
        <Grid container>{/* History Learning */}</Grid>
      </Paper>
    </Grid>
  );
};

export default UserPage;

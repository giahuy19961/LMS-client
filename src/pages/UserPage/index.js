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
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseService, userService } from "services";
import swal from "sweetalert";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "context/AuthContext";

const MODE = {
  DETAIL: "DETAIL",
  EDIT_INFO: "EDIT_INFO",
  EDIT_PASSWORD: "EDIT_PASSWORD",
};

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
  const [mode, setMode] = useState(MODE.DETAIL);

  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {},
  });

  const { loading: enrolmentsLoading, data: enrolments } = useSelector(
    (state) => state.enrolmentsReducer
  );
  const { userInfo, loading: userLoading } = useSelector(
    (state) => state.authReducer
  );
  const { context, setValueContext } = useContext(AuthContext);
  console.log({ context });

  const updateUserApi = async ({ id, userUpdate }) => {
    try {
      await userService.updateUser({ id, userUpdate });
      swal({ title: "Thay đổi thông tin thành công", icon: "success" }).then(
        (res) => {
          setValueContext({ ...context });
          setMode(MODE.DETAIL);
        }
      );
    } catch (error) {
      swal({ title: "Thay đổi thông tin thất bại ", icon: "error" });
    }
  };

  // submit
  const onSubmit = (values) => {
    if (mode === MODE.EDIT_INFO) {
      console.log(values);
      const { id, phone, ...userUpdate } = values;
      updateUserApi({ id, userUpdate });
    }
    if (mode === MODE.EDIT_PASSWORD) {
    }
  };

  const renderinfo = (userInfo) => {
    let userData = [
      { label: "Tên đăng nhập", value: userInfo.username, name: "username" },
      { label: "Email", value: userInfo.email, name: "email" },
      {
        label: "Họ",
        value: `${userInfo.firstName} `,
        name: "firstName",
      },
      {
        label: "Tên",
        value: ` ${userInfo.lastName}`,
        name: "lastName",
      },
      { label: "Số điện thoại", value: userInfo.phone1, name: "phone1" },

      {
        label: "Địa chỉ",
        value: `${userInfo.city}`,
        name: "city",
      },
      {
        label: "Ngày vào học",
        value: `${moment(userInfo.dateInit).format("DD/MM/yyyy")}`,
      },
    ];
    switch (mode) {
      case MODE.EDIT_INFO:
        return _.map(userData, ({ label, value, name }, index) => {
          if (
            _.includes(
              ["Họ", "Số điện thoại", "Địa chỉ", "Email", "Tên"],
              label
            )
          ) {
            return (
              <Grid
                item
                md={5}
                xs={12}
                key={index}
                display='flex'
                alignItems='center'
              >
                <Grid item xs={12} md={5}>
                  <Typography minWidth='100px' fontSize='16px' fontWeight={500}>
                    {label}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name={name}
                    render={({ field }) => <TextField fullWidth {...field} />}
                  />
                </Grid>
              </Grid>
            );
          }
        });
      case MODE.EDIT_PASSWORD:
        return (
          <>
            <Grid item md={12} xs={12} display='flex'>
              <Grid item xs={12} md={3}>
                <Typography fontSize='16px' fontWeight={500}>
                  Nhập password cũ
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name='password'
                  render={({ field }) => <TextField fullWidth {...field} />}
                />
              </Grid>
            </Grid>
            <Grid item md={12} xs={12} display='flex'>
              <Grid item xs={12} md={3}>
                <Typography fontSize='16px' fontWeight={500}>
                  Nhập password mới
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name='newPassword'
                  render={({ field }) => <TextField fullWidth {...field} />}
                />
              </Grid>
            </Grid>
            <Grid item md={12} xs={12} display='flex'>
              <Grid item xs={12} md={3}>
                <Typography fontSize='16px' fontWeight={500}>
                  Nhập lại password mới
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name='confirmPassword'
                  render={({ field }) => <TextField fullWidth {...field} />}
                />
              </Grid>
            </Grid>
          </>
        );
      default:
        return _.map(userData, ({ label, value }, index) => {
          return (
            <Grid item md={6} xs={12} key={index} display='flex' gap='20px'>
              <Typography fontSize='16px' fontWeight={500}>
                {label}
              </Typography>
              <Typography fontSize='16px' fontWeight={300}>
                {value || "Chưa cập nhật"}
              </Typography>
            </Grid>
          );
        });
    }
  };
  const renderButton = (mode) => {
    let content = <></>;
    switch (mode) {
      case MODE.DETAIL:
        content = (
          <Grid
            xs={12}
            item
            display={"flex"}
            justifyContent='flex-end'
            gap='20px'
          >
            <Button
              variant='contained'
              color='success'
              onClick={() => setMode(MODE.EDIT_INFO)}
            >
              Đổi thông tin tài khoản
            </Button>
            <Button
              variant='contained'
              color='warning'
              onClick={() => setMode(MODE.EDIT_PASSWORD)}
            >
              Đổi mật khẩu
            </Button>
          </Grid>
        );

        break;
      default:
        content = (
          <Grid
            xs={12}
            item
            display={"flex"}
            justifyContent='flex-end'
            gap='20px'
          >
            <Button
              variant='contained'
              color='warning'
              onClick={() => setMode(MODE.DETAIL)}
            >
              Trở lại
            </Button>
            <Button variant='contained' color='success' type='submit'>
              Lưu thay đổi
            </Button>
          </Grid>
        );
        break;
    }
    return content;
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      dispatch(enrolmentsApi({ userid: userInfo?.id }));
    }
  }, [mode]);

  useEffect(() => {
    if (mode === MODE.EDIT_INFO) {
      _.mapKeys(userInfo, (value, key) => {
        if (
          (_.includes([
            "username",
            "firstName",
            "lastName",
            "email",
            "phone1",
            "city",
          ]),
          key)
        ) {
          setValue(key, value);
        }
      });
    }
  }, [mode]);

  if (enrolmentsLoading) return <CircularProgress />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container flexDirection='column'>
        <Typography fontSize='32px' fontWeight={600}>
          Thông tin cá nhân
        </Typography>
        <Paper sx={{ padding: "25px" }}>
          <Grid container>
            {/* userinfo */}
            <Typography fontSize='24px' fontWeight={600} paddingBottom='15px'>
              {(() => {
                if (mode === MODE.DETAIL) {
                  return `Thông tin sinh viên`;
                }
                if (mode === MODE.EDIT_INFO) {
                  return `Chỉnh sửa thông tin`;
                }
                if (mode === MODE.EDIT_PASSWORD) {
                  return `Thay đổi mật khẩu`;
                }
              })()}
            </Typography>
            <Grid item container spacing={4}>
              {userInfo && renderinfo(userInfo)}
              {renderButton(mode)}
            </Grid>
          </Grid>
          {/*Devider  */}
          <Divider variant='fullWidth' sx={{ paddingBlock: "15px" }} />

          <Grid container>
            <Typography
              fontSize='24px'
              fontWeight={600}
              paddingBottom='15px'
              paddingTop='15px'
            >
              Thông tin đăng ký môn học
            </Typography>
            <Grid item container>
              ĐKMH
            </Grid>
          </Grid>
          <Grid container>
            {/* History Learning */}
            <Typography
              fontSize='24px'
              fontWeight={600}
              paddingBottom='15px'
              paddingTop='15px'
            >
              Thông tin đăng ký môn học
            </Typography>
            <Grid item container>
              Lịch sử học tập
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </form>
  );
};

export default UserPage;

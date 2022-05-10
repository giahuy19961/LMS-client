import {
  Autocomplete,
  CircularProgress,
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

const CoursePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);
  const { loading: coursesLoading, data: courses } = useSelector(
    (state) => state.listCourseReducer
  );
  const { loading: enrolmentsLoading, data: enrolments } = useSelector(
    (state) => state.enrolmentsReducer
  );
  const { userInfo } = useSelector((state) => state.authReducer);
  const [detailCourse, setDetailCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState({});

  const getOptionsCourse = (courses) => {
    return _.map(courses, (course) => ({
      id: _.get(course, "id"),
      label: _.get(course, "fullname", ""),
      categories: _.get(course, "category", null),
      shortname: _.get(course, "shortname", ""),
      idnumber: _.get(course, "idnumber", ""),
    }));
  };

  const getCourseByIdApi = async (id) => {
    setLoading(true);
    try {
      const res = await courseService.getCourseById(id);
      console.log(res);
      setDetailCourse(res.data.data[0]);
    } catch (error) {
      console.log(error);
      swal({ title: "Khóa học không tồn tại", icon: "error" });
      setDetailCourse(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (course !== null) {
      getCourseByIdApi(course.id);
    }
  }, [course]);

  const registerSubjectApi = async ({ courseid, userid }) => {
    try {
      const res = await courseService.registerSubject({ courseid, userid });
      console.log(res);
      swal({ title: res?.data.message, icon: "success" }).then((res) => {
        setRefetch({});
        setDetailCourse(null);
      });
    } catch (error) {
      swal({ title: error.message, icon: "error" });
      console.log(error);
    }
  };

  const handleRegister = () => {
    let isExistCourse = !_.isEmpty(
      _.filter(enrolments, (item) => item.id === detailCourse.id)
    );
    if (isExistCourse) {
      swal({
        title: "Khóa học này đã được đăng ký vui lòng chọn khóa khác",
        icon: "error",
      });
    } else {
      registerSubjectApi({ userid: userInfo.id, courseid: detailCourse.id });
    }
  };

  useEffect(() => {
    dispatch(listCourseApi());
    if (userInfo) {
      dispatch(enrolmentsApi({ userid: userInfo?.id }));
    }
  }, [refetch]);

  if (coursesLoading || enrolmentsLoading) return <CircularProgress />;

  return (
    <Grid container flexDirection='column'>
      <Typography fontSize='32px' fontWeight={500}>
        Đăng ký môn học
      </Typography>
      <Paper>
        <Grid container>
          <Grid item lg={3} padding='25px'>
            <Typography fontSize='24px'>Lịch đăng ký</Typography>
            <Typography fontSize='12px'>
              Từ ngày 23/03/2022 đến ngày 23/03/2022
            </Typography>
          </Grid>
          <Grid item container lg={9} className={classes.rightBar}>
            <Grid item xs={12} padding={"5px 10px"} sx={{ minHeight: "200px" }}>
              <Typography fontSize='16px' fontWeight='bold'>
                Buớc 1: Chọn môn học đăng ký
              </Typography>
              <Autocomplete
                fullWidth
                options={getOptionsCourse(courses)}
                onChange={(e, newValue) => setCourse(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              <Grid container>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Grid item container sx={{ padding: "5px 10px" }}>
                    {detailCourse && (
                      <CourseCard
                        title={detailCourse?.shortname}
                        description={detailCourse?.fullname}
                        onSubmit={handleRegister}
                        register={true}
                      />
                    )}
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              padding={"5px 10px"}
              sx={{ minHeight: "200px" }}
            >
              <Typography
                fontSize='16px'
                fontWeight='bold'
                paddingBottom={"20px"}
              >
                Bước 2 :Danh sách môn học đã đăng ký
              </Typography>
              <Grid
                container
                gap={2}
                sx={{ maxHeight: "400px", overflowY: "auto" }}
              >
                {!_.isEmpty(enrolments) &&
                  _.map(enrolments, (enrolment, index) => (
                    <CourseCard
                      key={index}
                      title={enrolment?.shortname}
                      description={enrolment?.fullname}
                      register={false}
                    />
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default CoursePage;

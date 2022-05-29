import { Grid, Switch, Typography } from "@mui/material";
import { listCourseApi } from "app/reducers/listCourseReducer";
import Loading from "components/Loading";
import TableComponent from "components/TableComponent";
import { FORMAT_DATE_TIME } from "constants/defines";
import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const Courses = () => {
  const dispatch = useDispatch();
  const { loading: fetchCourseLoading, data: courses } = useSelector(
    (state) => state.listCourseReducer
  );
  let [tmp, setTmp] = useState([]);

  const columns = useMemo(
    () => [
      {
        name: "id",
        options: {
          display: false,
        },
      },
      {
        name: "fullname",
        label: "Tên khóa học",
        options: {
          customBodyRender: (dataIndex, rowIndex) => {
            return <div style={{ minWidth: "179px" }}>{dataIndex}</div>;
          },
        },
      },
      {
        name: "shortname",
        label: "Mã khóa học",
        options: {
          customBodyRender: (dataIndex, rowIndex) => {
            return <div style={{ minWidth: "79px" }}>{dataIndex}</div>;
          },
        },
      },
      {
        name: "startdate",
        label: "Ngày bắt đầu",
        options: {
          customBodyRender: (dataIndex, rowIndex) => {
            return (
              <div style={{ minWidth: "110px" }}>
                {dataIndex
                  ? moment(dataIndex)
                      .format(FORMAT_DATE_TIME)
                      .replace("1970", "2022")
                  : "-"}
              </div>
            );
          },
        },
      },
      {
        name: "enddate",
        label: "Ngày kết thúc ",
        options: {
          customBodyRender: (dataIndex, rowIndex) => {
            return (
              <div style={{ minWidth: "110px" }}>
                {dataIndex
                  ? moment(dataIndex)
                      .format(FORMAT_DATE_TIME)
                      .replace("1970", "2022")
                  : "-"}
              </div>
            );
          },
        },
      },

      {
        name: "timecreated",
        label: "Ngày tham gia",
        options: {
          customBodyRender: (dataIndex, rowIndex) => {
            return (
              <div style={{ minWidth: "110px" }}>
                {dataIndex
                  ? moment(dataIndex)
                      .format(FORMAT_DATE_TIME)
                      .replace("1970", "2022")
                  : "-"}
              </div>
            );
          },
        },
      },
      {
        name: "timemodified",
        label: "Ngày cập nhật",
        options: {
          customBodyRender: (dataIndex, rowIndex) => {
            return (
              <div style={{ minWidth: "110px" }}>
                {dataIndex
                  ? moment(dataIndex)
                      .format(FORMAT_DATE_TIME)
                      .replace("1970", "2022")
                  : "-"}
              </div>
            );
          },
        },
      },
      {
        name: "studentCount",
        label: "Số lượng sinh viên đăng ký",
        options: {
          customBodyRender: (dataIndex, rowIndex) => {
            return <div style={{ minWidth: "110px" }}>{dataIndex || "-"}</div>;
          },
        },
      },
      {
        name: "action",
        label: "Xác nhận mở lớp",
        options: {
          customBodyRender: (dataIndex, rowIndex) => {
            return (
              <div
                style={{
                  minWidth: "110px",
                }}
              >
                <Switch
                  checked={Boolean(Math.round(Math.random()))}
                  onChange={() => {
                    // setAccountAction(_.get(rowIndex, "rowData"));
                    // setModalTitle({
                    //   ...modalTitle,
                    //   title:
                    //     _.get(rowIndex, "rowData[7]") === 0
                    //       ? "Khóa tài khoản"
                    //       : "Kích hoạt tài khoản",
                    //   description:
                    //     _.get(rowIndex, "rowData[7]") === 0
                    //       ? "Bạn có muốn khóa tài khoản này?"
                    //       : "Bạn có muốn kích hoạt tài khoản này?",
                    // });
                    // setOpenModal(true);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                  color='primary'
                />
              </div>
            );
          },
        },
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(listCourseApi());
  }, []);
  const handleRowClick = (values) => {
    console.log(values);
  };
  useEffect(() => {
    if (courses) {
      let tmp = _.map(courses, (course) => {
        return {
          id: course?.id,
          category: course.category,
          fullname: course.fullname,
          startdate: course.startdate,
          enddate: course.enddate,
          timecreated: course.timecreated,
          timemodified: course.timemodified,
          shortname: course.shortname,
          studentCount: Math.round(Math.random() * 20),
        };
      });
      setTmp(tmp);
    }
  }, [courses]);
  if (fetchCourseLoading) return <Loading />;
  console.log(courses);
  return (
    <>
      <Grid container>
        <Typography marginBlock='20px' fontSize='32px' color='primary'>
          Danh sách khóa học
        </Typography>
      </Grid>
      <Grid container>
        <TableComponent
          column={columns}
          data={tmp}
          // setPage={setPage}
          count={_.size(tmp)}
          // pageIndex={page}
          // skip={skip}
          // setSkip={setSkip}
          loading={fetchCourseLoading}
          onRowClick={handleRowClick}
          // disablePagination={true}
          autoPagination={true}
        />
      </Grid>
      {/* <ModalConfirm
        loading={false}
        open={openModal}
        submit={() => handleAccepted(accountAction)}
        title={modalTitle.title}
        description={modalTitle.description}
        handleClose={(e) => setOpenModal(false)}
      /> */}
    </>
  );
};

export default Courses;

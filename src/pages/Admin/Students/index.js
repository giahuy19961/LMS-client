import {
  CircularProgress,
  Grid,
  ToggleButton,
  Typography,
} from "@mui/material";
import { studentsApi } from "app/reducers/studentsReducer";
import TableComponent from "components/TableComponent";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FORMAT_DATE_TIME } from "constants/defines";
import _ from "lodash";
import { Switch } from "@mui/material";
import ModalConfirm from "components/ModalConfirm";
import { userService } from "services";
import swal from "sweetalert";

const Students = () => {
  const dispatch = useDispatch();
  const { loading: loadingStudents, data: students } = useSelector(
    (state) => state.studentsReducer
  );
  const [modalTitle, setModalTitle] = useState({
    title: "Kích hoạt tài khoản",
    description: "Bạn có muốn kích hoạt tài khoản này",
  });
  const [studentTmp, setStudentTmp] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [accountAction, setAccountAction] = useState([]);

  const handleAccepted = async (accountAction) => {
    let id = accountAction[0];
    let status = accountAction[7] === 0 ? 1 : 0;
    let email = accountAction[4];
    try {
      let resp = await userService.unlockUser({ id, status, email });
      console.log(resp);
      return swal({ title: resp?.data?.message, icon: "success" }).then(
        (res) => {
          setOpenModal(false);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const columns = useMemo(
    () => [
      {
        name: "id",
        options: {
          display: false,
        },
      },
      {
        name: "username",
        label: "Tên đăng nhập",
        options: {
          customBodyRender: (dataIndex, rowIndex) => {
            return <div style={{ minWidth: "179px" }}>{dataIndex}</div>;
          },
        },
      },
      {
        name: "firstname",
        label: "Họ",
        options: {
          customBodyRender: (dataIndex, rowIndex) => {
            return <div style={{ minWidth: "79px" }}>{dataIndex}</div>;
          },
        },
      },
      {
        name: "lastname",
        label: "Tên",
        options: {
          customBodyRender: (dataIndex, rowIndex) => {
            return <div style={{ minWidth: "179px" }}>{dataIndex}</div>;
          },
        },
      },
      {
        name: "email",
        label: "Email",
        options: {
          customBodyRender: (dataIndex, rowIndex) => {
            return <div style={{ minWidth: "179px" }}>{dataIndex}</div>;
          },
        },
      },

      {
        name: "created",
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
        name: "updated",
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
        name: "suspended",
        label: "Tình trạng",
        options: {
          customBodyRender: (dataIndex, rowIndex) => {
            return (
              <div
                style={{
                  minWidth: "110px",
                }}
              >
                <Typography
                  fontWeight={600}
                  color={dataIndex === 1 ? "secondary" : "primary"}
                >
                  {dataIndex === 1 ? "Chưa xét duyêt" : "Đã xét duyệt"}
                </Typography>
              </div>
            );
          },
        },
      },
      {
        name: "action",
        label: "Xét duyệt",
        options: {
          customBodyRender: (dataIndex, rowIndex) => {
            return (
              <div
                style={{
                  minWidth: "110px",
                }}
              >
                {/* <Typography
                  fontWeight={600}
                  color={dataIndex === 1 ? "secondary" : "primary"}
                >
                  {dataIndex === 1 ? "Chưa xét duyêt" : "Đã xét duyệt"}
                </Typography> */}
                <Switch
                  checked={_.get(rowIndex, "rowData[7]") === 0}
                  onChange={() => {
                    setAccountAction(_.get(rowIndex, "rowData"));
                    setModalTitle({
                      ...modalTitle,
                      title:
                        _.get(rowIndex, "rowData[7]") === 0
                          ? "Khóa tài khoản"
                          : "Kích hoạt tài khoản",
                      description:
                        _.get(rowIndex, "rowData[7]") === 0
                          ? "Bạn có muốn khóa tài khoản này?"
                          : "Bạn có muốn kích hoạt tài khoản này?",
                    });
                    setOpenModal(true);
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
  const handleRowClick = (values) => {
    console.log(values);
  };

  useEffect(() => {
    if (students) {
      setStudentTmp(_.filter(students, (student) => student.id !== 1));
    }
  }, [students]);

  useEffect(() => {
    if (!openModal) {
      dispatch(studentsApi());
    }
  }, [openModal]);

  // if (loadingStudents) return <CircularProgress />;

  return (
    <>
      <Grid container>
        <Typography marginBlock='20px' fontSize='32px' color='primary'>
          Danh sách học viên
        </Typography>
      </Grid>
      <Grid container>
        <TableComponent
          column={columns}
          data={studentTmp}
          // setPage={setPage}
          count={_.size(students)}
          // pageIndex={page}
          // skip={skip}
          // setSkip={setSkip}
          loading={loadingStudents}
          onRowClick={handleRowClick}
          // disablePagination={true}
          autoPagination={true}
        />
      </Grid>
      <ModalConfirm
        loading={false}
        open={openModal}
        submit={() => handleAccepted(accountAction)}
        title={modalTitle.title}
        description={modalTitle.description}
        handleClose={(e) => setOpenModal(false)}
      />
    </>
  );
};

export default Students;

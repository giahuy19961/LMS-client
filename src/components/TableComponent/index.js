import _ from "lodash";
import {
  FormControl,
  IconButton,
  MenuItem,
  NativeSelect,
  Select,
  TablePagination,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles, useTheme } from "@mui/styles";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
  FirstPage as FirstPageIcon,
} from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import theme from "../../styles/theme";
import LoadingTableBody from "./LoadingTableBody";
import { ROWS_PERPAGE_OPTIONS } from "../../constants/defines";
import { useDebounce } from "use-debounce";

const tableTheme = createTheme({
  components: {
    backgroundColor: "red",
    MuiPaper: {
      backgroundColor: "#fff",
      styleOverrides: {
        root: {
          minWidth: "calc(100% - 16px)",
          maxWidth: "calc(100vw - 360px)",
          overflowX: "auto",
          boxShadow: "none",
        },
      },
    },
    // MuiToolbar: {
    //   styleOverrides: {
    //     root: {
    //       display: "none"
    //     }
    //   }
    // },
    MuiTable: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "Montserrat, sans-serif",
          color: "#0A2240",
          textAlign: "center",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey.main,
          "& .MuiTableRow-head": {},

          "& .MuiTableCell-head": {
            fontWeight: "600 ",
            fontSize: "16px",
            lineHeight: "20px",
            minWidth: "80px",
            color: theme.palette.secondary,
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          "& .MuiTablePagination-select": {
            border: "1px solid #E2e1e1",
            borderRadius: "13px",
            fontFamily: "Montserrat, sans-serif",
          },
          "& .MuiTablePagination-selectLabel": {
            fontFamily: "Montserrat, sans-serif",
          },
          "& .MuiTablePagination-displayedRows": {
            fontFamily: "Montserrat, sans-serif",
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "& .MuiCheckbox-root .Mui-checked > svg": {
            color: "#000 !important",
          },
        },
      },
    },
  },
});

const TablePaginationActions = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));

  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = () => {
    onPageChange(0);
  };

  const handleBackButtonClick = () => {
    onPageChange(page - 1);
  };

  const handleNextButtonClick = () => {
    onPageChange(page + 1);
  };

  const handleLastPageButtonClick = () => {
    onPageChange(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const list = [];
  for (let i = 0; i < Math.ceil(count / rowsPerPage); i++) {
    list.push(i);
  }

  return (
    <div className={classes.root}>
      {/* <FormControl>
        <Select
          variant="standard"
          value={page}
          onChange={(e)=> {
            onPageChange(e.target.value)
          }}
        >
          { 
            _.map(list, item => <MenuItem key={item} value={item}>{item+1}</MenuItem>)
          }
        </Select>
      </FormControl> */}

      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>

      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>

      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

const TableComponent = ({
  data = [],
  count = 0,
  column,
  onRowClick,
  pageIndex = 0,
  setPage,
  skip,
  setSkip,
  autoPagination = false,
  rowsPerPage = 10,
  setRowsPerPage,
  loading = true,
  selectableRows = "none",
  selectableRowsHeader = false,
  selectableRowsOnClick = false,
  onRowSelectionChange,
  disablePagination = false,
  selectToolbarPlacement,
  setRowProps,
}) => {
  const BodyComponent = useMemo(
    () => (props) => <LoadingTableBody loading={loading} {...props} />,
    [loading]
  );

  const [pageInput, setPageInput] = useState(pageIndex + 1);
  const [value] = useDebounce(pageInput, 1000);

  const handlePageChange = (newPage) => {
    // setPage(newPage);
    setPageInput(newPage + 1);
    // setSkip(newPage * rowsPerPage);
  };

  useEffect(() => {
    let pageInput = Number(value);
    if (pageInput === NaN || pageInput < 1) {
      setPageInput(1);
    } else if (pageInput === 1) {
      _.isFunction(setPage) && setPage(0);
      _.isFunction(setSkip) && setSkip(0);
    } else if (pageInput > Math.ceil(count / rowsPerPage)) {
      setPageInput(Math.ceil(count / rowsPerPage));
    } else {
      _.isFunction(setPage) && setPage(pageInput - 1);
      _.isFunction(setSkip) && setSkip((pageInput - 1) * rowsPerPage);
    }
  }, [value]);

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    const page = ~~((rowsPerPage * pageIndex) / newRowsPerPage);
    _.isFunction(setPage) && setPage(page);
    setSkip(page * newRowsPerPage);
    setPageInput(1);
  };

  useEffect(() => {
    if (skip === 0) {
      setPageInput(1);
    }
  }, [skip]);

  return (
    <ThemeProvider theme={tableTheme}>
      <MUIDataTable
        data={data}
        columns={column}
        components={{ TableBody: BodyComponent }}
        options={{
          filter: false,
          download: false,
          search: false,
          print: false,
          viewColumns: false,
          selectableRows: selectableRows,
          selectableRowsHeader: selectableRowsHeader,
          fixedHeader: false,
          sort: false,
          onRowClick: onRowClick,
          pagination: autoPagination,
          onRowSelectionChange: onRowSelectionChange,
          selectableRowsOnClick: selectableRowsOnClick,
          selectToolbarPlacement: selectToolbarPlacement,
          customToolbarSelect: () => {},
          setRowProps: setRowProps,
          textLabels: {
            body: {
              noMatch: "Chưa có dữ liệu phù hợp",
            },
          },
        }}
      />
      {!autoPagination && !disablePagination && !_.isEmpty(data) && (
        <TablePagination
          style={{ marginTop: 32 }}
          labelRowsPerPage='Số dòng mỗi trang'
          labelDisplayedRows={(props) => {
            const { count, page, from, to } = props;
            const list = [];
            for (let i = 0; i < Math.ceil(count / rowsPerPage); i++) {
              list.push(i);
            }
            return (
              <FormControl
                style={{
                  position: "relative",
                  paddingRight: 20,
                  paddingLeft: 170,
                }}
              >
                <span style={{ position: "absolute", left: "-22px" }}>
                  Trang
                </span>
                <div
                  style={{
                    position: "absolute",
                    left: "25px",
                    top: "-5px",
                    display: "flex",
                    gap: "2px",
                    alignItems: "center",
                  }}
                >
                  <input
                    style={{
                      outline: "none",
                      borderRadius: "15px",
                      border: "1px solid #ccc",
                      width: "40px",
                      height: "25px",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "normal",
                    }}
                    type='number'
                    value={pageInput}
                    onChange={(e) => {
                      setPageInput(e.target.value);
                    }}
                    disabled={count === 0}
                  />
                  /<span>{Math.ceil(count / rowsPerPage)}</span>
                </div>

                <div
                  style={{
                    position: "absolute",
                    right: "-10px",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <span>
                    {(pageIndex + 1) * rowsPerPage < count
                      ? `${from}-${from + rowsPerPage}`
                      : `${from}-${to}`}
                  </span>
                  <span>/</span>
                  <span>{`${count}`}</span>
                </div>
              </FormControl>
            );
          }}
          component='div'
          count={count}
          onPageChange={handlePageChange}
          page={pageIndex}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={ROWS_PERPAGE_OPTIONS}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      )}
    </ThemeProvider>
  );
};

export default TableComponent;

import _ from "lodash";
import React, { Fragment } from "react";
import {
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Grid,
  Link as LinkMaterial,
  Typography,
} from "@mui/material";
import { Link, useHistory, useLocation, matchPath } from "react-router-dom";
import {
  Home as HomeIcon,
  MonetizationOn as MonetizationOnIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Verified as VerifiedIcon,
  EventNote as EventNoteIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import logo from "../assets/image/cyberlogo.png";

import swal from "sweetalert";
import { slugs } from "constants/slugs";
// import { user } from "../constants/user";
// import { useMutation } from "@apollo/client";

const DrawerCustom = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerWidth }) => ({
  "& .MuiDrawer-paper": {
    background: "#00837B",
    color: "#fff",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

    "& ul > li": {
      height: "80px",
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      display: "flex",

      "&.active": {
        background: "rgba(0, 0, 0, 0.1)",
        borderBottom: "2px solid #DA6744",
      },
    },

    "& a": {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      "& > div": {
        color: "#fff",
        "& > span": {
          fontWeight: "bold",
        },
      },
    },

    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),

    ...(open
      ? {
          "& ul > li > a > div:first-child": {
            minWidth: "unset",
            padding: `0 ${theme.spacing(2)} 0 0`,
          },
        }
      : {
          "& ul > li > a > div:first-child": {
            minWidth: "unset",
          },
          "& ul > li > a > div:last-child": {
            display: "none",
          },
        }),
  },
}));

const MainMenu = ({ drawerWidth, open, toggleDrawer, setAuth }) => {
  const history = useHistory();
  const location = useLocation();
  //   const [deleteDevice] = useMutation(DELETE_DEVICE_BY_ACCOUNT);

  const menuList = [
    {
      id: 1,
      name: "Trang ch???",
      icon: <HomeIcon />,
      link: `${slugs.home}`,
      exact: true,
    },

    // {
    //   id: 3,
    //   name: "Qu???n l?? kh??ch h??ng",
    //   icon: <AccountBalanceWalletIcon />,
    //   // link: `${slugs.customer}`,
    //   exact: false,
    // },
    {
      id: 2,
      name: "Qu???n l?? kh??a h???c",
      icon: <VerifiedIcon />,
      link: `${slugs.adminCourse}`,
      exact: false,
    },
    {
      id: 3,
      name: "Qu???n l?? sinh vi??n",
      icon: <SupervisorAccountIcon />,
      link: `${slugs.adminStudent}`,
      exact: false,
    },
    {
      id: 4,
      name: "Qu???n l?? gi??o vi??n",
      icon: <EventNoteIcon />,
      link: `${slugs.adminTeacher}`,
      exact: false,
    },
    // {
    //   id: 5,
    //   name: "Qu???n l?? doanh thu",
    //   icon: <MonetizationOnIcon />,
    //   link: `${slugs.adminSalary}`,
    //   exact: false,
    // },

    // {
    //   id: 6,
    //   name: "Qu???n l?? kh??c",
    //   icon: <EventNoteIcon />,
    //   // link: `${slugs.setting}`,
    //   exact: false,
    // },
    // {
    //   id: 7,
    //   name: "????ng xu???t",
    //   icon: <ExitToAppIcon />,
    //   exact: true,
    //   onClick: () => {
    //     swal({
    //       title: "B???n c?? ch???c mu???n ????ng xu???t?",
    //       icon: "warning",
    //       buttons: ["H???y", "????ng xu???t"],
    //       dangerMode: true,
    //     }).then((isSignOut) => {
    //       if (isSignOut) {
    //         setAuth(false);
    //         user.reset();
    //         if (localStorage.getItem("notify_token")) {
    //           deleteDevice({
    //             variables: {
    //               device_token: localStorage.getItem("notify_token"),
    //             },
    //           });
    //         }
    //         history.push("/login");
    //       }
    //     });
    //   },
    // },
  ];

  return (
    <DrawerCustom variant='permanent' drawerWidth={drawerWidth} open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
        }}
      >
        {open ? (
          <Fragment>
            <img
              src={logo}
              alt='cyberlearn'
              style={{
                // paddingLeft: "16px",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                margin: "20px",
              }}
            />
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon style={{ color: "#fff" }} />
            </IconButton>
          </Fragment>
        ) : (
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              margin: "auto",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      <List style={{ marginTop: "80px" }}>
        {menuList.map((item, index) => {
          return (
            <ListItem
              key={index}
              className={
                _.get(
                  matchPath(location.pathname, { path: item.link }),
                  "isExact"
                ) ||
                item?.exact ===
                  _.get(
                    matchPath(location.pathname, { path: item.link }),
                    "isExact"
                  )
                  ? "active"
                  : undefined
              }
            >
              {item.id === 7 ? (
                <LinkMaterial
                  onClick={item.onClick}
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    textDecoration: "none",
                    justifyContent: "flex-start",
                    fontWeight:
                      _.get(
                        matchPath(location.pathname, { path: item.link }),
                        "isExact"
                      ) ||
                      item?.exact ===
                        _.get(
                          matchPath(location.pathname, { path: item.link }),
                          "isExact"
                        )
                        ? "bold"
                        : undefined,
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <Typography fontWeight={"normal"} color='#fff'>
                    {item.name}
                  </Typography>
                </LinkMaterial>
              ) : (
                <Link
                  to={item.link}
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    justifyContent: "flex-start",
                    textDecoration: "none",
                  }}
                >
                  <ListItemIcon style={{ marginRight: open ? "0px" : "40px" }}>
                    {item.icon}
                  </ListItemIcon>
                  <Typography
                    fontWeight={
                      _.get(
                        matchPath(location.pathname, { path: item.link }),
                        "isExact"
                      ) ||
                      item?.exact ===
                        _.get(
                          matchPath(location.pathname, { path: item.link }),
                          "isExact"
                        )
                        ? "bold"
                        : "normal"
                    }
                    color='#fff'
                  >
                    {item.name}
                  </Typography>
                </Link>
              )}
            </ListItem>
          );
        })}
      </List>
    </DrawerCustom>
  );
};

export default MainMenu;

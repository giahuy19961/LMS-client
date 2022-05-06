import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";

const DefaultLayout = (props) => {
  const { userInfo, loading, access_token } = useSelector(
    (state) => state.authReducer
  );
  if (loading) return <CircularProgress />;
  return (
    <>
      <Header userInfo={userInfo} />
      <div style={{ padding: "2rem 7%" }}>{props.children}</div>
      <Footer />
    </>
  );
};

export default DefaultLayout;

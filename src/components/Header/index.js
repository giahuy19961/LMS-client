import React from "react";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch } from "react-redux";
import { userLogout } from "app/reducers/authReducer";

const Header = ({ userInfo }) => {
  const dispatch = useDispatch();
  return (
    <header>
      <a href='#' class='logo'>
        Cyber<span>Center</span>
      </a>

      <div id='menu' class='fas fa-bars'></div>

      <nav class='navbar' style={{ display: "flex" }}>
        <Link to='/'>Trang chủ</Link>
        <Link to='/course'>Khóa học</Link>
        {/* <Link href='teacher.html'>Giáo viên</Link> */}
        <Link to='/fee'>Học Phí</Link>
        <Link to='/contact'>Liên hệ</Link>
        {userInfo !== null ? (
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {" "}
            <Link
              to='/me'
              style={{ color: "var(--pink)", textTransform: "capitalize" }}
            >{`Hi ! ${userInfo?.firstName} ${userInfo?.lastName}`}</Link>
            <ExitToAppIcon
              onClick={() => dispatch(userLogout())}
              style={{ fontSize: "32px", color: "var(--pink)" }}
            />
          </div>
        ) : (
          <>
            <Link to='/login'>Đăng nhập</Link>
            <Link to='/register'>Đăng ký</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

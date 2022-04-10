import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <a href='#' class='logo'>
        BKU<span>University</span>Demo
      </a>

      <div id='menu' class='fas fa-bars'></div>

      <nav class='navbar'>
        <Link to='/'>Trang chủ</Link>
        <Link to='/course'>Khóa học</Link>
        {/* <Link href='teacher.html'>Giáo viên</Link> */}
        <Link to='/fee'>Học Phí</Link>
        <Link to='/contact'>Liên hệ</Link>
        <Link to='/login'>Đăng nhập</Link>
      </nav>
    </header>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className='footer'>
      <div className='box-container'>
        <div className='box'>
          <h3>Về chúng tôi</h3>
          <p>
            Là một trong những ngôi trường hàng đầu về kỹ thuật tại việt nam.
          </p>
        </div>
        <div className='box'>
          <h3>Chọn link nhanh</h3>
          <Link to='/'>Trang chủ</Link>
          <Link to='/course'>Khóa học</Link>
          <Link to='/fee'>Học phí</Link>
          <Link to='/contact'>Liên hệ</Link>
        </div>
        <div className='box'>
          <h3>Liên hệ khác</h3>
          <a href='#'>facebook</a>
          <a href='#'>twitter</a>
          <a href='#'>instagram</a>
          <a href='#'>linkedin</a>
        </div>
        <div className='box'>
          <h3>Liên hệ với chúng tôi</h3>
          <p>
            <i className='fas fa-phone' /> +123-456-7890
          </p>
          <p>
            <i className='fas fa-envelope' /> elearning@hcmut.edu.vn
          </p>
          <p>
            <i className='fas fa-map-marker-alt' /> Nhà A1- 268 Lý Thường Kiệt,
            Phường 14, Quận 10, Tp.HCM
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;

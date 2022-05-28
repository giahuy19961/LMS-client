import React, { useEffect } from "react";
import cyberLogo from "../../assets/image/cyberlogo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enrolmentsApi } from "app/reducers/enrolmentsReducer";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      dispatch(enrolmentsApi({ userid: userInfo.id }));
    }
  }, [userInfo]);
  return (
    <section className='home'>
      <div className='content'>
        <h3>Chào mừng đến hệ thống CyberCenter</h3>
        <p>
          Là một trung tâm lâu đời đào tạo kỹ thuật tại TPHCM với hàng chục
          nghìn học viên hàng năm
        </p>
        <Link to='/course' className='btn'>
          {" "}
          Đến khóa học
        </Link>
      </div>
      <div className='image'>
        <img
          src={cyberLogo}
          alt='CYBER LOGO'
          style={{ height: "300px", width: "500px" }}
        />
      </div>
    </section>
  );
};

export default HomePage;

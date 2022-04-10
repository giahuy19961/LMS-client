import React from "react";
import bkuLogo from "../../assets/image/bku.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className='home'>
      <div className='content'>
        <h3>Chào mừng đến hệ thống BKELEARNING V2</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
          repellat aperiam libero, beatae debitis iusto quia sit aliquid placeat
          facilis?
        </p>
        <Link to='/course' className='btn'>
          {" "}
          Đến khóa học
        </Link>
      </div>
      <div className='image'>
        <img src={bkuLogo} alt />
      </div>
    </section>
  );
};

export default HomePage;

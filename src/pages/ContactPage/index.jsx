import React from "react";
import contactImg from "../../assets/image/contact-img.svg";

const ContactPage = () => {
  return (
    <div>
      <h1 className='heading-contact'>liên hệ với chúng tôi</h1>
      <section className='contact'>
        <div className='image'>
          <img src={contactImg} alt='contactImg' />
        </div>
        <form action>
          <div className='inputBox'>
            <input type='text' placeholder='Họ và tên' />
            <input type='email' placeholder='email' />
          </div>
          <input type='text' placeholder='Tiêu đề' className='box' />
          <textarea
            placeholder='Tin nhắn'
            name
            id
            cols={30}
            rows={10}
            defaultValue={""}
          />
          <input type='submit' className='btn' defaultValue='send' />
        </form>
      </section>
    </div>
  );
};

export default ContactPage;

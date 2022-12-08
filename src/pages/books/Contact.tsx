import React from "react";
import { useState } from "react";
import ContactStyles from "../../styles/books/_Contact.module.scss";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
import { contactHotelList,contactReserveList,contactAtherList } from "../../components/books/contactItem";
import { Link as Scroll } from 'react-scroll';

const Contact = () => {

  const [openHotelAnswer, setOpenHotelAnswer] = useState<any>({ 0: false });
  const [openReserveAnswer, setOpenReserveAnswer] = useState<any>({ 0: false });
  const [openAtherAnswer, setOpenAtherAnswer] = useState<any>({ 0: false });

  const handleOpenHotelAnswer = (index: any) => {
    setOpenHotelAnswer((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleOpenReserveAnswer = (index: any) => {
    setOpenReserveAnswer((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleOpenAtherAnswer = (index: any) => {
    setOpenAtherAnswer((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };


  return (
    <>
      <Header />
      <div className={ContactStyles.contactContainer}>
        <h1>よくあるご質問</h1>
        <div className={ContactStyles.contactBtn}>
          <button><Scroll to="Hotel" smooth={true}>ホテルに関するご質問</Scroll></button>
          <button><Scroll to="Reserve" smooth={true}>予約に関するご質問</Scroll></button>
          <button><Scroll to="Ather" smooth={true}>その他</Scroll></button>
        </div>
        <div className={ContactStyles.contactItem}>
            <h2 className={ContactStyles.contactSubTitle} data-number="01" id="Hotel"><span>ホテルに関するご質問</span></h2>
          {contactHotelList.map((contact: any, index: any) => {
            return (
              <>
                <div
                  onClick={() => handleOpenHotelAnswer(index)}
                  className={ContactStyles.contactQuestion}
                >
                  {contact.question}
                </div>
                {openHotelAnswer[index] ? (
                  <div className={ContactStyles.contactAnswer}>
                    {contact.answer}
                  </div>
                ) : undefined}
              </>
            );
          })}
          <h2 className={ContactStyles.contactSubTitle} data-number="02" id="Reserve"><span>予約に関するご質問</span></h2>
          {contactReserveList.map((contact: any, index: any) => {
            return (
              <>
                <div
                  onClick={() => handleOpenReserveAnswer(index)}
                  className={ContactStyles.contactQuestion}
                >
                  {contact.question}
                </div>
                {openReserveAnswer[index] ? (
                  <div className={ContactStyles.contactAnswer}>
                    {contact.answer}
                  </div>
                ) : undefined}
              </>
            );
          })}
          <h2 className={ContactStyles.contactSubTitle} data-number="03" id="Ather"><span>その他のご質問</span></h2>
          {contactAtherList.map((contact: any, index: any) => {
            return (
              <>
                <div
                  onClick={() => handleOpenAtherAnswer(index)}
                  className={ContactStyles.contactQuestion}
                >
                  {contact.question}
                </div>
                {openAtherAnswer[index] ? (
                  <div className={ContactStyles.contactAnswer}>
                    {contact.answer}
                  </div>
                ) : undefined}
              </>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;

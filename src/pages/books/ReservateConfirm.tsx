import React, { useState } from "react";
import { ReservateConfirmContents } from "../../components/ReservateConfirmContents"
import ReservateConfirmStyles from  "../../styles/books/ReservateConfirm.module.scss";
import { Link } from "react-router-dom";

const ReservateConfirm = () => {
  const [openDisplay, setOpenDisplay] = useState(false);
  const [guideMessage, setGuideMessage] = useState('block');

  const handleClick = () => {
      setOpenDisplay(true);
      setGuideMessage('none');
      //ログイン認証（ログインしている場合、ログイン・会員登録コンポーネントは非表示にする）

  };

  return (
    <>
      <div>
        <h1 className={ReservateConfirmStyles.reservateconfirmTitle}>予約内容の確認</h1>
        <div className={ReservateConfirmStyles.reservateLogin}>
          <div className={ReservateConfirmStyles.registerComplete}>
            <h3>会員登録済みのお客様</h3>
            <div>ログインコンポーネント</div>
          </div>
          <div className={ReservateConfirmStyles.registerIncomplete}>
            <h3>会員未登録のお客様</h3>
            <button>会員登録する</button>
          </div>
        </div>
        <div className={ReservateConfirmStyles.reservateGuide}>
          <p style={{ display: guideMessage }}>
            会員登録せずに予約する方は&nbsp;
            <button onClick={handleClick}>こちら</button>
          </p>
        </div>
        <div>
          {openDisplay ? (<ReservateConfirmContents />) : ("")}
        </div>
      </div>
    </>
  );
};

export default ReservateConfirm;

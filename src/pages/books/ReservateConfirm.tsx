import React, { useState } from "react";
import { ReservateConfirmContents } from "../../components/ReservateConfirmContents";
import "../../styles/ReservateConfirm.scss";
import { Link } from "react-router-dom";

const ReservateConfirm = () => {
  const [openDisplay, setOpenDisplay] = useState(false);

  const handleClick = () => {
      setOpenDisplay(true);

  };

  return (
    <>
      <div>
        <h1 className="reservateconfirm-title">予約内容の確認</h1>
        <div className="reservate-login">
          <div className="register-complete">
            <h3>会員登録済みのお客様</h3>
            <div>ログインコンポーネント</div>
          </div>
          <div className="register-incomplete">
            <h3>会員未登録のお客様</h3>
            <button>会員登録する</button>
          </div>
        </div>
        <div className="reservate-guide">
          <p>
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

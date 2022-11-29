import React, { useEffect } from "react";
import style from "../../styles/input.module.css";
import { useState } from "react";
import { MailInput } from "../../components/form/mailInput";
import { PasswordInput } from "../../components/form/passwordInput";
import SearchStyle from "../../styles/rooms/_Search.module.scss";
import LoginStyle from "../../styles/users/_login.module.scss";
import { auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
import { useLocation } from "react-router-dom";
import { addDoc, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import db from "../../Firebase";

export const Login = () => {
  // ログインのstatus管理
  const [user] = useAuthState(auth);

    // データの受け渡しのため
    const navigation = useNavigate();
  // const router = useRouter();

  const [mailValue, SetMailValue] = useState("");
  const [mailErrorState, SetMailErrorState] = useState("init");

  const [passwordValue, SetPasswordValue] = useState("");
  const [passwordErrorState, SetPasswordErrorState] = useState("init");

  const [errorFlag, SetErrorFlag] = useState("false");

  const [cookie, SetCookie] = useState("")

  // 画面遷移関数
  const navigate = useNavigate();

  // cookie取り出し
  const splitCookie = document.cookie.split(';');
  const list:any = [];

  useEffect(() => {

    for (let i = 0; i < splitCookie.length; i++) {
      list.push(splitCookie[i].split('='));
    }

    list.map((data:any, index:number) => {
      // cookieにconfirmが含まれている場合、予約確認画面へ遷移
      if (data.includes("confirm")) {
        SetCookie(data[1])
      }
    })
  })

  const location = useLocation()
  
  // yarn add react-firebase-hooks/authしてください
  const login = () => {
    // 仮予約データ受け取り
    const data = location.state;
    console.log("j",data)
  
    if (mailErrorState === "ok" && passwordErrorState === "ok") {
      // ログインしているか判定
      if (!user) {
        // react-hook ログイン関数
        signInWithEmailAndPassword(auth, mailValue, passwordValue).then(
          (user) => {
            if(cookie === "confirm"){
              alert("ログイン成功");
              data.mail = user.user.email
              // const reserveData = collection(db, "reserve");
              // addDoc(reserveData, data);
              // navigate("/books/ReservateConfirm");
              navigation("/books/ReservateConfirm", { state: data });

            }else{
              alert("ログイン成功");
              navigate("/");
            }
            
          },
          (err) => {
            alert("メールアドレスかパスワードが違います");
          }
        );
      } else {
        alert("既にログインしています");
      }
    } else {
      SetErrorFlag("true");
    }
  };

  return (
    <>
      <Header />
      <div className={`${LoginStyle.main} `}>
        <form className={` ${LoginStyle.form}`}>
          <h2 className="my-5 ml-5 ">ログイン</h2>
          <hr className="border border-1 border-gray-300 bg-gray-300" />

          <MailInput
            mailValue={mailValue}
            SetMailValue={SetMailValue}
            mailErrorState={mailErrorState}
            SetMailErrorState={SetMailErrorState}
            errorFlag={errorFlag}
            displayFlag={true}
          />
          <hr />

          <PasswordInput
            passwordValue={passwordValue}
            SetPasswordValue={SetPasswordValue}
            passwordErrorState={passwordErrorState}
            SetPasswordErrorState={SetPasswordErrorState}
            errorFlag={errorFlag}
            displayFlag={true}
            page="login"
            confirmPasswordValue={passwordValue}
            SetConfirmPasswordErrorState={SetPasswordErrorState}
          />
          <hr />

          <div
            className={`items-center justify-center flex flex-wrap my-4 ${LoginStyle.buttonGroup}`}
          >
            {/* Primary Button */}
            <button
              type="button"
              className={`${SearchStyle.searchbtn}  ${LoginStyle.LoginButton}`}
              onClick={login}
            >
              ログイン
            </button>

          </div>

        </form>
      </div>
      <Footer />
    </>
  );
};

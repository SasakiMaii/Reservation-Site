import React from "react";
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

export const Login = () => {
  // ログインのstatus管理
  const [user] = useAuthState(auth);

  // const router = useRouter();

  const [mailValue, SetMailValue] = useState("");
  const [mailErrorState, SetMailErrorState] = useState("init");

  const [passwordValue, SetPasswordValue] = useState("");
  const [passwordErrorState, SetPasswordErrorState] = useState("init");

  const [errorFlag, SetErrorFlag] = useState("false");

  // 画面遷移関数
  const navigate = useNavigate();

  const clear = () => {
    SetMailErrorState("init");
    SetPasswordErrorState("init");

    SetMailValue("");
    SetPasswordValue("");

    SetErrorFlag("false");
  };

  // yarn add react-firebase-hooks/authしてください
  const login = () => {
    if (mailErrorState === "ok" && passwordErrorState === "ok") {
      // ログインしているか判定
      if (!user) {
        // react-hook ログイン関数
        signInWithEmailAndPassword(auth, mailValue, passwordValue).then(
          (user) => {
            alert("ログイン成功");
            navigate("/"); //  画面遷移
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

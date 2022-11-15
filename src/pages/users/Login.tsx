import React from 'react'
import style from "../../styles/input.module.css"
import { useState } from 'react'
import { MailInput } from '../../components/form/mailInput'
import { TelInput } from '../../components/form/telInput'
import { ZipInput } from '../../components/form/zipInput'
import { AddressInput } from '../../components/form/addressInput'
import { PasswordInput } from '../../components/form/passwordInput'
import { NameInput } from '../../components/form/nameInput'
import { ConfirmPasswordInput } from '../../components/form/confirmPassword'
import PrimaryButton from '../../components/button/PrimaryButton'
// import { useRouter } from 'next/router'
import SearchStyle from "../../styles/rooms/_Search.module.scss";
import LoginStyle from "../../styles/users/_login.module.scss"
import { auth, provider } from '../../Firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { doc } from 'firebase/firestore';
import Header from "../../components/layout/Header";




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
    SetMailErrorState("init")
    SetPasswordErrorState("init")

    SetMailValue("")
    SetPasswordValue("")

    SetErrorFlag("false");
  }


  // yarn add react-firebase-hooks/authしてください
  const login = () => {
    if (
      mailErrorState === "ok" &&
      passwordErrorState === "ok"
    ) {

      // ログインしているか判定
      if(!user){

      // react-hook ログイン関数 
      signInWithEmailAndPassword(auth, mailValue, passwordValue)
        .then(user => {
          alert("ログインしました。")
          navigate('/');  //  画面遷移
          // console.log(user.user.email)
        }, err => {
          alert("メールアドレスかパスワードが違います")
        })

      }
      else{
        alert("ログアウトしてください")
      }

    } else {
      SetErrorFlag("true");
    }
  }

  console.log(user)
  return (
    <>
      <Header />
      <div className={`${LoginStyle.main} container`}>

        <form className={` ${LoginStyle.form}`}>
          <h2 className="my-5 ml-5 ">ログイン</h2>
          <hr className="border border-1 border-gray-300 bg-gray-300" />

          <MailInput
            mailValue={mailValue}
            SetMailValue={SetMailValue}
            mailErrorState={mailErrorState} SetMailErrorState={SetMailErrorState}
            errorFlag={errorFlag}
            displayFlag={true}
          />
          <hr />

          <PasswordInput
            passwordValue={passwordValue} SetPasswordValue={SetPasswordValue}
            passwordErrorState={passwordErrorState} SetPasswordErrorState={SetPasswordErrorState}
            errorFlag={errorFlag}
            displayFlag={true}
            page="login"
            confirmPasswordValue={passwordValue}
            SetConfirmPasswordErrorState={SetPasswordErrorState}
          />
          <hr />


          <div className={`items-center justify-center flex flex-wrap my-4 ${LoginStyle.buttonGroup}`}>

            {/* Primary Button */}
            <button
              type="button"
              className={`${SearchStyle.searchbtn}  ${LoginStyle.LoginButton}`}
              onClick={login}
            >ログイン</button>

            {/* クリアボタン */}
            {/* <button type="reset" className={`${LoginStyle.clearBtn}`} onClick={clear}>クリア</button> */}

            {/* Primary Button　サインアウト（仮） */}
            {/* <button
              type="button"
              className={`${SearchStyle.searchbtn}  ${LoginStyle.LoginButton}`}
              onClick={() => {
                auth.signOut()
                  .then(() => {
                    alert("サインアウトしました。")
                  })
              }}
            >サインアウト</button> */}


          </div>
          <div className={` ${LoginStyle.iconGroup}`}>


            <button type="button"  onClick={() => {
              if(!user){
                signInWithPopup(auth, provider)
                .then((users)=>{
                  console.log(auth.currentUser?.displayName)
                  
                })
              }else{
                alert("ログアウトしてください")
              }
            }}>
              <img  src="/btn_google_signin_light_normal_web@2x.png" alt="google-icon"  className={` ${LoginStyle.googleIcon}`} />

            </button>

          </div>

        </form>
      </div>
    </>
  )
}

// auth.currentUser?.photoURL

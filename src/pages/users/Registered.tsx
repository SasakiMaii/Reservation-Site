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
import { GenderInput } from '../../components/form/genderInput'
import PrimaryButton from '../../components/Atoms/button/PrimaryButton'
// import { useRouter } from 'next/router'
import SearchStyle from "../../styles/rooms/_Search.module.scss";
import RegisterStyle from "../../styles/users/_Registered.module.scss"
// firebase import
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../Firebase'
import db from '../../Firebase'
import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth"
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/footer'




export const Registered = () => {
  const [user] = useAuthState(auth);
  // console.log(user)
  // const router = useRouter();

  const [lastNameValue, SetLastNameValue] = useState("");
  const [lastNameErrorState, SetLastNameErrorState] = useState("init");

  const [firstNameValue, SetFirstNameValue] = useState("");
  const [firstNameErrorState, SetFirstNameErrorState] = useState("init");


  const [mailValue, SetMailValue] = useState("");
  const [mailErrorState, SetMailErrorState] = useState("init");

  const [telValue, SetTelValue] = useState("");
  const [telErrorState, SetTelErrorState] = useState("init");

  const [zipValue, SetZipValue] = useState("");
  const [zipErrorState, SetZipErrorState] = useState("init");

  const [addressValue, SetAddressValue] = useState("");
  const [addressErrorState, SetAddressErrorState] = useState("init");

  const [passwordValue, SetPasswordValue] = useState("");
  const [passwordErrorState, SetPasswordErrorState] = useState("init");

  const [confirmPasswordValue, SetConfirmPasswordValue] = useState("");
  const [confirmPasswordErrorState, SetConfirmPasswordErrorState] = useState("init");

  // デフォルトが男性のため（ラジオボタン）
  const [genderValue, SetGenderValue] = useState("男性");


  const [errorFlag, SetErrorFlag] = useState("false");

  const navigate = useNavigate();

  const clear = () => {
    SetLastNameErrorState("init")
    SetFirstNameErrorState("init")
    SetMailErrorState("init")
    SetTelErrorState("init")
    SetZipErrorState("init")
    SetAddressErrorState("init")
    SetPasswordErrorState("init")
    SetConfirmPasswordErrorState("init")

    SetLastNameValue("")
    SetFirstNameValue("")
    SetMailValue("")
    SetTelValue("")
    SetZipValue("")
    SetAddressValue("")
    SetPasswordValue("")
    SetConfirmPasswordValue("")
    SetGenderValue("")


    SetErrorFlag("false");
  }


  const register = () => {
    if (
      firstNameErrorState === "ok" &&
      lastNameErrorState === "ok" &&
      mailErrorState === "ok" &&

      telErrorState === "ok" &&
      zipErrorState === "ok" &&
      addressErrorState === "ok" &&
      passwordErrorState === "ok" &&
      confirmPasswordErrorState === "ok"
    ) {

      // Authentication 新規登録
      createUserWithEmailAndPassword(auth, mailValue, passwordValue)
        .then((user) => {
          // Cloud Firestore user新規登録
          const colRef = collection(db, "user");
          const data = {
            firstname: firstNameValue,
            lastname: lastNameValue,
            mail: mailValue,
            zip: zipValue,
            address: addressValue,
            gender: genderValue,
            tel: telValue,
            password: passwordValue,
          };
          // collection　usersにデータを追加
          addDoc(colRef, data);
        }).then(() => {
          alert("登録しました!")
        }).then(() => {
          navigate('/');
        })
        .catch(error => alert("既に登録されています"));

    } else {
      SetErrorFlag("true");
    }

  }


  return (
    <>
      <Header />
      <div className={`${RegisterStyle.main} container`}>

        <form className={` ${RegisterStyle.form}`}>
          <h2 className="my-5 ml-5 ">基本情報</h2>
          <hr className="border border-1 border-gray-300 bg-gray-300" />

          <NameInput
            lastNameValue={lastNameValue} SetLastNameValue={SetLastNameValue}
            firstNameValue={firstNameValue}
            SetFirstNameValue={SetFirstNameValue}

            firstNameErrorState={firstNameErrorState}
            SetFirstNameErrorState={SetFirstNameErrorState}
            lastNameErrorState={lastNameErrorState}
            SetLastNameErrorState={SetLastNameErrorState}
            errorFlag={errorFlag}
          />
          <hr />

          <GenderInput SetGenderValue={SetGenderValue} />

          <hr />

          <MailInput
            mailValue={mailValue}
            SetMailValue={SetMailValue}
            mailErrorState={mailErrorState} SetMailErrorState={SetMailErrorState}
            errorFlag={errorFlag}
            displayFlag={true}
          />
          <hr />

          <TelInput
            telValue={telValue}
            SetTelValue={SetTelValue}
            telErrorState={telErrorState}
            SetTelErrorState={SetTelErrorState}
            errorFlag={errorFlag}
          />
          <hr />

          <ZipInput
            zipValue={zipValue} SetZipValue={SetZipValue} zipErrorState={zipErrorState} SetZipErrorState={SetZipErrorState}
            errorFlag={errorFlag}
          />
          <hr />

          <AddressInput
            addressValue={addressValue}
            SetAddressValue={SetAddressValue} addressErrorState={addressErrorState} SetAddressErrorState={SetAddressErrorState}
            errorFlag={errorFlag}
          />
          <hr />

          <PasswordInput
            passwordValue={passwordValue} SetPasswordValue={SetPasswordValue}
            passwordErrorState={passwordErrorState} SetPasswordErrorState={SetPasswordErrorState}
            errorFlag={errorFlag}
            displayFlag={true}
            page="register"
            confirmPasswordValue={confirmPasswordValue}
            SetConfirmPasswordErrorState={SetConfirmPasswordErrorState}
          />
          <hr />

          <ConfirmPasswordInput
            confirmPasswordValue={confirmPasswordValue} SetConfirmPasswordValue={SetConfirmPasswordValue} confirmPasswordErrorState={confirmPasswordErrorState} SetConfirmPasswordErrorState={SetConfirmPasswordErrorState}
            errorFlag={errorFlag}

            passwordValue={passwordValue}
          />

          <hr />

          <div className={`items-center justify-center flex flex-wrap my-4 ${RegisterStyle.buttonGroup}`}>

            {/* Primary Button */}
            <button
              type="button"
              className={`${SearchStyle.searchbtn}  ${RegisterStyle.registerButton}`}
              onClick={register}
            >登録</button>


            <button type="reset" className={`text-gray-900 px-4 py-2 rounded-md text-sm mt-5 ${RegisterStyle.clearBtn}`} onClick={clear}>クリア</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}

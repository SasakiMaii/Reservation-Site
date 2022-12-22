import React from 'react'
import style from "../../styles/input.module.css"
import { useState } from 'react'
import { MailInput } from '../../components/Organisms/form/mailInput'
import { TelInput } from '../../components/Organisms/form/telInput'
import { ZipInput } from '../../components/Organisms/form/zipInput'
import { AddressInput } from '../../components/Organisms/form/addressInput'
import { PasswordInput } from '../../components/Organisms/form/passwordInput'
import { NameInput } from '../../components/Organisms/form/nameInput'
import { ConfirmPasswordInput } from '../../components/Organisms/form/confirmPassword'
import { GenderInput } from '../../components/Organisms/form/genderInput'
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
import { useSelector } from 'react-redux'
import Head from '../../components/layout/Head'



export const Registered = () => {
  const [user] = useAuthState(auth);
  const firstname = useSelector((state:any) => state.registerInput.firstName)
  const lastname = useSelector((state:any) => state.registerInput.lastName)
  const mail = useSelector((state:any) => state.registerInput.mail);
  const gender = useSelector((state:any) => state.registerInput.gender);
  const zip = useSelector((state:any) => state.registerInput.zip);
  const tel = useSelector((state:any) => state.registerInput.tel);
  const confirmPassword = useSelector((state:any) => state.registerInput.confirmPassword);
  const password = useSelector((state:any) => state.registerInput.password);
  const address = useSelector((state:any) => state.registerInput.address);

  console.log("last",lastname,"first",firstname,"mail",mail,"gender",gender,"zip",zip,"tel",tel,"confirm",confirmPassword,"pass",password,"address",address)

  // const router = useRouter();

  const [lastNameErrorState, SetLastNameErrorState] = useState("init");
  const [firstNameErrorState, SetFirstNameErrorState] = useState("init");
  const [mailErrorState, SetMailErrorState] = useState("init");
  const [telErrorState, SetTelErrorState] = useState("init");
  const [zipErrorState, SetZipErrorState] = useState("init");
  const [addressErrorState, SetAddressErrorState] = useState("init");
  const [passwordErrorState, SetPasswordErrorState] = useState("init");
  const [confirmPasswordErrorState, SetConfirmPasswordErrorState] = useState("init");
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
      createUserWithEmailAndPassword(auth, mail, password)
        .then((user) => {
          // Cloud Firestore user新規登録
          const colRef = collection(db, "user");
          const data = {
            firstname: firstname,
            lastname: lastname,
            mail: mail,
            zip: zip,
            address: address,
            gender: gender,
            tel: tel,
            password: password,
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
      <Head title="PrinceViewHotel-新規登録" description="ホテルの予約サイトです。-PrinceViewHotel-"/>
      <Header />
      <div className={`${RegisterStyle.main} container`}>

        <form className={` ${RegisterStyle.form}`}>
          <h2 className="my-5 ml-5 ">基本情報</h2>
          <hr className="border border-1 border-gray-300 bg-gray-300" />

          <NameInput
            firstNameErrorState={firstNameErrorState}
            SetFirstNameErrorState={SetFirstNameErrorState}
            lastNameErrorState={lastNameErrorState}
            SetLastNameErrorState={SetLastNameErrorState}
            errorFlag={errorFlag}
          />
          <hr />

          <GenderInput  />

          <hr />

          <MailInput
            mailErrorState={mailErrorState} SetMailErrorState={SetMailErrorState}
            errorFlag={errorFlag}
            displayFlag={true}
          />
          <hr />

          <TelInput
            telErrorState={telErrorState}
            SetTelErrorState={SetTelErrorState}
            errorFlag={errorFlag}
          />
          <hr />

          <ZipInput
            zipErrorState={zipErrorState} SetZipErrorState={SetZipErrorState}
            errorFlag={errorFlag}
          />
          <hr />

          <AddressInput
            addressErrorState={addressErrorState} SetAddressErrorState={SetAddressErrorState}
            errorFlag={errorFlag}
          />
          <hr />

          <PasswordInput
            passwordErrorState={passwordErrorState} SetPasswordErrorState={SetPasswordErrorState}
            errorFlag={errorFlag}
            displayFlag={true}
            page="register"
            SetConfirmPasswordErrorState={SetConfirmPasswordErrorState}
          />
          <hr />

          <ConfirmPasswordInput
            confirmPasswordErrorState={confirmPasswordErrorState} SetConfirmPasswordErrorState={SetConfirmPasswordErrorState}
            errorFlag={errorFlag}
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

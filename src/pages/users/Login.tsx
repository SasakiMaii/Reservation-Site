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
import RegisterStyle from "../../styles/users/_Registered.module.scss"


export const Login = () => {

  // const router = useRouter();

  const [mailValue, SetMailValue] = useState("");
  const [mailErrorState, SetMailErrorState] = useState("init");

  const [passwordValue, SetPasswordValue] = useState("");
  const [passwordErrorState, SetPasswordErrorState] = useState("init");

  const [errorFlag, SetErrorFlag] = useState("false");

  const clear = () => {
    SetMailErrorState("init")
    SetPasswordErrorState("init")
   
    SetMailValue("")
    SetPasswordValue("")

    SetErrorFlag("false");
  }


  const register = () => {
    if (
      mailErrorState === "ok" &&
      passwordErrorState === "ok" 
    ) {

      // const data = {
      //   name: `${lastNameValue} ${firstNameValue}`,
      //   mail: mailValue,
      //   zip: zipValue,
      //   address: addressValue,
      //   tel: telValue,
      //   password: passwordValue,
      //   confirmPassword: confirmPasswordValue
      // };

      // fetch(`http://localhost:8000/users`, {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // }).then((response) => {
      //   return response.json();
      // }).then((data) => {
      //   alert("登録が完了いたしました。");
      // }).then(() => {
      //   router.push("/users/login");
      // })

    } else {
      SetErrorFlag("true");
    }

  }


  return (
    <>

      <div className={`${RegisterStyle.main} container`}>

        <form className={` ${RegisterStyle.form}`}>
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

            confirmPasswordValue={passwordValue}
            SetConfirmPasswordErrorState={SetPasswordErrorState}
          />
          <hr />


          <div className={`items-center justify-center flex flex-wrap my-4 ${RegisterStyle.buttonGroup}`}>

            {/* Primary Button */}
            <button 
              type="button" 
              className={`${SearchStyle.searchbtn}  ${RegisterStyle.registerButton}`}
              onClick={register}
              >ログイン</button>


            <button type="reset" className={`text-gray-900 px-4 py-2 rounded-md text-sm mt-5 ${RegisterStyle.clearBtn}`} onClick={clear}>クリア</button>
          </div>
        </form>
      </div>
    </>
  )
}

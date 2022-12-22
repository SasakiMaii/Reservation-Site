import React, { ChangeEvent, useEffect } from 'react'
import FormStyle from "../../../styles/users/_Form.module.scss"
import {passwordInput} from "../../../store/RegisterSlice"
import { useSelector, useDispatch } from 'react-redux';
import { CheckMarkGold, CheckMarkGray } from '../../Atoms/CheckMark';

const Navigation = (props: any) => {
  const password = useSelector((state:any) => state.registerInput.password);
  if (password.length > 0) {
    return (
      <>
        <div className="py-2 text-gray-500 text-sm ">
          <p>
            {(() => {
              if (password.length >= 8 && password.length <= 12) {
                return (
                  <>
                    <span className={`${FormStyle.NavigationIcons}`}>
                    <CheckMarkGold />
                    </span>
                  </>
                );
              } else {
                return (
                  <>
                    <span className={`${FormStyle.NavigationIcons}`}>
                    <CheckMarkGray />
                    </span>
                  </>
                );
              }
            }
            )()}
            {props.text}
          </p>
        </div>
      </>
    )
  } else {
    return (
      <></>
    )
  }
}

const Error = (props: any) => {
  if (props.errorFlag === "true") {

    if (props.value === "empty" || props.value === "init") {
      return (
        <>
          <label className={`${FormStyle.error} `}>{props.text}</label>
        </>
      )
    } else if (props.value === "format-inccorect") {
      return (
        <label className={`${FormStyle.error} `}>8文字以上12文字以下で入力してください</label>
      );
    } else if (props.value === "mismatch") {
      return (
        <label className={`${FormStyle.error} `}>パスワードが一致しません</label>
      );
    }
    else {
      return <></>
    }

  } else {
    return <></>
  }
}

// {
//   SetPasswordValue: any, SetPasswordErrorState: any, confirmPasswordValue: any,
//   SetConfirmPasswordErrorState: any,
//   passwordErrorState: any,
//   passwordValue: any,
//   errorFlag: any,
//   displayFlag: boolean,
//   page:string
// }

export const PasswordInput = (props: any) => {

  const confirmPassword = useSelector((state:any) => state.registerInput.confirmPassword);
  const dispatch = useDispatch();
  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    // props.SetPasswordValue(ev.target.value);
    dispatch(passwordInput(ev.target.value));

    if (!(ev.target.value)) {
      props.SetPasswordErrorState("empty")
    } else if (ev.target.value.length < 8 || ev.target.value.length > 12) {
      props.SetPasswordErrorState("format-inccorect")
    } else {
      props.SetPasswordErrorState("ok")
    }

    if (props.displayFlag == true) {
      if (ev.target.value !== confirmPassword) {
        if (props.page === "register") {
          props.SetConfirmPasswordErrorState("mismatch")
        } 
      
      } else if (ev.target.value === confirmPassword) {
        props.SetConfirmPasswordErrorState("ok")
      }
    }
  }

  const NavigationDisplay = (props: any) => {
    if (props.displayFlag === true) {
      return (
        <>
          <Navigation text="8文字以上16文字以内"  />
        </>
      )
    } else {
      return <></>
    }
  }

  return (
    <>
      <div className={`${FormStyle.formMain}`}>
        <div className={`${FormStyle.labelGroup}`}>
          <label htmlFor="new-password">パスワード </label>
          <span className={` ${FormStyle.mark}`}>必須</span>
          <Error
            text="パスワードを入力してください"
            value={props.passwordErrorState}
            confirmPasswordValue={props.confirmPasswordValue}
            SetPasswordErrorState={props.SetPasswordErrorState}
            errorFlag={props.errorFlag}

          />
        </div>
        <div>
          <input type="password"
            className={`${FormStyle.input}  ${FormStyle.widthInput}`} id="new-password"

            onChange={onChangeHandler}
            placeholder="例）Password123"
            autoComplete="new-password"
          />
        </div>

        <NavigationDisplay displayFlag={props.displayFlag} />

      </div>
    </>
  )
}

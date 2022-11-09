import React, { ChangeEvent, useEffect } from 'react'
import FormStyle from "../../styles/users/_Form.module.scss"
import { IconContext } from 'react-icons'
import { ImCheckmark } from "react-icons/im";
import { ImCheckmark2 } from "react-icons/im";

const Navigation = (props: any) => {

  if (props.value.length > 0) {
    return (
      <>
        <div className="py-2 text-gray-500 text-sm ">
          <p>
            {(() => {
              if (props.value.length >= 8 && props.value.length <= 12) {
                return (
                  <>
                    <span className={`${FormStyle.NavigationIcons}`}>
                      <IconContext.Provider value={{ size: '20px' }}>
                        <ImCheckmark />
                      </IconContext.Provider>
                    </span>
                  </>
                );
              } else {
                return (
                  <>
                    <span className={`${FormStyle.NavigationIcons}`}>
                      <IconContext.Provider value={{ size: '20px'}}>
                        <ImCheckmark2 />
                      </IconContext.Provider>
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

export const PasswordInput = (props: {
  SetPasswordValue: any, SetPasswordErrorState: any, confirmPasswordValue: any,
  SetConfirmPasswordErrorState: any,
  passwordErrorState: any,
  passwordValue: any,
  errorFlag: any,
  displayFlag: boolean
}) => {

  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    props.SetPasswordValue(ev.target.value);

    if (!(ev.target.value)) {
      props.SetPasswordErrorState("empty")
    } else if (ev.target.value.length < 8 || ev.target.value.length > 12) {
      props.SetPasswordErrorState("format-inccorect")
    } else {
      props.SetPasswordErrorState("ok")
    }

    if (props.displayFlag == true) {
      if (ev.target.value !== props.confirmPasswordValue) {
        props.SetConfirmPasswordErrorState("mismatch")
      } else if (ev.target.value === props.confirmPasswordValue) {
        props.SetConfirmPasswordErrorState("ok")
      }
    }
  }

  const NavigationDisplay = (props: any) => {
    if (props.displayFlag === "true") {
      return (
        <>
          <Navigation text="8文字以上16文字以内" value={props.passwordValue} />
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

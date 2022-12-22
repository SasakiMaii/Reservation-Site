import React, { ChangeEvent } from 'react'
import { useEffect } from 'react';
import FormStyle from "../../../styles/users/_Form.module.scss"
import { mailInput } from "../../../store/RegisterSlice"
import { useSelector, useDispatch } from 'react-redux';
import { CheckMarkGold, CheckMarkGray } from '../../Atoms/CheckMark';

const Navigation = (props: any) => {
  const mail = useSelector((state: any) => state.registerInput.mail);
  // if (props.value.length > 0) {
  if (mail.length > 0) {
    return (
      <>
        <div className="py-2 text-gray-500 text-sm mb-8">
          <p>
            {(() => {
              if (mail.includes("@")) {
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
          <label className={`${FormStyle.error}`}>{props.text}</label>
        </>
      )
    } else if (props.value === "format-inccorect") {
      return (
        <label className={`${FormStyle.error}`}>xxx@xxxxの形式で入力してください</label>
      );
    } else {
      return <></>
    }
  } else {
    return <></>
  }
}



export const MailInput = (props: any) => {
  // { SetMailErrorState: any,  errorFlag: any, mailErrorState: any, displayFlag: boolean }

  const mail = useSelector((state: any) => state.registerInput.mail);
  const dispatch = useDispatch();
  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    // props.SetMailValue(ev.target.value);
    dispatch(mailInput(ev.target.value));

    if (!(ev.target.value)) {
      props.SetMailErrorState("empty");
    } else if (!(ev.target.value.includes("@"))) {
      props.SetMailErrorState("format-inccorect");
    } else {
      props.SetMailErrorState("ok");
    }
  }

  const NavigationDisplay = (props: any) => {
    if (props.displayFlag === true) {
      return (
        <>
          {/* <Navigation value={props.mailValue} text="@を含む形式" /> */}
          <Navigation text="@を含む形式" />
        </>
      )
    } else {
      return <></>
    }
  }

  return (
    <>
      <div className={`${FormStyle.formMain}`}>
        <div className={` ${FormStyle.labelGroup}`}>
          <label htmlFor="email">メールアドレス </label>
          <span className={`${FormStyle.mark}`}>必須</span>
          <Error
            value={props.mailErrorState}
            text="メールアドレスを入力してください"
            SetMailErrorState={props.SetMailErrorState}
            errorFlag={props.errorFlag} />
        </div>
        <div>
          <input type="text"
            className={`${FormStyle.input}  ${FormStyle.widthInput} 
          `}
            id="email"

            onChange={onChangeHandler}
            placeholder="例）mail@example.com"
            autoComplete="email"
          />
        </div>

        <div className={FormStyle.nae}>
          <NavigationDisplay displayFlag={props.displayFlag} />
        </div>

      </div>
    </>
  )
}

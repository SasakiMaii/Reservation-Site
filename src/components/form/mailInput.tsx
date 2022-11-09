import React, { ChangeEvent } from 'react'
import { useEffect } from 'react';
import FormStyle from "../../styles/users/_Form.module.scss"
import { IconContext } from 'react-icons'
import { ImCheckmark } from "react-icons/im";
import { ImCheckmark2 } from "react-icons/im";

const Navigation = (props: any) => {

  if (props.value.length > 0) {
    return (
      <>
        <div className="py-2 text-gray-500 text-sm mb-8">
          <p>
            {(() => {
              if (props.value.includes("@")) {
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



export const MailInput = (props: { SetMailErrorState: any, SetMailValue: any, errorFlag: any, mailErrorState: any, mailValue: any, displayFlag: boolean }) => {

  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    props.SetMailValue(ev.target.value);

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
          <Navigation value={props.mailValue} text="@を含む形式" />
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
        <NavigationDisplay displayFlag={props.displayFlag} mailValue={props.mailValue} />
    </div>

      </div>
    </>
  )
}

import React, { ChangeEvent } from 'react'
import FormStyle from "../../styles/users/_Form.module.scss"

const Error = (props: any) => {
  if (props.errorFlag === "true") {
    if (props.value1 === "empty" || props.value2 === "empty" || props.value1 === "init" || props.value2 === "init") {
      return (
        <>
          <label className={`${FormStyle.error}`}>{props.text}</label>
        </>
      )
    } else {
      return (
        <></>
      );
    }
  } else {
    return <></>
  }
}


export const NameInput = (props: any) => {
  const onChangeHandlerLast = (ev: ChangeEvent<HTMLInputElement>) => {
    props.SetLastNameValue(ev.target.value);

    if (!(ev.target.value)) {
      props.SetLastNameErrorState("empty");
    } else {
      props.SetLastNameErrorState("ok");
    }
  }

  const onChangeHandlerFirst = (ev: ChangeEvent<HTMLInputElement>) => {
    props.SetFirstNameValue(ev.target.value);

    if (!(ev.target.value)) {
      props.SetFirstNameErrorState("empty");
    } else {
      props.SetFirstNameErrorState("ok");
    }
  }

  const Mark = () => {
    if(!props.markNone) {
      return (
        <span className={`${FormStyle.mark}`}>必須</span>
      )
    } else {
      return <></>
    }
  }

  return (
    <>
      <div className={`${FormStyle.formMain}`}>
        <div className={` ${FormStyle.labelGroup}`}>
          <label htmlFor="family-name">お名前 </label>
          <span className={`${FormStyle.mark}`} >必須</span>
          <Mark />
          <Error
            text="名前を入力してください"
            value1={props.lastNameErrorState}
            value2={props.firstNameErrorState}
            errorFlag={props.errorFlag} />
        </div>
        <div>
          <input 
            id="family-name"
            type="text"
            className={`${FormStyle.input}  ${FormStyle.familyName} name border mr-4 py-1 px-3 rounded-md    focus:border focus:border-gray-100  focus:outline-none focus:ring-2 z-1 h-10
              `}
            placeholder="例）田中" 
           
            onChange={onChangeHandlerLast} 
            autoComplete="family-name"
            />
          <input
            id="given-name" 
            type="text" 
            className={` ${FormStyle.input} ${FormStyle.givenName}  name border mr-4 py-1 px-3 rounded-md focus:outline-none focus:ring-2 z-1 h-10`}  
            placeholder="例）太郎" 
             
            onChange={onChangeHandlerFirst} 
            autoComplete="given-name"
            />
        </div>
      </div>
    </>
  )
}

import React, { ChangeEvent } from 'react'
import FormStyle from "../../../styles/users/_Form.module.scss"
import { useDispatch , useSelector} from 'react-redux'
import {firstNameInput, lastNameInput} from "../../../store/RegisterSlice"

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
  const firstname = useSelector((state:any) => state.registerInput.firstName)
  const lastname = useSelector((state:any) => state.registerInput.lastName)
  
  // console.log("名", firstname, "姓", lastname);
  const dispatch = useDispatch();
  const onChangeHandlerLast = (ev: ChangeEvent<HTMLInputElement>) => {
    // props.SetLastNameValue(ev.target.value);
    if(props.lodgeName && props.lodgeName === "ok") {
      props.SetLodgeLastName(ev.target.value)
    } else {
      dispatch(lastNameInput(ev.target.value));
    }

    if (!(ev.target.value)) {
      props.SetLastNameErrorState("empty");
    } else {
      props.SetLastNameErrorState("ok");
    }
  }

  const onChangeHandlerFirst = (ev: ChangeEvent<HTMLInputElement>) => {
    // props.SetFirstNameValue(ev.target.value);
    if(props.lodgeName && props.lodgeName === "ok") {
      props.SetLodgeFirstName(ev.target.value)
    } else {
      dispatch(firstNameInput(ev.target.value));
    }

    if (!(ev.target.value)) {
      props.SetFirstNameErrorState("empty");
    } else {
      props.SetFirstNameErrorState("ok");
    }
  }

  const Mark = () => {
    if(props.markNone && props.markNone === "ok") {
      console.log(1);
      return ( <></>
        
      )
    } else {
      console.log(2);
      return <span className={`${FormStyle.mark}`}>必須</span>
    }
  }

  return (
    <>
      <div className={`${FormStyle.formMain}`}>
        <div className={` ${FormStyle.labelGroup}`}>
          <label htmlFor="family-name">お名前 </label>
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

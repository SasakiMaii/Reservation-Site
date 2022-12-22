import React, { ChangeEvent } from 'react'
import FormStyle from "../../../styles/users/_Form.module.scss"
import {addressInput} from "../../../store/RegisterSlice"
import { useSelector, useDispatch } from 'react-redux';

const Error = (props: any) => {
  
  if ( props.errorFlag === "true") {
    if (props.value === "empty" || props.value === "init" ) {
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
  }else{
    return <></>
  }
}

export const AddressInput = (props: any) => {
  const address = useSelector((state:any) => state.registerInput.address);
  const dispatch = useDispatch();
  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    // props.SetAddressValue(ev.target.value);
    dispatch(addressInput(ev.target.value));
    if(!(ev.target.value)){
      props.SetAddressErrorState("empty");  
    }else{
      props.SetAddressErrorState("ok");  
    }
 }

  return (
    <>
       <div className={`${FormStyle.formMain}`}>
            <div className={`${FormStyle.labelGroup}`}>
              <label htmlFor="street-address">住所 </label>
              <span className={` ${FormStyle.mark}`}>必須</span>
              <Error
              text="住所を入力してください" 
              value={props.addressErrorState}
              errorFlag={ props.errorFlag} />
            </div>
            <div>
              <input 
               type="text" 
               className={`${FormStyle.input}  ${FormStyle.widthInput} `}
               id="street-address"                 
               onChange={onChangeHandler}
               placeholder="例）東京都中央区"
               autoComplete='street-address'
              />
            </div>
          </div>
    </>
  )
}

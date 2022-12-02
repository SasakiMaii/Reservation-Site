import React, { ChangeEvent } from 'react'
import { useEffect } from 'react';
import FormStyle from "../../styles/users/_Form.module.scss"
import { IconContext } from 'react-icons'
import { ImCheckmark } from "react-icons/im";
import { ImCheckmark2 } from "react-icons/im";
import {telInput} from "../../store/RegisterSlice"
import { useSelector, useDispatch } from 'react-redux';


const Navigation = (props: any) => {
  const tel = useSelector((state:any) => state.registerInput.tel);

  if (tel.length > 0) {
    return (
      <>
        <div className="py-2 text-gray-500 text-sm mb-8">
          <p>
            {(() => {
              if (tel.includes("-")) {
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
  if ( props.errorFlag === "true") {
    if (props.value === "empty" || props.value === "init") {
      return (
        <>
          <label  className={`${FormStyle.error} `}>{props.text}</label>
        </>
      )
    } else if(props.value === "format-inccorect") {
      return (
        <label  className={`${FormStyle.error} `}>xxx-xxxx-xxxxの形式で入力してください</label>
      );
    }else{
      return <></>
    }
  }else{
    return <></>
  }
}

export const TelInput = (props: any) => {
  const dispatch = useDispatch();
  const tel = useSelector((state:any) => state.registerInput.tel);
  
  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    // props.SetTelValue(ev.target.value);
    dispatch(telInput(ev.target.value));

    if(!(ev.target.value)){
      props.SetTelErrorState("empty");  
    }else if(!(ev.target.value.includes("-"))){
      props.SetTelErrorState("format-inccorect");  
    }else{
      props.SetTelErrorState("ok");  
    }
 }

  return (
    <>
      <div className={`${FormStyle.formMain}`}>
        <div className={`${FormStyle.labelGroup}`}>
          <label htmlFor="tel">電話番号 </label>
          <span className={`${FormStyle.mark}`}>必須</span>
          <Error 
          value={props.telErrorState} 
          text="電話番号を入力してください"
          SetTelErrorState={props.SetTelErrorState}
          errorFlag={props. errorFlag} />

        </div>
        <div>
          <input 
            type="text" 
            className={`${FormStyle.input}  ${FormStyle.widthInput} `} 
            id="tel" 
            
            onChange={onChangeHandler}
            placeholder="例）123-1234-1234"
            autoComplete="tel"
          />
        </div>
        <Navigation text="-（ハイフン）を含む形式" />

      </div>
    </>
  )
}

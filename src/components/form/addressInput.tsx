import React, { ChangeEvent } from 'react'
import FormStyle from "../../styles/users/_Form.module.scss"

const Navigation = (props: any) => {

  if (props.value.length > 0) {
    return (
      <>
        <div className="py-2 text-gray-500 text-sm mb-8">
          <p>
            {(() => {
              if (props.value.includes("-")) {
                return (
                  <>
                    <span className="material-symbols-outlined 
                  rounded-full mr-3 text-white translate-y-1.5
                  "
                      style={{ backgroundColor: "#75ad9d" }}
                    >
                      check_circle
                    </span>
                  </>
                );
              } else {
                return (
                  <>
                    <span className="material-symbols-outlined 
                  rounded-full mr-3 text-white translate-y-1.5 bg-gray-300
                  ">
                      check_circle
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
 
  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    props.SetAddressValue(ev.target.value);
    
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

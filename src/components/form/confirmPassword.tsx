import { ChangeEvent } from "react";
import FormStyle from "../../styles/users/_Form.module.scss"

const ConfirmPasswordError = (props: any) => {
  if ( props.errorFlag === "true" ) {
    if (props.value === "empty" || props.value === "init") {
           return (
        <>
          <label className={`${FormStyle.error}`}>{props.text}</label>
        </>
      )
    } else if(props.value === "mismatch") {
      return (
        <label className={`${FormStyle.error}`}>パスワードが一致しません</label>
      );
    } else if(props.value === "match") {
      return (
        <></>
      );
    } else{
      return <></>
    }
  }else{
    return <></>
  }
}

export const ConfirmPasswordInput = (props: any) => {
  
  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    props.SetConfirmPasswordValue(ev.target.value);

    if (!(ev.target.value)) {
      props.SetConfirmPasswordErrorState("empty")
    } else if (ev.target.value !== props.passwordValue) {
      props.SetConfirmPasswordErrorState("mismatch")
    } else if(ev.target.value === props.passwordValue){
      props.SetConfirmPasswordErrorState("ok")
    }else{
      props.SetConfirmPasswordErrorState("ok")
    }
  }
  return (
    <>
          <div className={`${FormStyle.formMain}`}>
            <div className={`${FormStyle.labelGroup}`}>
              <label htmlFor="new-password-confirm">確認用パスワード </label>
              <span className={` ${FormStyle.mark}`}>必須</span>

              <ConfirmPasswordError 
              text="確認用パスワードを入力してください" value={props.confirmPasswordErrorState} 
              passwordValue={props.passwordValue} 
              SetConfirmPasswordErrorState
              ={props.SetConfirmPasswordErrorState}
              errorFlag={props.errorFlag}/>
            </div>
            <div>
              <input type="password" 
               className={`${FormStyle.input}  ${FormStyle.widthInput} `}
              id="new-password-confirm" 
               
              onChange={onChangeHandler}
              placeholder="例）Password123"
              autoComplete="new-password"
              />
            </div>
          </div>
    </>
  )
}

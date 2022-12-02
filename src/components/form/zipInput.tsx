import { ChangeEvent } from 'react';
import FormStyle from "../../styles/users/_Form.module.scss"
import { IconContext } from 'react-icons'
import { ImCheckmark } from "react-icons/im";
import { ImCheckmark2 } from "react-icons/im";
import {zipInput} from "../../store/RegisterSlice"
import { useSelector, useDispatch } from 'react-redux';

const Navigation = (props: any) => {
  const zip = useSelector((state:any) => state.registerInput.zip);
  if (zip.length > 0) {
    return (
      <>
        <div className="py-2 text-gray-500 text-sm mb-8">
          <p>
            {(() => {
              if (zip.includes("-")) {
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
        <label className={`${FormStyle.error} `}>xxx-xxxxの形式で入力してください</label>
      );
    } else {
      return <></>
    }
  } else {
    return <></>
  }
}

export const ZipInput = (props: any) => {
  const zip = useSelector((state:any) => state.registerInput.zip);
  const dispatch = useDispatch();

  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    // props.SetZipValue(ev.target.value);
    dispatch(zipInput(ev.target.value));
    
    if(!(ev.target.value)){
      props.SetZipErrorState("empty")    
    }else if(!(ev.target.value.includes("-"))){
      props.SetZipErrorState("format-inccorect")      
    }else{
      props.SetZipErrorState("ok")      
    }
 }

  return (
    <>
      <div className={`${FormStyle.formMain}`}>
        <div className={`${FormStyle.labelGroup}`}>

          <label htmlFor="postal-code">郵便番号 </label>
          <span className={` ${FormStyle.mark}`}>必須</span>

          <Error
            text="郵便番号を入力してください"
            value={props.zipErrorState}
            SetZipErrorState={props.SetZipErrorState}
            errorFlag={props.errorFlag}
          />


        </div>
        <div>
          <input 
            type="text" 
            className={`${FormStyle.input}  ${FormStyle.widthInputSmall} `} 
            id="postal-code" 
            
            onChange={onChangeHandler}
            placeholder="例）123-1234"
            autoComplete="postal-code"
          />
        </div>

        <Navigation text="-（ハイフン）を含む形式" />


      </div>


    </>
  )
}

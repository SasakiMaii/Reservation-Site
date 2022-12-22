import React, { ChangeEvent } from 'react'
import FormStyle from "../../../styles/users/_Form.module.scss"
import {genderInput} from "../../../store/RegisterSlice"
import { useSelector, useDispatch } from 'react-redux';


export const GenderInput = (props: any) => {
  const dispatch = useDispatch();

  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    // props.SetGenderValue(ev.target.value);
    dispatch(genderInput(ev.target.value));
    // console.log(ev.target.value)
  }

  return (
    <>
      <div className={`${FormStyle.formMain}`}>
        <div className={`${FormStyle.labelGroup}`}>
          <span >性別 </span>
          <span className={` ${FormStyle.mark}`}>必須</span>
        </div>
        <div>

          <label htmlFor='man' >
            <input type="radio" id="man" value="男性" className={FormStyle.radioButton} defaultChecked name="gender" onChange={onChangeHandler} />
            男性</label>
          <label htmlFor='woman'>
            <input type="radio" id="woman" value="女性" name="gender" className={FormStyle.radioButton} onChange={onChangeHandler} />
            女性</label>
          <label htmlFor='other' >
            <input type="radio" id="other" value="回答しない" name="gender" className={FormStyle.radioButton} onChange={onChangeHandler} />
            回答しない</label>
        </div>
      </div>
    </>
  )
}

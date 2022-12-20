import gold from "../../topMaterial/check-gold.png";
import gray from "../../topMaterial/check-gray.png" ;
import style from "../../styles/users/_checkMark.module.scss";


export const CheckMarkGold = () =>{
  return(
    <>
      <img src={gold} alt="完了"  className={style.Mark}/>
    </>
  )
}

export const CheckMarkGray = () =>{
  return(
    <>
      <img src={gray} alt="未完了" className={style.Mark}/>
    </>
  )
}

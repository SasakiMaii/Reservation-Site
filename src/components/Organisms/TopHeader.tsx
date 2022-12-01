import React from 'react'
import style from "../../styles/top/_Top.module.scss"
import { Link as Scroll } from "react-scroll";
import scrollImage from "../../topMaterial/scroll3.png";

export const TopHeader = () => {
  return (
    <header className={style.topImage}>
      <p className={style.hotelName} >Prince'Vuew Hotel</p>
      {/* スクロールのスピード　 durationで設定*/}
      <Scroll to="concept" smooth={true} duration={1300} offset={-100}>
        <img src={scrollImage} alt="矢印" className={style.scrollImage} />
      </Scroll>
    </header>
  )
}

export default TopHeader;

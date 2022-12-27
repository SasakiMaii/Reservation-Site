import style from "../../styles/top/_Top.module.scss"
import { Link as Scroll } from "react-scroll";

export const TopHeader = () => {
  return (
    <header className={style.topImage}>
      <p className={style.hotelName} >Prince'View Hotel</p>
      {/* スクロールのスピード　 durationで設定*/}
      <div  >
        <Scroll to="concept" smooth={true} duration={1300} offset={0}>
          <div className={style.scrolldown2}><span>
            Scroll
            </span></div>
          {/* <img src={scrollImage} alt="矢印" className={style.scrollImage} /> */}
        </Scroll>
      </div>
    </header>
  )
}

export default TopHeader;

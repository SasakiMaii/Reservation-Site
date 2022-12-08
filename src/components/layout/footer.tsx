import { Link } from "react-router-dom";
import FooterStyle from "../../styles/layout/_Footer.module.scss";
import {TbArrowTopCircle} from "react-icons/tb"

const Footer = () => {
  
  return (
    <>
     <a className={FooterStyle.pagetop} href="#"><TbArrowTopCircle size={30}/>Page Top</a>
      <div className={FooterStyle.footerWrapper}>
        <div className={FooterStyle.footerFlex}>
          <p>Prince'View Hotel</p>
          <div className={FooterStyle.footerNav}>
            <ul className={FooterStyle.footerList}>
              <li>
                <Link to={"/"}>アクセス</Link>
              </li>
              <li>
                <Link to={"/"}>客室・プラン</Link>
              </li>
              <li>
                <Link to={"/"}>お問い合わせ</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className={FooterStyle.creator}>&#64;kayahara,ito,sasaki</p>
      </div>
    </>
  );
};

export default Footer;

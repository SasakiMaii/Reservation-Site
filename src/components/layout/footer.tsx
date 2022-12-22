import { Link } from "react-router-dom";
import FooterStyle from "../../styles/layout/_Footer.module.scss";
import { TbArrowTopCircle } from "react-icons/tb"
import { Link as Scroll } from "react-scroll";

const Footer = () => {

  return (
    <>
    {/* scrollのスピード調整 */}
      <Scroll to="top" smooth={true} duration={1300} offset={0} >
        <div className={FooterStyle.pagetop}>
          <TbArrowTopCircle size={30} />Page Top
        </div>
      </Scroll>
      {/* <a className={FooterStyle.pagetop} href="#"><TbArrowTopCircle size={30}/>Page Top</a> */}
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
                <Link to={"/books/Contact"}>よくあるご質問</Link>
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

import { Link } from "react-router-dom";
import headerStyle from "../../styles/layout/_Header.module.scss";
import PrimaryButton from "../button/PrimaryButton";

const Header = () => {
  //予約のイベント
  const handleResarve=()=>{

  }
  return (
    <>
      <div className={headerStyle.headerFlex}>
        <h1>Prince'View Hotel</h1>
        <div className={headerStyle.headerNav}>
          <ul>
            <li>
              <Link to={"/"}>アクセス</Link>
            </li>
            <li>
              <Link to={"/rooms/Gestroom"}>客室・プラン</Link>
            </li>
            <li>
              <Link to={"/"}>お問い合わせ</Link>
            </li>
            <li>
              <Link to={"/"}>ログイン</Link>
            </li>
          </ul>
              <PrimaryButton onClick={handleResarve}>ご予約</PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default Header;

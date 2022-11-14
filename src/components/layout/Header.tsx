import { Link } from "react-router-dom";
import headerStyle from "../../styles/layout/_Header.module.scss";
import PrimaryButton from "../button/PrimaryButton";

const Header = () => {
  //ハンバーガーメニュー作りたい
  const handleResarve=()=>{

  }
  return (
    <>
      <div className={headerStyle.headerFlex}>
        <h1>Prince'View Hotel</h1>
        <div className={headerStyle.headerNav}>
          <ul>
            <li>
              <Link to={"/rooms/Gestroom"}>客室・プラン</Link>
            </li>
            <li>
              <Link to={"/"}>予約内容確認</Link>
            </li>
            <li>
              <Link to={"/"}>ログイン</Link>
            </li>
          </ul>
          <Link to={"/rooms/RoomSearch"}>
              <PrimaryButton onClick={handleResarve}>ご予約</PrimaryButton>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;

import { Link } from "react-router-dom";
import headerStyle from "../../styles/layout/_Header.module.scss";
import PrimaryButton from "../button/PrimaryButton";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth ,provider} from '../../Firebase'
import { GiFrogPrince } from "react-icons/gi";

const Header = () => {
  //予約のイベント
  const handleResarve = () => {

  }
  return (
    <>
      <div className={headerStyle.headerFlex}>
        <h1><GiFrogPrince />Prince'View Hotel</h1>
        <div className={headerStyle.headerNav}>
          <ul>
            <li className={headerStyle.headerlist}>
              <Link to={"/rooms/Gestroom"}> <span className={headerStyle.headerspan}> 客室・プラン</span></Link>
            </li>
            <li className={headerStyle.headerlist}>
              <Link to={"/"}><span className={headerStyle.headerspan}> 予約内容確認</span></Link>
            </li>
            {/* <li>
              <Link to={"/"}>ログイン</Link>
            </li> */}
            <Certification />
          </ul>
          <Link to={"/rooms/Gestroom"}>
          <PrimaryButton onClick={handleResarve}>ご予約</PrimaryButton>
          </Link>
        </div>
      </div>
    </>
  );
};


// ログインログアウト判定
const Certification = () => {
  const [user] = useAuthState(auth);

  if (!user) {
    return (
      <>
        <li>
          <Link to={"/"}> <span className={headerStyle.headerspan}>ログイン</span> </Link>
        </li>
      </>
    )
  } else {
    return (
      <>
        <li>
          <button onClick={() => {
            auth.signOut()
              .then(() => {
                alert("ログアウトしました。")
              })
          }}>ログアウト</button>
        </li>
      </>
    )
  }
}

export default Header;

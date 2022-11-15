import { Link } from "react-router-dom";
import headerStyle from "../../styles/layout/_Header.module.scss";
import PrimaryButton from "../button/PrimaryButton";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, provider } from '../../Firebase'

const Header = () => {
  //予約のイベント
  const handleResarve = () => {

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
              <Link to={"/"}>客室・プラン</Link>
            </li>
            <li>
              <Link to={"/"}>お問い合わせ</Link>
            </li>
            {/* <li>
              <Link to={"/"}>ログイン</Link>
            </li> */}
            <Certification />
          </ul>
          <PrimaryButton onClick={handleResarve}>ご予約</PrimaryButton>
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
          <Link to={"/"}>ログイン</Link>
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

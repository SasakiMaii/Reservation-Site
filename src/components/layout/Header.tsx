import { Link } from "react-router-dom";
import headerStyle from "../../styles/layout/_Header.module.scss";
import PrimaryButton from "../button/PrimaryButton";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, provider } from '../../Firebase'
import { GiFrogPrince } from "react-icons/gi";
import { useEffect } from "react";

const Header = () => {

  // gestID（hJ2JnzBn）の入れ物
  const cookieList: any = [];

  useEffect(() => {

    // 以下、cookie取り出し処理
    const splitCookie = document.cookie.split(';');
    const list = [];

    for (let i = 0; i < splitCookie.length; i++) {
      list.push(splitCookie[i].split('='));
    }

    // cookieにgestID（hJ2JnzBn）がセットされていな場合、付与する
    list.map((data, index) => {
      if (data[0].includes("hJ2JnzBn")) {
        cookieList.push(data[0])
      }
    })

    // gestID（hJ2JnzBn）が入っていなければ、ランダムな文字列をcookieに追加
    if (cookieList.length === 0) {
      let randomId = Math.random().toString(32).substring(2);
      document.cookie = `hJ2JnzBn=${randomId}; path=/;`;
    }

  }, [])

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

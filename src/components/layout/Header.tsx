import { Link } from "react-router-dom";
import headerStyle from "../../styles/layout/_Header.module.scss";
import PrimaryButton from "../button/PrimaryButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "../../Firebase";
import { GiFrogPrince } from "react-icons/gi";
import Hamburger from "hamburger-react";
import { useState } from "react";
// yarn add hamburger-react

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [flag,setFlag]=useState(false);

  const flagChange=()=>{
    if(flag===false){
      setFlag(true)
    }else{
      setFlag(false)
    }
  }

  return (
    <>
      <div className={headerStyle.headerFlex}>
            <Link to={"/"}>
              <h1>
                <GiFrogPrince />
                {' '}
                Prince'View Hotel
              </h1>
            </Link>
        {flag ? (
            <div className={headerStyle.headerNav}>
              <ul>
                <li className={headerStyle.headerlist}>
                  <Link to={"/rooms/Gestroom"}>
                    {" "}
                    <span className={headerStyle.headerspan}>
                      {" "}
                      客室・プラン
                    </span>
                  </Link>
                </li>
                <li className={headerStyle.headerlist}>
                  <Link to={"/books/ReservateHistory"}>
                    <span className={headerStyle.headerspan}>
                      {" "}
                      予約内容確認
                    </span>
                  </Link>
                </li>
                {/* <li>
              <Link to={"/"}>ログイン</Link>
            </li> */}
                <Certification />
                <Link to={"/rooms/Gestroom"}>
                <PrimaryButton>ご予約</PrimaryButton>
              </Link>
              </ul>
            <Hamburger toggled={isOpen} toggle={setOpen} size={30} onToggle={flagChange}/>
            </div>
        
        ) : (
          <>
              {/* <Link to={"/rooms/Gestroom"}>
                <PrimaryButton>ご予約</PrimaryButton>
              </Link> */}
          <Hamburger toggled={isOpen} toggle={setOpen} size={30} onToggle={flagChange}/>
          </>
        )}
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
          <Link to={"/users/login"}>
            {" "}
            <span className={headerStyle.headerspan}>ログイン</span>{" "}
          </Link>
        </li>
      </>
    );
  } else {
    return (
      <>
        <li>
          <button
            className={headerStyle.headerspan}
            onClick={() => {
              auth.signOut().then(() => {
                alert("ログアウトしました。");
              });
            }}
          >
            ログアウト
          </button>
        </li>
      </>
    );
  }
};

export default Header;

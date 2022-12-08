import { Link } from "react-router-dom";
import RoomStyle from "../../../styles/rooms/_Gestroom.module.scss";
const RoomLink = () => {
  return (
    <>
      <p className={RoomStyle.pageTitle2}>全ての客室＆プラン</p>
      <div className={RoomStyle.roomLinkWrapper}>
        <Link to={"#"} className={RoomStyle.roomLink}>
          {" "}
          客室で探す{" "}
        </Link>
        <Link to={"/rooms/Plan"}> プランで探す </Link>
      </div>
    </>
  );
};

export default RoomLink
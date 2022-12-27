import RoomStyle from "../../styles/rooms/_Gestroom.module.scss";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import EmptyRoomConditions from "../../components/Templates/EmptyRoomConditions";
import Head from "../../components/layout/Head";
import PrimaryLink from "../../components/Atoms/PrimaryLink";
import { RoomCard } from "../../components/Templates/RoomCard";

type RoomProps = {
  classname?: string;
};

const GestroomPlan: React.FC<RoomProps> = () => {
  const [datetext, setDatetext] = useState("");
  const [info, setInfo] = useState([]);
  const [descClick, setDescClick] = useState(false);
  const [ascClick, setAscClick] = useState(false);
  const [err, setErr] = useState([]); //検索のバリデーション
  const [rooms, SetRooms] = useState<any>([]); //db取り出し
  const [room, setRoom] = useState<any>([]); //db取り出し
  const [reserved, setReserved] = useState<any>([]); //db取り出し
  return (
    <>
      <Head
        title="PrinceViewHotel-客室・プラン"
        description="ホテルの予約サイトです。-PrinceViewHotel-"
      />
      <Header />
      <div className={RoomStyle.hidden}>
        <p className={RoomStyle.pageTitle}>
          <IoSearchOutline size={28} />
          空室検索
        </p>
        <PrimaryLink
          title={"ご予約内容の確認はこちら"}
          path={"/books/ReservateHistory"}
          classname={RoomStyle.reservedCheck}
        />
        {err.map((error: string, index: number) => {
          return (
            <p key={index} className={RoomStyle.err}>
              ※{error}
            </p>
          );
        })}
        <EmptyRoomConditions
          datetext={datetext}
          setDatetext={setDatetext}
          setInfo={setInfo}
          reserved={reserved}
          room={room}
          setRoom={setRoom}
          rooms={rooms}
          SetRooms={SetRooms}
          setErr={setErr}
          setReserved={setReserved}
        />
        <p className={RoomStyle.pageTitle2}>全ての客室＆プラン</p>
        <div className={RoomStyle.roomLinkWrapper}></div>
        {err.map((error: string,index:number) => {
          return (
            <p key={index} className={RoomStyle.err}>
              ※{error}
            </p>
          );
        })}
        {info.map((information: string,index:number) => {
          return (
            <p key={index} className={RoomStyle.info}>
              ※{information}
            </p>
          );
        })}
        <RoomCard
          rooms={rooms}
          SetRooms={SetRooms}
          descClick={descClick}
          setDescClick={setDescClick}
          ascClick={ascClick}
          setAscClick={setAscClick}
        />
      </div>
      <Footer />
    </>
  );
};


export default GestroomPlan;

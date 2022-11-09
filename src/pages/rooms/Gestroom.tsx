import Pageing from "../../components/rooms/Pageing";
import RoomSearchSoart from "../../components/rooms/RoomSearchSoart";
import RoomStyle from "../../styles/rooms/_Gestroom.module.scss";
import PrimaryButton from "../../components/button/PrimaryButton";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
// import "firebase";
import { useEffect, useState } from "react";
import db from "../../Firebase";
import { collection, doc, setDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Link } from "react-router-dom";



const GestroomPlan = () => {
  const [descSoarts, SetDescSoart] = useState<any>([]);
  const [ascSoarts, SetAscSoart] = useState<any>([]);
  const soartData = collection(db, "gestRoomType");
  const onDescSoart = () => {
    const priceDesc = query(soartData, orderBy("price", "desc"), limit(4));
    getDocs(priceDesc).then((snapShot) => {
      SetDescSoart(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  };
  return (
    <>
      <Header />
      <p className={RoomStyle.pageTitle}>全ての客室＆プラン</p>
      <div className={RoomStyle.roomLinkWrapper}>
      <Link to={"#"} className={RoomStyle.roomLink}> 客室 </Link>
      <Link to={"/Plan"}> プラン </Link>
      </div>
      <RoomSearchSoart onClick={onDescSoart}/>
      <RoomCard />
      <Pageing />
      <Footer />
    </>
  );
};

//部屋の詳細＆プランの詳細
export const RoomCard = () => {
  const [rooms, SetRoom] = useState<any>([]);
  const [descStetus,setDescStatus]=useState("");

  useEffect(() => {
    const roomDate = collection(db, "gestRoomType");
    getDocs(roomDate).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => doc.data()))
      // console.log(snapShot.docs.map((doc,index) => doc.data()))
      // SetPosts(snapShot.docs.map((doc) => doc.data()))
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })))
      SetRoom(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);
  const handleResarvedRoom=()=>{

  }

  return (
    <div className={RoomStyle.roomPlanContainer}>
      <ul>
        {rooms.map((room: any) => {
          return (
            <li key={room.area}  className={RoomStyle.roomPlanCard}>
              <div className={RoomStyle.cardTitle}>
                <h1 className={RoomStyle.roomName}>{room.area}</h1>
                <p className={RoomStyle.roomArea}>{room.capacityArea}</p>
              </div>
              <div className={RoomStyle.detailContainer}>
                <img
                  className={RoomStyle.roompic}
                  src="hotel-4.jpg"
                  alt="roompicture"
                />
                <div className={RoomStyle.roomDetails}>
                  <p className={RoomStyle.roomCapacity}>
                    定員{room.capacity}名
                  </p>
                  <p className={RoomStyle.bedType}>
                    ベッドタイプ｜{room.bedType}
                  </p>
                  <p className={RoomStyle.roomEquipmentTitle}>
                    【客室室内設備】
                  </p>
                  <p className={RoomStyle.roomEquipment}>{room.roomFacility}</p>
                  <p className={RoomStyle.roomPrice}>
                    ¥{room.price}
                    <span>〜/人</span>
                  </p>
                </div>
              </div>
              <div className={RoomStyle.ResarvedRoomBtn}>
             <PrimaryButton onClick={handleResarvedRoom}>空室を探す</PrimaryButton>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GestroomPlan;

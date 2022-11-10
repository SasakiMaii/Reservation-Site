import Pageing from "../../components/rooms/Pageing";
import RoomSearchSoart from "../../components/rooms/RoomSearchSoart";
import RoomStyle from "../../styles/rooms/_Gestroom.module.scss";
import PrimaryButton from "../../components/button/PrimaryButton";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
import { Link } from "react-router-dom";
// import "firebase";
import { useEffect, useState } from "react";
import db from "../../Firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";


const GestroomPlan = () => {
  return (
    <>
      <Header />
      <p className={RoomStyle.pageTitle}>全ての客室＆プラン</p>
      <div className={RoomStyle.roomLinkWrapper}>
        <Link to={"#"} className={RoomStyle.roomLink}>
          {" "}
          客室{" "}
        </Link>
        <Link to={"/Plan"}> プラン </Link>
      </div>
      <RoomCard />
      <Pageing />
      <Footer />
    </>
  );
};

//部屋の詳細＆プランの詳細
export const RoomCard = () => {
  const [rooms, SetRoom] = useState<any>([]);
  const [descSorts, SetDescSort] = useState<any>([]);
  const [ascSorts, SetAscSort] = useState<any>([]);
  const soartData = collection(db, "gestRoomType");
  const [soart,setSoart]=useState(false);

  useEffect(() => {
    const roomDate = collection(db, "gestRoomType");
    getDocs(roomDate).then((snapShot) => {
      SetRoom(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  const onAscSort = async () => {
    const priceAsc = query(soartData, orderBy("price"),limit(100));
    const data = await getDocs(priceAsc);
    const newAscData = data.docs.map((doc) => ({
      ...doc.data(),id:doc.id
    }));
    SetRoom(newAscData);
  };

  const onDescSort = async () => {
    const priceDesc = query(soartData, orderBy("price", "desc"), limit(100));
    const data = await getDocs(priceDesc);
    const newDescData = data.docs.map((doc) => ({
      ...doc.data(),id:doc.id
    }));
    SetRoom(newDescData);
  };

  const handleResarvedRoom = () => {};

  return (
    <>
      <div className={RoomStyle.roomPlanContainer}>
        <ul>
          <RoomSearchSoart onAscClick={onAscSort} onDescClick={onDescSort}/>
          {rooms.map((room: any) => {
            return (
              <li key={room.area} className={RoomStyle.roomPlanCard}>
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
                    <p className={RoomStyle.roomEquipment}>
                      {room.roomFacility}
                    </p>
                    <p className={RoomStyle.roomPrice}>
                      ¥{room.price}
                      <span>〜/人</span>
                    </p>
                  </div>
                </div>
                <div className={RoomStyle.ResarvedRoomBtn}>
                  <PrimaryButton onClick={handleResarvedRoom}>
                    空室を探す
                  </PrimaryButton>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default GestroomPlan;

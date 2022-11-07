import Pageing from "../../components/rooms/Pageing";
import RoomSearchSoart from "../../components/rooms/RoomSearchSoart";
import RoomStyle from "../../styles/rooms/_GestroomPlan.module.scss";
import PrimaryButton from "../../components/button/PrimaryButton";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
// import "firebase";
import { useEffect, useState } from "react";
import db from "../../Firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

const GestroomPlan = () => {
  return (
    <>
      <Header />
      <p className={RoomStyle.pageTitle}>全ての客室＆プラン</p>
      <RoomSearchSoart />
      <RoomCard />
      <Pageing />
      <Footer />
    </>
  );
};

//部屋の詳細＆プランの詳細
export const RoomCard = () => {
  const [rooms, SetRoom] = useState<any>([]);

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
    <div className={RoomStyle.roomContainer}>
      <ul>
        {rooms.map((room: any) => {
          return (
            <li key={room.are}  className={RoomStyle.roomCard}>
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
              <PrimaryButton onClick={handleResarvedRoom}>この部屋で予約する</PrimaryButton>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const PranCard = () => {
  const [plans, SetPlans] = useState<any>([]);
  useEffect(() => {
    const planData = collection(db, "Plan");
    getDocs(planData).then((snapShot) => {
      return SetPlans(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);
  const onResarve = () => {};
  return (
    <>
      {plans.map((plan:any) => {
        <div key={plan.id}>
          <h2 className={RoomStyle.sectionTitle}>プラン</h2>
          <hr />
          <div className={RoomStyle.planDetails}>
            <img
              className={RoomStyle.planpic}
              src="hotel-4.jpg"
              alt="planpicture"
            />
            <p className={RoomStyle.plantitle}>{plan.name}</p>
            <PrimaryButton onClick={onResarve}>このプランで予約</PrimaryButton>
          </div>
        </div>;
      })}
    </>
  );
};

export default GestroomPlan;

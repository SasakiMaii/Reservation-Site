import { useEffect, useState } from "react";
import db from "../../Firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import PlanStyle from "../../styles/rooms/_Gestroom.module.scss";
import PrimaryButton from "../../components/button/PrimaryButton";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
import RoomSearchSoart from "../../components/rooms/RoomSearchSoart";
import Pageing from "../../components/rooms/Pageing";



//プラン
const Plan = () => {
  return (
    <>
      <Header />
      <p className={PlanStyle.pageTitle}>全ての客室＆プラン</p>
      <div className={PlanStyle.planLinkWrapper}>
        <Link to={"/GestRoom"}>客室</Link>
        <Link to={"#"} className={PlanStyle.planLink}>プラン</Link>
      </div>
      <RoomSearchSoart />
      <PlanCard />
      <Pageing />
      <Footer />
    </>
  );
};

export const PlanCard = () => {
  const [plans, SetPlans] = useState<any>([]);

  useEffect(() => {
    const planData = collection(db, "Plan");
    getDocs(planData).then((snapShot) => {
      SetPlans(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);
  const handleResarvedEmptyRoom = () => {};

  return (
    <div className={PlanStyle.roomPlanContainer}>
      <ul>
        {plans.map((plan: any) => {
          return (
            <li key={plan.name} className={PlanStyle.roomPlanCard}>
              <h1 className={PlanStyle.planName}>{plan.name}</h1>
              <img
                className={PlanStyle.planpic}
                src="hotel-4.jpg"
                alt="roompicture"
              />
              <p className={PlanStyle.planDetail}>{plan.planDetail}</p>
              <p className={PlanStyle.roomCapacity}>
                チェックイン：{plan.checkIn}
              </p>
              <p className={PlanStyle.roomCapacity}>
                チェックアウト：{plan.checkOut}
              </p>
              <hr />
              <div className={PlanStyle.planWrapper}>
                <p className={PlanStyle.bedType}>期間:{plan.period}</p>
                <p className={PlanStyle.bedType}>お食事:{plan.food}</p>
                <p className={PlanStyle.bedType}>
                  お支払い方法:{plan.payment}
                </p>
              </div>
              <div className={PlanStyle.ResarvedPlanBtn}>
                <PrimaryButton onClick={handleResarvedEmptyRoom}>このプランで空室を探す</PrimaryButton>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export default Plan;

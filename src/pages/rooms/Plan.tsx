import { useEffect, useState } from "react";
import db from "../../Firebase";
import { collection, doc, setDoc, getDocs, limit, orderBy, query } from "firebase/firestore";
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
      <PlanCard />
      <Pageing />
      <Footer />
    </>
  );
};

export const PlanCard = () => {
  const [plans, SetPlans] = useState<any>([]);
  const soartData = collection(db, "Plan");

  //降順
  const onAscSort = async () => {
    const priceAsc = query(soartData, orderBy("price"),limit(100));
    const data = await getDocs(priceAsc);
    const newAscData = data.docs.map((doc) => ({
      ...doc.data(),id:doc.id
    }));
    SetPlans(newAscData);
  };

  //昇順
  const onDescSort = async () => {
    const priceDesc = query(soartData, orderBy("price", "desc"), limit(100));
    const data = await getDocs(priceDesc);
    const newDescData = data.docs.map((doc) => ({
      ...doc.data(),id:doc.id
    }));
    SetPlans(newDescData);
  };

  //firebaseのID順
  useEffect(() => {
    const planData = collection(db, "Plan");
    getDocs(planData).then((snapShot) => {
      SetPlans(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  const handleResarvedEmptyRoom = () => {};

  return (
    <>
    <RoomSearchSoart onAscClick={onAscSort} onDescClick={onDescSort}/>
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
        </>
  );
};

export default Plan;

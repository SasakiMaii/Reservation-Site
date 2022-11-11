import { useEffect, useState } from "react";
import db from "../../Firebase";
import { collection, doc, setDoc, getDocs, limit, orderBy, query, startAfter, endBefore } from "firebase/firestore";
import PlanStyle from "../../styles/rooms/_Gestroom.module.scss";
import PrimaryButton from "../../components/button/PrimaryButton";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
import RoomSearchSoart from "../../components/rooms/RoomSearchSoart";
import Pageing from "../../components/rooms/Pageing";
import PagingStyle from "../../styles/rooms/_Paging.module.scss";
//プラン
const Plan = () => {
  return (
    <>
      <Header />
      <p className={PlanStyle.pageTitle}>全ての客室＆プラン</p>
      <div className={PlanStyle.planLinkWrapper}>
        <Link to={"/rooms/GestRoom"}>客室</Link>
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
  const [descClick,setDescClick]=useState(false);
  const [ascClick,setAscClick]=useState(false);
  const soartData = collection(db, "Plan");

  //降順
  const onAscSort = async () => {
    const priceAsc = query(soartData, orderBy("price"),limit(3));
    const data = await getDocs(priceAsc);
    const newAscData = data.docs.map((doc) => ({
      ...doc.data(),id:doc.id
    }));
    setDescClick(false)
    setAscClick(true)
    SetPlans(newAscData);
  };

  //昇順
  const onDescSort = async () => {
    const priceDesc = query(soartData, orderBy("price", "desc"), limit(3));
    const data = await getDocs(priceDesc);
    const newDescData = data.docs.map((doc) => ({
      ...doc.data(),id:doc.id
    }));
    setDescClick(true)
    setAscClick(false)
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

  console.log(descClick)
  console.log(ascClick)
  const handleNextPage = async () => {
    if(descClick===true){
      const priceDesc = query(soartData, orderBy("price","desc"), limit(3));
      const data = await getDocs(priceDesc);
      const last = data.docs[data.docs.length - 1];
      const next = query(soartData, orderBy("price","desc"), startAfter(last), limit(3));
      const nextdata =await getDocs(next)
      const nextPage = nextdata.docs.map((doc)=>({
        ...doc.data(),id:doc.id
      }))
      // console.log(nextPage)
      SetPlans(nextPage)
    }else if(ascClick===true){
      const priceDesc = query(soartData, orderBy("price"), limit(3));
      const data = await getDocs(priceDesc);
      const last = data.docs[data.docs.length - 1];
      const next = query(soartData, orderBy("price"), startAfter(last), limit(3));
      const nextdata =await getDocs(next)
      const nextPage = nextdata.docs.map((doc)=>({
        ...doc.data()
      }))
      // console.log(nextPage)

      SetPlans(nextPage)
    }else{
      const priceDesc = query(soartData, orderBy("price"), limit(3));
      const data = await getDocs(priceDesc);
      const last = data.docs[data.docs.length - 1];
      const next = query(soartData, orderBy("price"), startAfter(last), limit(3));
      const nextdata =await getDocs(next)
      const nextPage = nextdata.docs.map((doc)=>({
        ...doc.data()
      }))
      // console.log(nextPage)

      SetPlans(nextPage)
    }
  };
  //前のページに戻るボタン
  const handlePrevPage =async () => {
    //安い順の時はこれでちゃんと戻れる
    if(descClick===true){
      const priceDesc = query(soartData, orderBy("price", "desc"), limit(3),);
      const data = await getDocs(priceDesc);
      const newDescData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      SetPlans(newDescData)
    }else{
      const p = query(soartData, orderBy("price"), limit(4));
      const data = await getDocs(p);
      const descPrev = data.docs[data.docs.length - 1];
      const next = query(soartData, orderBy("price"), endBefore(descPrev), limit(3));
      const descPrevdata =await getDocs(next)
      const prevPage = descPrevdata.docs.map((doc)=>({
        ...doc.data()
      }))
      SetPlans(prevPage)
    }
  };

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
                src="../hotel-4.jpg"
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
      <div className={PagingStyle.pagingWrapper}>
        {<button onClick={handlePrevPage}>前へ</button>}
        <button onClick={handleNextPage}>次へ</button>
        </div>
    </div>
    </>
  );
};


export default Plan;

import { useEffect, useState } from "react";
import db from "../../Firebase";
import { IoSearchOutline } from "react-icons/io5";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  endBefore,
} from "firebase/firestore";
import PlanStyle from "../../styles/rooms/_Gestroom.module.scss";
import PrimaryButton from "../../components/Atoms/button/PrimaryButton";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
import SecondryButton from "../../components/Atoms/button/SecondryButton";
import Head from "../../components/layout/Head";
import EmptyRoomConditions from "../../components/Templates/EmptyRoomConditions";
import PrimaryLink from "../../components/Atoms/PrimaryLink";
import RoomStyle from "../../styles/rooms/_Gestroom.module.scss";
import PlanSearchSoart from "../../components/Organisms/rooms/PlanSearchSoart";
import Pageing from "../../components/Organisms/rooms/Pageing";

//プラン
const Plan = () => {
  //card
  const [plans, SetPlans] = useState<any>([]);
  const [rooms, SetRooms] = useState<any>([]);
  const [descClick, setDescClick] = useState(false);
  const [ascClick, setAscClick] = useState(false);
  //search
  const [room, setRoom] = useState<any>([]); //db取り出し
  const [reserve, setReserve] = useState<any>([]); //db取り出し
  const [reserved, setReserved] = useState<any>([]); //db取り出し
  const [datetext, setDatetext] = useState("");
  const [info, setInfo] = useState([]);
  const [err, setErr] = useState([]); //検索のバリデーション

  return (
    <>
      <Head
        title="PrinceViewHotel-客室・プラン"
        description="このサイトの内容です"
      />
      <Header />
      <p className={PlanStyle.pageTitle}>
        <IoSearchOutline />
        空室検索
      </p>
      <PrimaryLink
        title={"ご予約内容の確認はこちら"}
        path={"/books/ReservateHistory"}
        classname={RoomStyle.reservedCheck}
      />
      {err.map((error: any) => {
        return (
          <p key={err[1]} className={RoomStyle.err}>
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
        setReserve={setReserve}
        reserve={reserve}
      />
      <p className={PlanStyle.pageTitle2}>全ての客室＆プラン</p>
      <div className={PlanStyle.roomLinkWrapper}>
        <Link to={"/rooms/Gestroom"}> 客室で探す </Link>
        <Link to={"#"} className={PlanStyle.planLink}>
          {" "}
          プランで探す{" "}
        </Link>
      </div>
      {err.map((error: any) => {
        return (
          <p key={err[0]} className={RoomStyle.err}>
            ※{error}
          </p>
        );
      })}
      {info.map((information: any) => {
        return (
          <p key={info[0]} className={RoomStyle.info}>
            ※{information}
          </p>
        );
      })}
      <PlanCard
        plans={plans}
        SetPlans={SetPlans}
        rooms={rooms}
        setRooms={SetRooms}
        descClick={descClick}
        setDescClick={setDescClick}
        setAscClick={setAscClick}
        ascClick={ascClick}
      />
      <Footer />
    </>
  );
};

export const PlanCard = (props: any) => {
  const {
    plans,
    SetPlans,
    SetRooms,
    descClick,
    setDescClick,
    ascClick,
    setAscClick,
  } = props;

  const soartData = collection(db, "Plan");

  //firebaseのID順
  useEffect(() => {
    const planData = query(soartData, orderBy("price"), limit(3));
    getDocs(planData).then((snapShot) => {
      SetPlans(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  const handleResarvedEmptyRoom = () => {};
  const handleNextPage = async () => {
    if (descClick === true) {
      const priceDesc = query(soartData, orderBy("price", "desc"), limit(3));
      const data = await getDocs(priceDesc);
      const last = data.docs[data.docs.length - 1];
      const next = query(
        soartData,
        orderBy("price", "desc"),
        startAfter(last),
        limit(3)
      );
      const nextdata = await getDocs(next);
      const nextPage = nextdata.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      SetPlans(nextPage);
    } else if (ascClick === true) {
      const priceDesc = query(soartData, orderBy("price"), limit(3));
      const data = await getDocs(priceDesc);
      const last = data.docs[data.docs.length - 1];
      const next = query(
        soartData,
        orderBy("price"),
        startAfter(last),
        limit(3)
      );
      const nextdata = await getDocs(next);
      const nextPage = nextdata.docs.map((doc) => ({
        ...doc.data(),
      }));
      SetPlans(nextPage);
    } else {
      const priceDesc = query(soartData, orderBy("price"), limit(3));
      const data = await getDocs(priceDesc);
      const last = data.docs[data.docs.length - 1];
      const next = query(
        soartData,
        orderBy("price"),
        startAfter(last),
        limit(3)
      );
      const nextdata = await getDocs(next);
      const nextPage = nextdata.docs.map((doc) => ({
        ...doc.data(),
      }));
      SetPlans(nextPage);
    }
  };
  //前のページに戻るボタン
  const handlePrevPage = async () => {
    //安い順の時はこれでちゃんと戻れる
    if (descClick === true) {
      const priceDesc = query(soartData, orderBy("price", "desc"), limit(3));
      const data = await getDocs(priceDesc);
      const newDescData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      SetPlans(newDescData);
    } else {
      const p = query(soartData, orderBy("price"), limit(4));
      const data = await getDocs(p);
      const descPrev = data.docs[data.docs.length - 1];
      const next = query(
        soartData,
        orderBy("price"),
        endBefore(descPrev),
        limit(3)
      );
      const descPrevdata = await getDocs(next);
      const prevPage = descPrevdata.docs.map((doc) => ({
        ...doc.data(),
      }));
      SetPlans(prevPage);
    }
  };

  return (
    <>
      <PlanSearchSoart
        setDescClick={setDescClick}
        setAscClick={setAscClick}
        SetPlans={SetPlans}
        SetRooms={SetRooms}
      />
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
                  <SecondryButton onClick={handleResarvedEmptyRoom}>
                    このプランで空室を探す
                  </SecondryButton>
                </div>
                <div className={PlanStyle.roomplanWrapper}>
                  <p className={PlanStyle.roomplan}>部屋</p>
                </div>

                <div className={PlanStyle.roomplanCard}>
                  <img
                    className={PlanStyle.roompic}
                    src="../hotel-4.jpg"
                    alt="roompicture"
                  />
                  <div className={PlanStyle.roomplanContainer}>
                    {plan.south ? (
                      <p className={PlanStyle.roomplantitle}>{plan.south}</p>
                    ) : plan.west ? (
                      <p className={PlanStyle.roomplantitle}>{plan.west}</p>
                    ) : plan.north ? (
                      <p className={PlanStyle.roomplantitle}>{plan.west}</p>
                    ) : plan.east ? (
                      <p className={PlanStyle.roomplantitle}>{plan.east}</p>
                    ) : (
                      <></>
                    )}
                    <p>定員:1〜2名</p>
                    <p>【客室室内設備】{plan.roomFacility}</p>
                    <div className={PlanStyle.roomplanBtnPrice}>
                      {plan.southPrice ? (
                        <p className={PlanStyle.roomplanPrice}>
                          ¥{plan.southPrice}
                          <span>〜/人</span>
                        </p>
                      ) : plan.northPrice ? (
                        <p className={PlanStyle.roomplanPrice}>
                          ¥{plan.northPrice}
                          <span>〜/人</span>
                        </p>
                      ) : plan.westPrice ? (
                        <p className={PlanStyle.roomplanPrice}>
                          ¥{plan.westPrice}
                          <span>〜/人</span>
                        </p>
                      ) : plan.eastPrice ? (
                        <p className={PlanStyle.roomplanPrice}>
                          ¥{plan.eastPrice}
                          <span>〜/人</span>
                        </p>
                      ) : (
                        <></>
                      )}
                      <div className={PlanStyle.roomplanBtn}>
                        <PrimaryButton onClick={handleResarvedEmptyRoom}>
                          この部屋で探す
                        </PrimaryButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={PlanStyle.roomplanCard}>
                  <img
                    className={PlanStyle.roompic}
                    src="../hotel-4.jpg"
                    alt="roompicture"
                  />
                  <div className={PlanStyle.roomplanContainer}>
                    {plan.south && plan.north ? (
                      <p className={PlanStyle.roomplantitle}>{plan.north}</p>
                    ) : plan.east && plan.west ? (
                      <p className={PlanStyle.roomplantitle}>{plan.east}</p>
                    ) : plan.north && plan.east ? (
                      <p className={PlanStyle.roomplantitle}>{plan.east}</p>
                    ) : plan.south && plan.west ? (
                      <p className={PlanStyle.roomplantitle}>{plan.west}</p>
                    ) : plan.south && plan.east ? (
                      <p className={PlanStyle.roomplantitle}>{plan.east}</p>
                    ) : (
                      <></>
                    )}
                    <p>定員:1〜2名</p>
                    <p>【客室室内設備】{plan.roomFacility}</p>
                    <div className={PlanStyle.roomplanBtnPrice}>
                      {plan.south && plan.north ? (
                        <p className={PlanStyle.roomplanPrice}>
                          ¥{plan.northPrice}
                          <span>〜/人</span>
                        </p>
                      ) : plan.east && plan.west ? (
                        <p className={PlanStyle.roomplanPrice}>
                          ¥{plan.eastPrice}
                          <span>〜/人</span>
                        </p>
                      ) : plan.north && plan.east ? (
                        <p className={PlanStyle.roomplanPrice}>
                          ¥{plan.eastPrice}
                          <span>〜/人</span>
                        </p>
                      ) : plan.south && plan.west ? (
                        <p className={PlanStyle.roomplanPrice}>
                          ¥{plan.westPrice}
                          <span>〜/人</span>
                        </p>
                      ) : plan.south && plan.east ? (
                        <p className={PlanStyle.roomplanPrice}>
                          ¥{plan.eastPrice}
                          <span>〜/人</span>
                        </p>
                      ) : (
                        <></>
                      )}
                      <div className={PlanStyle.roomplanBtn}>
                        <PrimaryButton onClick={handleResarvedEmptyRoom}>
                          この部屋で探す
                        </PrimaryButton>
                      </div>
                    </div>
                  </div>
                </div>
                <p>
                  ※表示されている料金は参考価格です。予約内容確認画面で最終的な料金をご確認ください。
                </p>
              </li>
            );
          })}
        </ul>
        <Pageing onPrevClick={handlePrevPage} onNextClick={handleNextPage} />
      </div>
    </>
  );
};

export default Plan;

import { useEffect, useState } from "react";
import db from "../../Firebase";
import {
  IoSearchOutline,
} from "react-icons/io5";
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
import RoomSearchSoart from "../../components/Organisms/rooms/RoomSearchSoart";
import Pageing from "../../components/Organisms/rooms/Pageing";
import PagingStyle from "../../styles/rooms/_Paging.module.scss";
import RoomPlanSearch from "../../components/Templates/Search";
import SecondryButton from "../../components/Atoms/button/SecondryButton";
import RoomLink from "../../components/Molecules/rooms/RoomLink";
import Head from "../../components/layout/Head";

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
  const [adultInput, setAdultInput] = useState<any>("");
  const [chilrdInput, setChilrdInput] = useState<any>("");
  const [roomChange, setRoomChange] = useState<any>(""); //selectの値
  const [downChange, setDownChange] = useState<any>("");
  const [upChange, setUpChange] = useState<any>("");
  const [datetext, setDatetext] = useState("");

  const dateChoice = () => {

    const roomFilter = reserve.filter((x: any) => {
      return x.roomType === roomChange;
    });
    //部屋が一致
    const roomFilters = reserved.filter((x: any) => {
      return x.roomType === roomChange;
    });
    //部屋が一致

    const count = Number(adultInput) + Number(chilrdInput) <= 3;
    //人数が合わせて３人以上だったらtrue

    const noemptyRooms = reserve.filter((x: any) => {
      return String(x.checkIn) === datetext;
    });
    //日付が一致（予約確認のDBと入力値）
    const noemptyRoom = reserved.filter((x: any) => {
      return String(x.checkIn) === datetext;
    });
    //日付が一致（予約確認のDBと入力値）

    const priceFilter = downChange <= upChange;
    //上限金額のが高いように(trueが正常)

    const price = room.filter((x: any) => {
      return Number(downChange) >= x.price || x.price <= Number(upChange);
    });

    if (adultInput === "" || datetext === "") {
      console.log("必須項目を入力してください");
    }
    if (count === false) {
      console.log("部屋に対しての人数が超過しています");
    }
    if (new Date(datetext) <= new Date(new Date().toString())) {
      console.log("今日以降の日付を入れてください");
    } else if (noemptyRoom.length===0||noemptyRooms.length === 1 && roomFilter.length === 0) {
      console.log("日付は埋まってるけど部屋は埋まってないのでその部屋を表示");
    } else if (
      (noemptyRoom.length===1||
      noemptyRooms.length === 1) &&
      roomFilter.length === 1 &&
      roomFilters.length === 1 &&
      priceFilter === false
    ) {
      console.log("空室なし");
    } else if (roomFilter) {
      console.log("空室の表示");
    } else if (price === 1) {
      console.log(price);
    }
  };

  return (
    <>
     <Head title="PrinceViewHotel-客室・プラン" description="ホテルの予約サイトです。-PrinceViewHotel-"/>
      <Header />
      <p className={PlanStyle.pageTitle}><IoSearchOutline/>空室検索</p>
      <RoomPlanSearch room={room} setRoom={setRoom} reserve={reserve} setReserve={setReserve} reserved={reserved} setReserved={setReserved} chilrdInput={chilrdInput} setChilrdInput={setChilrdInput} adultInput={adultInput} setAdultInput={setAdultInput} roomChange={roomChange} setRoomChange={setRoomChange} downChange={downChange} setDownChange={setDownChange} upChange={upChange} setUpChange={setUpChange} datetext={datetext} setDatetext={setDatetext} dateChoice={dateChoice}/>
      <RoomLink/>
      <PlanCard plans={plans} SetPlans={SetPlans} rooms={rooms} setRooms={SetRooms} descClick={descClick} setDescClick={setDescClick} setAscClick={setAscClick} ascClick={ascClick}/>
      <Pageing />
      <Footer />
    </>
  );
};

export const PlanCard = (props:any) => {
  const{plans,SetPlans,SetRooms,descClick,setDescClick,ascClick,setAscClick}=props

  const soartData = collection(db, "Plan");
  const roomData = collection(db, "gestRoomType");


  //firebaseのID順
  useEffect(() => {
    const room = query(roomData, orderBy("price"), limit(4));
    getDocs(room).then((snapShot) => {
      SetRooms(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
    const planData = query(soartData, orderBy("price"), limit(3));
    getDocs(planData).then((snapShot) => {
      SetPlans(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);
  //降順
  const onAscSort = async () => {
    const priceAsc = query(soartData, orderBy("price"), limit(3));
    const data = await getDocs(priceAsc);
    const newAscData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setDescClick(false);
    setAscClick(true);
    SetPlans(newAscData);
  };
  //昇順
  const onDescSort = async () => {
    const priceDesc = query(soartData, orderBy("price", "desc"), limit(3));
    const data = await getDocs(priceDesc);
    const newDescData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setDescClick(true);
    setAscClick(false);
    SetPlans(newDescData);
  };
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
      <RoomSearchSoart onAscClick={onAscSort} onDescClick={onDescSort} />
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
                  <p className={PlanStyle.roomplan}>
                    部屋
                  </p>
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
                <p >
                  ※表示されている料金は参考価格です。予約内容確認画面で最終的な料金をご確認ください。
                </p>
              </li>
            );
          })}
        </ul>
        <div className={PagingStyle.pagingWrapper}>
          {<button onClick={handlePrevPage}>1</button>}
          <button onClick={handleNextPage}>2</button>・・
        </div>
      </div>
    </>
  );
};

export default Plan;

import { useState } from "react";
import { addDoc, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import PrimaryButton from "../../components/button/PrimaryButton";
import db from "../../Firebase";
import RoomDetailStyle from "../../styles/rooms/_RoomDetails.module.scss";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
import { Link, useLocation } from "react-router-dom";
import { useParams,useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

  // const status = 404;
  // if (status === 404) {
  // return <Navigate to="/notfound" />;
  // }リダイレクト


const RoomDetails = () => {
  const [num, setNum] = useState(1);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState<any>([]);
  const [inputDate, setInputDate] = useState(false);
  const [datetext, setDatetext] = useState("");
  // const location =useLocation()
  // const [selectId,setSelectId]=useState<{id:number}>(location.state as {id:number})
  const params = useParams();
  
  const RoomData = collection(db, "gestRoomType");
  const detailRoom = query(RoomData, limit(1));
  useEffect(() => {
    getDocs(detailRoom).then((snapShot) => {
      setRooms(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  const obroop = () => {
    const price = [];
    for (let i = 1; i <= 3; i++) {
      price.push(
        <option key={i} value={i}>
          {i}人
        </option>
      );
    }
    return price;
  };
  const handleResarve = () => {
    const reserveData = collection(db, "reserve");
    const data = {
      adultsNum:adult,
      childrenNum:children,
      checkIn:datetext,
      price:result,
      roomType:String(room),
      totalDate:num,
    };
    addDoc(reserveData, data);
  };

  // const gestRoomData = collection(db, "gestRoomType");

  const handleDateClick = (arg: any) => {
    if (inputDate === false) {
      arg.dayEl.style.backgroundColor = "steelblue"; //カレンダーに色つける
      setInputDate(true);
      setDatetext(arg.dateStr);
    } else if (inputDate === true) {
      arg.dayEl.style.backgroundColor = ""; //カレンダーの色を変える
      setInputDate(false);
      // alert(arg.dateStr)
    }
  };

  const price =rooms.map((room:any)=>(room.price))
  const room=rooms.map((room:any)=>(room.area))

  const result=(num* Number(price)*adult+children*5000).toLocaleString()

  return (
    <>
      <Header />
        <>
        <p>{params.id}番目の記事です</p>
      <Link to={"/"} className={RoomDetailStyle.detailreservedchange}>
        予約内容の確認・取り消しはこちら
      </Link>
      {rooms.map((room: any) => {
        return (
          <div key={room.id} className={RoomDetailStyle.detailcontainers}>
            <div className={RoomDetailStyle.detailcontainer}>
              <div className={RoomDetailStyle.detailwrapper}>
                <h1 className={RoomDetailStyle.RoomName}>{room.area}</h1>
                <img
                  src="../hotel-4.jpg"
                  className={RoomDetailStyle.detailpic}
                  alt="roompicture"
                  />
                <div className={RoomDetailStyle.detailCheck}>
                  <p>※チェックインの日付を選択してください</p>
                <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                locale="ja"
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                selectable={true}
                selectMirror={true}
                businessHours={true}
                />
                <p>チェックイン：{room.checkIn}</p>
                <p>チェックアウト：{room.checkOut}</p>
                </div>
              </div>
              <div className={RoomDetailStyle.detailplan}>
                <p className={RoomDetailStyle.count}>人数</p>
                <div className={RoomDetailStyle.detailcount}>
                  <p>大人</p>
                  <select
                    onChange={(e:any) => setAdult(e.target.value)}
                    name="people"
                    id="people"
                    >
                    {obroop()}
                  </select>
                  <p>子供</p>
                  <select name="people" id="people" onChange={(e:any)=>setChildren(e.target.value)}>
                    <option value="0">--</option>
                    {obroop()}
                  </select>
                </div>

                <div className={RoomDetailStyle.detaildate}>
                  <p className={RoomDetailStyle.count}>宿泊日数</p>
                  <select
                    name="people"
                    id="people"
                    onChange={(e: any) => setNum(e.target.value)}
                    >
                    <option value="1">1泊</option>
                    <option value="2">2泊</option>
                    <option value="3">3泊</option>
                    <option value="4">4泊</option>
                    <option value="5">5泊</option>
                  </select>
                </div>
                <div>
                  <p className={RoomDetailStyle.count}>合計金額</p>
                  <p>一泊¥{room.price.toLocaleString()}〜/人</p>
                  <p className={RoomDetailStyle.roomPrice}>
                    ¥{result}
                  </p>
                  <p className={RoomDetailStyle.detailAttention}>
                    *お子様は一泊¥5,000です。
                  </p>
                </div>
                <div className={RoomDetailStyle.detailBtn}>
                  <PrimaryButton onClick={handleResarve}>予約する</PrimaryButton>
                </div>
              </div>
            </div>
            <p className={RoomDetailStyle.detail}>お部屋の詳細</p>
            <p className={RoomDetailStyle.detailStyle}>
              {" "}
              32～40インチテレビ / 竹製 歯ブラシ / 歯磨き粉 / シャンプー /
              コンディショナー ボディーソープ / ハンドソープ / パジャマ /
              スリッパ アロマディフューザー / ヘアドライヤー / 空気清浄機 /
              冷蔵庫 金庫 / 電気ケトル / Wi-Fi
            </p>
            <Link to={"/rooms/Gestroom"} className={RoomDetailStyle.detaillink}>
              {" "}
              →前の画面に戻る{" "}
            </Link>
            <RecomendPlan />
          </div>
        );
      })}
      </>
      <Footer />
    </>
  );
};

export const RecomendPlan = () => {
  const PlanData = collection(db, "Plan");
  const detailPlan = query(PlanData, limit(3));
  const [plans, setPlans] = useState<any>([]);
  useEffect(() => {
    getDocs(detailPlan).then((snapShot) => {
      setPlans(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);
  return (
    <>
      <p className={RoomDetailStyle.recomendName}>お客さまにおすすめのプラン</p>
      <div className={RoomDetailStyle.recomendContainer}>
        {plans.map((plan: any) => (
          <div key={plan.name}>
            <img
              src="../hotel-4.jpg"
              className={RoomDetailStyle.detailrecomendpic}
              alt="roompicture"
            />
            <p>{plan.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default RoomDetails;


import { ChangeEvent, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect } from "react";
import PrimaryButton from "../../components/Atoms/button/PrimaryButton";
import db, { auth } from "../../Firebase";
import RoomDetailStyle from "../../styles/rooms/_RoomDetails.module.scss";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
import { Link, useLocation } from "react-router-dom";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { RecomendRoom } from "./PlanDetails";
import { useDispatch, useSelector } from "react-redux";
import { setAdultCount, setChildInput } from "../../store/SearchSlice";
import Stays from "../../components/Organisms/rooms/Stays";
import Calender from "../../components/Atoms/Calender";

const RoomDetails = () => {
  const [num, setNum] = useState(1);
  const [rooms, setRooms] = useState<any>([]);
  const [inputDate, setInputDate] = useState(false);
  const [datetext, setDatetext] = useState("");

  const dispatch = useDispatch();
  const adultEl = useSelector((state: any) => state.searchInput.adultCount);
  const childEl = useSelector((state: any) => state.searchInput.childInput);
  const [SearchParams] = useSearchParams();

  const adultchange = (ev: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setAdultCount(ev.target.value));
  };
  const childchange = (ev: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setChildInput(ev.target.value));
  };

  // データの受け渡しのため
  const navigation = useNavigate();

  // ログイン情報
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // ゲストID情報取得
  const [gestIdCookie, SetGestIdCookie] = useState();

  // gestID（hJ2JnzBn）の入れ物
  const cookieList: any = [];
  useEffect(() => {
    // 以下、cookie取り出し処理
    const splitCookie = document.cookie.split(";");
    const list = [];

    for (let i = 0; i < splitCookie.length; i++) {
      list.push(splitCookie[i].split("="));
    }

    // cookieにgestID（hJ2JnzBn）がセットされていな場合、付与する
    list.map((data, index) => {
      if (data[0].includes("hJ2JnzBn")) {
        cookieList.push(data[0]);
      }
    });
  }, []);

  const RoomData = collection(db, "gestRoomType");

  useEffect(() => {
    const roomtype = SearchParams.get("room");
    const detailRoom = query(RoomData, limit(1), where("id", "==", roomtype)); //一つだけ表示
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

  // ログインログアウト判定追加
  const handleResarve = () => {
    if (user) {
      console.log(user.email);
      const data = {
        adultsNum: Number(adultEl),
        childrenNum: Number(childEl),
        checkIn: datetext,
        price: result,
        roomType: String(room),
        totalDate: Number(num),
        mail: user.email,
      };
      // addDoc(reserveData, data);
      navigation("/books/ReservateConfirm", { state: data });
      // navigate("/books/ReservateConfirm");
    } else {
      // const reserveData = collection(db, "reserve");
      const data = {
        adultsNum: adultEl,
        childrenNum: childEl,
        checkIn: datetext,
        price: result,
        roomType: String(room),
        totalDate: Number(num),
      };
      // navigate("/users/login")
      navigation("/users/login", { state: data });
      document.cookie = "next=confirm; path=/;";
    }
  };
  // const gestRoomData = collection(db, "gestRoomType");

  const room = rooms.map((room: any) => room.area);
  const price = rooms.map((room: any) => room.price);
  const result = (
    num * Number(price) * adultEl +
    childEl * 5000
  ).toLocaleString();

  return (
    <>
      <Header />
      <div className={RoomDetailStyle.containerAllDetail}>
        <Link to={"/rooms/Gestroom"} className={RoomDetailStyle.detaillink}>
          <HiOutlineChevronLeft size={25} /> 客室・プランへ戻る{" "}
        </Link>
        {rooms.map((room: any) => {
          return (
            <div key={room.id} className={RoomDetailStyle.detailcontainers}>
              <div className={RoomDetailStyle.detailcontainer}>
                <div className={RoomDetailStyle.detailwrapper}>
                  <h1 className={RoomDetailStyle.RoomName}>{room.area}</h1>
                  <img
                    src={room.image}
                    className={RoomDetailStyle.detailpic}
                    alt="roompicture"
                  />
                  <div className={RoomDetailStyle.detailCheck}>
                    <p>※チェックインの日付を選択してください</p>
                    {/* inputDate,setInputDate,setDatetext */}
                    <Calender
                      inputDate={inputDate}
                      setInputDate={setInputDate}
                      setDatetext={setDatetext}
                    />
                    <p>チェックイン：{room.checkIn}</p>
                    <p>チェックアウト：{room.checkOut}</p>
                  </div>
                </div>
                <div className={RoomDetailStyle.detailplan}>
                  <p className={RoomDetailStyle.count}>人数</p>
                  <div className={RoomDetailStyle.detailcount}>
                    <p>大人</p>
                    <select onChange={adultchange} name="people" id="people">
                      {obroop()}
                    </select>
                    <p>子供</p>
                    <select name="people" id="people" onChange={childchange}>
                      <option value="0">--</option>
                      {obroop()}
                    </select>
                  </div>
                  <Stays setNum={setNum} />
                  <div>
                    <p className={RoomDetailStyle.count}>合計金額</p>
                    <p>一泊¥{room.price.toLocaleString()}〜/人</p>
                    <p className={RoomDetailStyle.roomPrice}>¥{result}</p>
                    <p className={RoomDetailStyle.detailAttention}>
                      *お子様は一泊¥5,000です。
                    </p>
                  </div>
                  <div className={RoomDetailStyle.detailBtn}>
                    <PrimaryButton onClick={handleResarve}>
                      予約する
                    </PrimaryButton>
                  </div>
                </div>
              </div>
              <div className={RoomDetailStyle.detailcard}>
                <p className={RoomDetailStyle.detail}>お部屋の詳細</p>
                <p className={RoomDetailStyle.detailStyle}>
                  {" "}
                  32～40インチテレビ / 竹製 歯ブラシ / 歯磨き粉 / シャンプー /
                  コンディショナー ボディーソープ / ハンドソープ / パジャマ /
                  スリッパ アロマディフューザー / ヘアドライヤー / 空気清浄機 /
                  冷蔵庫 金庫 / 電気ケトル / Wi-Fi
                </p>
              </div>
              <RecomendRoom />
              <Link
                to={"/rooms/Gestroom"}
                className={RoomDetailStyle.detaillink}
              >
                {" "}
                →前の画面に戻る{" "}
              </Link>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default RoomDetails;

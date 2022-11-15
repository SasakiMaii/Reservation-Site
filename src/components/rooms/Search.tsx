//React icon
import {
  IoCalendarOutline,
  IoAccessibilitySharp,
  IoAccessibilityOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchStyle from "../../styles/rooms/_Search.module.scss";
import PrimaryButton from "../button/PrimaryButton";
import SearchInputLayout from "./SearchInputLayout";
import Header from "../layout/Header";
import Footer from "../layout/footer";
import Modal from "./Modal";
import SecondryButton from "../button/SecondryButton";
import db from "../../Firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  endBefore,
} from "firebase/firestore";

const RoomPlanSearch = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [datetext, setDatetext] = useState("");
  const [checked, setChecked] = useState("");
  const [inputDate, setInputDate] = useState(false);
  const [reserve, setReserve] = useState<any>([]);
  const [reserved, setReserved] = useState<any>([]);

  // firebaseのタイムスタンプ型とFullCarenderのDate型で相違があるため.toDateでデータ型を変える必要あり
  useEffect(() => {
    const reserveData = collection(db, "reserve"); //注文確認のDB
    const reservedData = collection(db, "reserved"); //注文確定のDB
    getDocs(reserveData).then((snapShot) => {
      setReserve(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
    getDocs(reservedData).then((snapShot) => {
      setReserved(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  console.log(datetext)

  const res =reserve.filter((x:any)=>{return x.checkIn===datetext})

  const result=reserved.filter((f:any)=>{return f.checkIn===datetext})

  // const result=reserve.map((x:any)=>{if(x.)})
console.log(result)
  console.log(res)


  const dateChoice = () => {};

  return (
    <>
      <Link to={"/"} className={SearchStyle.reservedCheck}>
        ご予約内容の確認・変更・取り消しはこちら
      </Link>
      <div className={SearchStyle.container}>
        <Checkin
          showModal={showModal}
          setShowModal={setShowModal}
          showBtn={showBtn}
          setShowBtn={setShowBtn}
          datetext={datetext}
          setDatetext={setDatetext}
          checked={checked}
          setChecked={setChecked}
          inputDate={inputDate}
          setInputDate={setInputDate}
        />
        <ObsessionSearch />
        <div className={SearchStyle.rightBtn}>
          <PrimaryButton onClick={dateChoice}>検索</PrimaryButton>
        </div>
      </div>
    </>
  );
};

export const Checkin = (props: any) => {
  const ShowModal = () => {
    props.setShowModal(true);
  };

  const CheckReset = () => {
    props.setShowBtn(true);
  };

  return (
    <div className={SearchStyle.checkContainer}>
      <div className="checkinDate">
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          <IoCalendarOutline />
          チェックイン日
        </p>
        {/* showBtnがtrueで、カレンダーの日程が選択されていたらカレンダーの日付を表示。選択されてなかったら日程は未定の文字を表示 */}
        {props.showBtn ? (
          <SecondryButton onClick={ShowModal}>日程を選択</SecondryButton>
        ) : props.inputDate ? (
          <>
            <p className={SearchStyle.checkp}>{props.datetext}</p>
            <button onClick={CheckReset} className={SearchStyle.checkbtn}>
              →日程を変更する
            </button>
          </>
        ) : (
          <>
            <p className={SearchStyle.checkp}>{props.checked}</p>
            <button onClick={CheckReset} className={SearchStyle.checkbtn}>
              →日程を変更する
            </button>
          </>
        )}
        <Modal
          showFlag={props.showModal}
          setShowBtn={props.setShowBtn}
          setShowModal={props.setShowModal}
          setDatetext={props.setDatetext}
          setChecked={props.setChecked}
          checked={props.checked}
          inputDate={props.inputDate}
          setInputDate={props.setInputDate}
        />
      </div>
      <div className={SearchStyle.adult}>
        <p>
          <IoAccessibilitySharp />
          大人
        </p>
        <SearchInputLayout />
      </div>
      <div className={SearchStyle.children}>
        <p>
          <IoAccessibilityOutline />
          子供（小学生以下）
        </p>
        <SearchInputLayout />
      </div>
    </div>
  );
};

//ループ使う際 {(()=>{})}

//こだわり条件
export const ObsessionSearch = () => {
  const obroop = () => {
    const price = [];
    for (let i = 10000; i <= 100000; i = i + 5000) {
      price.push(
        <option key={i} value={i}>
          {i}円
        </option>
      );
    }
    return price;
  };

  return (
    <>
      <div className={SearchStyle.obsessionContainer}>
        <h2 className={SearchStyle.conditions}>
          <IoSearchOutline />
          こだわり条件
        </h2>

        <div>
          <p className={SearchStyle.roomSerch}>客室の種類</p>
          <select
            className={SearchStyle.priceroomSelect}
            name="gestroom"
            id="gestroom"
          >
            <option value="">指定なし▼</option>
            <option value="north">north</option>
            <option value="south">south</option>
            <option value="west">west</option>
            <option value="east">east</option>
          </select>
        </div>
        <div className={SearchStyle.btnWrapper}>
          <div className={SearchStyle.roomPrice}>
            <p>一室もしくは１人あたりの宿泊料金</p>
            <select
              className={SearchStyle.priceroomSelect}
              name="downprice"
              id="downprice"
            >
              <option value="">下限なし▼</option>
              {obroop()}
            </select>
            &nbsp;&nbsp;&nbsp;〜&nbsp;
            <select
              className={SearchStyle.priceroomSelect}
              name="upprice"
              id="upprice"
            >
              <option value="">上限なし▼</option>
              {obroop()}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomPlanSearch;

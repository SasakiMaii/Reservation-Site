//React icon
import {
  IoCalendarOutline,
  IoAccessibilitySharp,
  IoAccessibilityOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { HiOutlineCursorClick } from "react-icons/hi";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchStyle from "../../styles/rooms/_Search.module.scss";
import PrimaryButton from "../button/PrimaryButton";
import SearchInputLayout from "./SearchInputLayout";
import Modal from "./Modal";
import SecondryButton from "../button/SecondryButton";
import db from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";

const RoomPlanSearch = (props: any) => {
  const {
    room,
    setRoom,
    reserve,
    setReserve,
    reserved,
    setReserved,
    adultInput,
    setAdultInput,
    chilrdInput,
    setChilrdInput,
    roomChange,
    setRoomChange,
    downChange,
    setDownChange,
    upChange,
    setUpChange,
    datetext,
    setDatetext,
    dateChoice,
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [checked, setChecked] = useState("");
  const [inputDate, setInputDate] = useState(false);

  useEffect(() => {
    const reserveData = collection(db, "reserve"); //注文確認のDB
    const reservedData = collection(db, "reserved"); //注文確定のDB
    const roomData = collection(db, "gestRoomType"); //部屋のDB
    getDocs(reserveData).then((snapShot) => {
      setReserve(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
    getDocs(roomData).then((snapShot) => {
      setRoom(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
    getDocs(reservedData).then((snapShot) => {
      setReserved(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);



  return (
    <>
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
          chilrdInput={chilrdInput}
          setChildInput={setChilrdInput}
          adultInput={adultInput}
          setAdultInput={setAdultInput}
        />
        <ObsessionSearch
          roomChange={roomChange}
          setRoomChange={setRoomChange}
          downChange={downChange}
          setDownChange={setDownChange}
          upChange={upChange}
          setUpChange={setUpChange}
        />
        <div className={SearchStyle.rightBtn}>
          <PrimaryButton onClick={() => dateChoice()}>検索</PrimaryButton>
        </div>
      </div>
    </>
  );
};

//
//チェックイン
//
export const Checkin = (props: any) => {
  const {
    adultInput,
    setAdultInput,
    chilrdInput,
    setChildInput,
    datetext,
    setDatetext,
  } = props;
  //大人の人数・子供の人数
  const adult = (e: ChangeEvent<HTMLInputElement>) => {
    props.setAdultInput(e.target.value);
  };
  const child = (e: ChangeEvent<HTMLInputElement>) => {
    props.setChildInput(e.target.value);
  };

  //モーダル開ける
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
          <IoCalendarOutline size={20} />
          &nbsp;チェックイン日
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
        &nbsp;
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
          <IoAccessibilitySharp size={23} /> 大人
        </p>
        <SearchInputLayout value={props.adultInput} onChange={adult} />
      </div>
      <div className={SearchStyle.children}>
        <p>
          <IoAccessibilityOutline size={20} /> 子供（小学生以下）
        </p>
        <SearchInputLayout value={props.chilrdInput} onChange={child} />
      </div>
    </div>
  );
};

//ループ使う際 {(()=>{})}

//こだわり条件
export const ObsessionSearch = ({
  setRoomChange,
  setDownChange,
  setUpChange,
}: any) => {
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

  //selectの値を取得
  const selectRoomChange = () => {
    const elem: any = document.getElementById("gestroom");
    const res = elem.value;
    setRoomChange(res);
  };
  const selectDownPriceChange = () => {
    const elem: any = document.getElementById("downPrice");
    const res = elem.value;
    setDownChange(res);
  };
  const selectUpPriceChange = () => {
    const elem: any = document.getElementById("upPrice");
    const res = elem.value;
    setUpChange(res);
  };

  return (
    <>
      <div className={SearchStyle.obsessionContainer}>
        <h2 className={SearchStyle.conditions}>
          <IoSearchOutline size={30} /> こだわり条件
        </h2>

        <div className={SearchStyle.selectWrap}>
          <p className={SearchStyle.roomSerch}>客室の種類</p>
          <select
            className={SearchStyle.priceroomSelect}
            onChange={selectRoomChange}
            name="gestroom"
            id="gestroom"
          >
            <option value="">指定なし</option>
            <option value="north">north</option>
            <option value="south">south</option>
            <option value="west">west</option>
            <option value="east">east</option>
          </select>
          &nbsp;
        </div>

        <div className={SearchStyle.btnWrapper}>
          <div className={SearchStyle.roomPrice}>
            <p>一室もしくは１人あたりの宿泊料金</p>
            <select
              className={SearchStyle.priceroomSelect}
              name="downprice"
              id="downPrice"
              onChange={selectDownPriceChange}
            >
              <option value="">下限なし</option>
              {obroop()}
            </select>
            &nbsp;&nbsp;&nbsp;&nbsp;〜&nbsp;
            <select
              className={SearchStyle.priceroomSelect}
              name="upprice"
              id="upPrice"
              onChange={selectUpPriceChange}
            >
              <option value="">上限なし</option>
              {obroop()}
            </select>
            &nbsp;
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomPlanSearch;

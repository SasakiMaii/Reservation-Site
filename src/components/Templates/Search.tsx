//React icon
import {
  IoCalendarOutline,
  IoAccessibilitySharp,
  IoAccessibilityOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchStyle from "../../styles/rooms/_Search.module.scss";
import PrimaryButton from "../Atoms/button/PrimaryButton";
import SearchInputLayout from "../Molecules/rooms/SearchInputLayout";
import Modal from "../Molecules/rooms/Modal";
import SecondryButton from "../Atoms/button/SecondryButton";
import db from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setAdultInput, setChildInput } from "../../store/SearchSlice";
import {
  setDownSelect,
  setRoomSelect,
  setUpSelect,
} from "../../store/GestroomSlice";

const RoomPlanSearch = (props: any) => {
  const {
    // setRoom,
    setReserved,
    chilrdInput,
    setChilrdInput,
    datetext,
    setDatetext,
    dateChoice,
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [checked, setChecked] = useState("");
  const [inputDate, setInputDate] = useState(false);

  useEffect(() => {
    const reservedData = collection(db, "reserved"); //注文確定のDB
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
        />
        <ObsessionSearch />
        <div className={SearchStyle.rightBtn}>
          <PrimaryButton onClick={dateChoice}>検索</PrimaryButton>
        </div>
      </div>
    </>
  );
};

//
//チェックイン
//
export const Checkin = (props: any) => {
  const { setShowModal, setShowBtn, showBtn, inputDate } = props;
  //大人の人数・子供の人数
  const dispatch = useDispatch();
  const adultEl = useSelector((state: any) => state.searchInput.adultInput);
  const childEl = useSelector((state: any) => state.searchInput.childInput);

  const adult = (ev: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAdultInput(ev.target.value));
  };
  const child = (ev: ChangeEvent<HTMLInputElement>) => {
    dispatch(setChildInput(ev.target.value));
  };

  //モーダル開ける
  const ShowModal = () => {
    setShowModal(true);
  };

  const CheckReset = () => {
    setShowBtn(true);
  };

  return (
    <div className={SearchStyle.checkContainer}>
      <div className={SearchStyle.checkinDate}>
        <p
          style={{ fontSize: "18px", marginBottom: "20px" }}
          className={SearchStyle.checkinp}
        >
          <IoCalendarOutline size={20} />
          &nbsp;チェックイン日
        </p>
        {/* showBtnがtrueで、カレンダーの日程が選択されていたらカレンダーの日付を表示。選択されてなかったら日程は未定の文字を表示 */}
        {showBtn ? (
          <div className={SearchStyle.checkinbuton}>
            <SecondryButton onClick={ShowModal}>日程を選択</SecondryButton>
          </div>
        ) : inputDate ? (
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
        <SearchInputLayout onChange={adult} value={adultEl} />
      </div>
      <div className={SearchStyle.children}>
        <p>
          <IoAccessibilityOutline size={20} /> 子供（小学生以下）
        </p>
        <SearchInputLayout value={childEl} onChange={child} />
      </div>
    </div>
  );
};

//ループ使う際 {(()=>{})}

//こだわり条件
export const ObsessionSearch = () => {
  const dispatch = useDispatch();
  const roomEl = useSelector((state: any) => state.searchInput.roomSelect);
  const upEl = useSelector((state: any) => state.searchInput.upSelect);
  const downEl = useSelector((state: any) => state.searchInput.dowmselect);

  //selectの取得
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
  const selectRoomChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setRoomSelect(ev.target.value));
  };
  const selectDownPriceChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setUpSelect(ev.target.value));
  };
  const selectUpPriceChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setDownSelect(ev.target.value));
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
            value={roomEl}
            name="gestroom"
            id="gestroom"
          >
            <option value="">指定なし</option>
            <option value="north room">north room</option>
            <option value="south room">south room</option>
            <option value="west room">west room</option>
            <option value="east room">east room</option>
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
              value={downEl}
              onChange={selectDownPriceChange}
            >
              <option value="">下限なし</option>
              {obroop()}
            </select>
            &nbsp;&nbsp;&nbsp;&nbsp;〜&nbsp;
            <select
              className={SearchStyle.priceroomSelect}
              name="upprice"
              value={upEl}
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

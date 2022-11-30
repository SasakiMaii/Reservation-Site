/* eslint-disable valid-typeof */
import React, { useState } from "react";
import ReservateConfirmContentsStyles from "../../styles/books/_ReservateConfirmContents.module.scss";
import { useNavigate } from "react-router-dom";
import db from "../../Firebase.js";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { NameInput } from "../form/nameInput";
import { TelInput } from "../form/telInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase";
import { MailInput } from "../form/mailInput";
import useSWR, { useSWRConfig } from "swr";
import { FiAlertTriangle } from "react-icons/fi";
import { ArrivalTime } from "./ArrivalTime";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "../../pages/NotFound";

export const ReservateConfirmContents = () => {
  const radioItem = [
    {
      id: "localpay",
      title: "現地にて精算",
      value: "cash",
    },
    {
      id: "creditpay",
      title: "クレジット精算",
      value: "credit",
    },
  ];

  const selectItem = ["--", 15, 16, 17, 18, 19, 20, 21, 22];

  const navigate = useNavigate();
  const [val, setVal] = useState(["check"]);
  const [click, setClick] = useState(false);

  //(firebase)データベースを格納
  const [reserves, setReserves] = useState<any>([]);

  //ログインしているユーザーのメールアドレス
  const [user] = useAuthState(auth);
  let userEmail = user?.email;
  if (user) {
    // console.log(user.email);
  }

  //入力フォームの値
  const [reserveFirstNameValue, SetReserveFirstNameValue] = useState("");
  const [reserveFirstNameErrorState, SetReserveFirstNameErrorState] =
    useState("init");
  const [reserveLastNameValue, SetReserveLastNameValue] = useState("");
  const [reserveLastNameErrorState, SetReserveLastNameErrorState] =
    useState("init");
  const [lodgeFirstNameValue, SetLodgeFirstNameValue] = useState("");
  const [lodgeFirstNameErrorState, SetLodgeFirstNameErrorState] =
    useState("init");
  const [lodgeLastNameValue, SetLodgeLastNameValue] = useState("");
  const [lodgeLastNameErrorState, SetLodgeLastNameErrorState] =
    useState("init");
  const [telValue, SetTelValue] = useState("");
  const [telErrorState, SetTelErrorState] = useState("init");
  const [mailValue, SetMailValue] = useState("");
  const [mailErrorState, SetMailErrorState] = useState("init");
  const [contact, setContact] = useState<string>("");
  const [radioVal, setRadioVal] = useState("");
  const [selectVal, setSelectVal] = useState("--");
  const [addLodgeNum, setAddLodgeNum] = useState();
  const [errorFlag, SetErrorFlag] = useState("false");
  const [message, setMessage] = useState("");

  const [error, setError] = useState(true);
  const [confirmError, setConfirmError] = useState("none");
  const [confirmMessage, setConfirmMessage] = useState("none");

  //プラン確認コンポーネントのボタン表示非表示
  const [deleteButton, setDeleteButton] = useState("block");
  const [confirmButton, setConfirmButton] = useState("block");

  //ログインしているユーザーのIDが入る
  const [docID, setDocID] = useState<any>("");

  //firebaseから予約データ取得、予約確定時にfirebaseへ送信するためのデータ
  const reserveItem = reserves.map((reserveItems: any) => reserveItems);

  //Arrival inputに入力された数字の型を数値に変換
  const arrivalTime = parseInt(selectVal);

  

  // データ受け取り
  const location = useLocation();
    const reserveData = location.state;

  // console.log(docID);
  console.log("s", reserveData);

  const { mutate } = useSWRConfig();
  const { data } = useSWR("/books/ReservateConfirm", getDocs);
  console.log(data);

  console.log(userEmail);
  //プラン削除
  const clickDelete = async () => {
    await deleteDoc(doc(db, "reserve", docID));
    alert("削除しました");
    mutate("/books/ReservateConfirm");
    // window.location.reload();
    setError(false);
    setMessage("選択中のプランがありません");
  };

  const handleChange = (e: any) => {
    if (val.includes(e.target.value)) {
      setVal(val.filter((item) => item !== e.target.value));
    } else {
      setVal([...val, e.target.value]);
    }
  };

  const onChangeContact = (e: any) => {
    setContact(e.target.value);
  };

  const valueChange = (e: any) => {
    setRadioVal(e.target.value);
  };

  const selectValueChange = (e: any) => {
    setSelectVal(e.target.value);
  };

  const accordionClick = () => {
    if (click === false) {
      setClick(true);
    } else {
      setClick(false);
    }
  };

  let dt = new Date();
  let y = dt.getFullYear();
  let m = ("00" + (dt.getMonth() + 1)).slice(-2);
  let d = ("00" + dt.getDate()).slice(-2);
  let todayDate = y + "-" + m + "-" + d;

  const clickReservate = async () => {
    //必須項目の入力確認
    if (
      !reserveFirstNameValue ||
      !reserveLastNameValue ||
      !telValue ||
      !mailValue ||
      !radioVal ||
      !arrivalTime
    ) {
      setConfirmMessage("block");
    } else {
      const newCityRef = doc(collection(db, "reserved"));
      const data = {
        reserveFirstName: reserveFirstNameValue,
        reserveLastName: reserveLastNameValue,
        lodgeFirstName: lodgeFirstNameValue,
        lodgeLastName: lodgeLastNameValue,
        tel: telValue,
        mail: mailValue,
        contact: contact,
        payment: radioVal,
        adultsNum: reserveData.adultsNum,
        childrenNum: reserveData.childrenNum,
        roomType: reserveData.roomType,
        // plan: reserveData.plan,
        checkIn: reserveData.checkIn,
        // checkOut: reserveItem[0].checkOut,
        reservationDate: todayDate,
        price: reserveData.price,
        arrivalTime: arrivalTime,
        lodgeNum: reserveData.totalDate,
      };
      await setDoc(newCityRef, data);
      navigate("/books/ReservateComplete");
    }
  };
console.log("f",reserveData);

//ログインしていたら表示、していなかったら404
  return (
    <div>
      {/* {userEmail ? (
        <> */}
      <div className={ReservateConfirmContentsStyles.information}>
        <div className={ReservateConfirmContentsStyles.personInformation}>
          <div className={ReservateConfirmContentsStyles.subscriber}>
            <h3 className={ReservateConfirmContentsStyles.innertitle}>
              予約者情報
            </h3>
            <NameInput
              lastNameValue={reserveLastNameValue}
              SetLastNameValue={SetReserveLastNameValue}
              firstNameValue={reserveFirstNameValue}
              SetFirstNameValue={SetReserveFirstNameValue}
              firstNameErrorState={reserveFirstNameErrorState}
              SetFirstNameErrorState={SetReserveFirstNameErrorState}
              lastNameErrorState={reserveLastNameErrorState}
              SetLastNameErrorState={SetReserveLastNameErrorState}
              errorFlag={errorFlag}
            />
            <TelInput
              telValue={telValue}
              SetTelValue={SetTelValue}
              telErrorState={telErrorState}
              SetTelErrorState={SetTelErrorState}
              errorFlag={errorFlag}
            />
            <MailInput
              mailValue={mailValue}
              SetMailValue={SetMailValue}
              mailErrorState={mailErrorState}
              SetMailErrorState={SetMailErrorState}
              errorFlag={errorFlag}
              displayFlag={true}
            />
          </div>
          <div className={ReservateConfirmContentsStyles.lodger}>
            <h3 className={ReservateConfirmContentsStyles.innertitle}>
              宿泊者情報
            </h3>
            <div>
              <div className={ReservateConfirmContentsStyles.lodgerName}>
                <p>宿泊者代表</p>
                <input
                  type="checkbox"
                  id="lodger"
                  onChange={handleChange}
                  checked={val.includes("check")}
                  value="check"
                  className={ReservateConfirmContentsStyles.input}
                />
                <label htmlFor="lodger">
                  上記予約者と同じ
                  <br />
                  代表者が異なる場合はチェックを外し、情報を入力してください。
                </label>
              </div>
              {val.length > 0 ? (
                ""
              ) : (
                <NameInput
                  lastNameValue={lodgeLastNameValue}
                  SetLastNameValue={SetLodgeLastNameValue}
                  firstNameValue={lodgeFirstNameValue}
                  SetFirstNameValue={SetLodgeFirstNameValue}
                  firstNameErrorState={lodgeFirstNameErrorState}
                  SetFirstNameErrorState={SetLodgeFirstNameErrorState}
                  lastNameErrorState={lodgeLastNameErrorState}
                  SetLastNameErrorState={SetLodgeLastNameErrorState}
                  errorFlag={errorFlag}
                  markNone="ok"
                />
              )}
            </div>
            <div className={ReservateConfirmContentsStyles.lodgerContents}>
              <Content
                contact={contact}
                onChangeContact={onChangeContact}
                selectValueChange={selectValueChange}
                selectItem={selectItem}
                selectVal={selectVal}
                setSelectVal={setSelectVal}
                click={click}
                setClick={setClick}
                accordionClick={accordionClick}
                ArrivalTime={ArrivalTime}
              />
            </div>
          </div>
        </div>
        <div className={ReservateConfirmContentsStyles.reservateplan}>
          <div className={ReservateConfirmContentsStyles.reservePlanContents}>
            <h3 className={ReservateConfirmContentsStyles.innertitle}>
              予約プラン確認
            </h3>
            <div>
              <ul>
                <li>
                  <span>宿泊プラン</span>
                  {reserveData.plan}
                </li>
                <li>
                  <span>客室</span>
                  {reserveData.roomType}
                </li>
                <li>
                  <span>チェックイン日</span>
                  {reserveData.checkIn}
                </li>
                <li>
                  <span>宿泊数</span>
                  {reserveData.totalDate}泊
                </li>
                {(function () {
                  let peopleNumber =
                    reserveData.adultsNum + reserveData.childrenNum;
                  return (
                    <li>
                      <span>予約人数</span>
                      {peopleNumber}
                      名（内訳：大人{reserveData.adultsNum}名、子ども
                      {reserveData.childrenNum}名）
                    </li>
                  );
                })()}
                    <div className={ReservateConfirmContentsStyles.totalPrice}>
                      <li>
                        <span>宿泊金額</span>
                        {reserveData.price}円（税込）
                      </li>
                    </div>
              </ul>
            </div>
            {/* {<p className={ReservateConfirmContentsStyles.deleteMessage}>{message}</p>} */}
            <Link to="/rooms/Gestroom">戻る</Link>
          </div>
        </div>
      </div>

      <div className={ReservateConfirmContentsStyles.payment}>
        <h3 className={ReservateConfirmContentsStyles.innertitle}>
          お支払い方法<span>必須</span>
        </h3>
        <div className={ReservateConfirmContentsStyles.paymentRadioBtn}>
          {radioItem.map((radioItems) => (
            <React.Fragment key={radioItems.title}>
              <input
                type="radio"
                id={radioItems.id}
                name="payment"
                value={radioItems.value}
                onChange={valueChange}
              />
              <label htmlFor={radioItems.id}>{radioItems.title}</label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className={ReservateConfirmContentsStyles.reservateButton}>
        <button onClick={clickReservate}>予約する</button>
      </div>
      <div className={ReservateConfirmContentsStyles.reservateMessage}>
        <p style={{ display: confirmMessage }}>
          <FiAlertTriangle />
          必須項目を入力してください
        </p>
      </div>
      {/* </>
      ) : (<NotFound />)} */}
    </div>
  )
};

export const Content = (props: any) => {
  const {
    contact,
    onChangeContact,
    selectValueChange,
    selectItem,
    selectVal,
    setSelectVal,
    click,
    accordionClick,
    ArrivalTime,
  } = props;

  let result = 0;
  for (let i = 9; i <= 22; i++) {
    result += i;
  }
  return (
    <>
      <div className={ReservateConfirmContentsStyles.accordionContents}>
        <ArrivalTime
          selectValueChange={selectValueChange}
          selectItem={selectItem}
          selectVal={selectVal}
          setSelectVal={setSelectVal}
        />
        <div>
          <p>お問い合わせ・ご要望</p>
          <textarea
            value={contact}
            onChange={onChangeContact}
            placeholder="ここにお問合せやご要望をご入力ください"
            className={ReservateConfirmContentsStyles.input}
          ></textarea>
        </div>
        <div>
          <ul className={ReservateConfirmContentsStyles.accordionMenu}>
            <li>
              <button type="button" onClick={accordionClick}>
                キャンセルポリシー
              </button>
              {click ? <div>{cancel}</div> : ""}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

// export const ArrivalTime = (props: any) => {
//   const { selectValueChange, selectItem, selectVal, setSelectVal } = props;

//   return (
//     <>
//       <div className={ReservateConfirmContentsStyles.checkTime}>
//         <label
//           htmlFor="arrivalTime"
//           className={ReservateConfirmContentsStyles.arrivalText}
//         >
//           到着時間
//         </label>
//         <span>必須</span>
//         <select
//           value={selectVal}
//           onChange={selectValueChange}
//           className={ReservateConfirmContentsStyles.input}
//         >
//           {selectItem.map((selects: any) => {
//             return <option value={selects}>{selects}</option>;
//           })}
//         </select>
//         時
//       </div>
//     </>
//   );
// };

export const ClickCancelPolicy = (accordionClick: any, click: any) => {
  return (
    <div>
      <ul className={ReservateConfirmContentsStyles.accordionMenu}>
        <li>
          <button type="button" onClick={accordionClick}>
            キャンセルポリシー
          </button>
          {click ? <div>{cancel}</div> : ""}
        </li>
      </ul>
    </div>
  );
};

const cancel = (
  <div className={ReservateConfirmContentsStyles.cancel}>
    <p>
      ご予約完了後のキャンセルは、下記のポリシーに従って
      <br />
      キャンセル料がかかる場合がございます。
    </p>
    <ul className={ReservateConfirmContentsStyles.cancellist}>
      <li>当日：宿泊料金の<span>80%</span></li>
      <li>1日前：宿泊料金の<span>20%</span></li>
      <li> 連絡なしキャンセル：宿泊料金の<span>100%</span></li>
    </ul>
  </div>
);

const newCityRef = doc(collection(db, "reserved"));

export { cancel, newCityRef };

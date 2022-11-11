import React, { useEffect, useState } from "react";
import ReservateConfirmContentsStyles from "../../styles/books/ReservateConfirmContents.module.scss";
import { useNavigate } from "react-router-dom";
import db from "../../Firebase.js";
import { collection, doc, setDoc, getDocs, addDoc } from "firebase/firestore";
// import PrimaryButton from "./PrimaryButton";

export const ReservateConfirmContents = () => {

　const radioItem = [
  {
    id: "localpay",
    title: "現地にて精算",
    value: "cash"
  },
  {
    id: "creditpay",
    title: "クレジット精算",
    value: "credit"
  }
]

  const navigate = useNavigate();
  const [val, setVal] = useState(["check"]);
  const [radioVal,setRadioVal] = useState("cash");
  const [selectItem, setSelectItem] = useState();
  //(firebase)データベースを格納するための箱
  const [reserves, setReserves] = useState<any>([]);

  const [reserveFirstName, setReserveFirstName] = useState<any>("");
  const [reserveLastName, setReserveLastName] = useState<any>("");
  const [lodgeFirstName, setLodgeFirstName] = useState<any>("");
  const [lodgeLastName, setLodgeLastName] = useState<any>("");
  const [tel, setTel] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [totalPrice,setTotalPrice] = useState("");
  const [select,setSelect] = useState();
  
  //firebaseから予約データ取得、予約確定時にfirebaseへ送信するためのデータ
  const roomType = reserves.map((reserveItems:any) => reserveItems.roomType)
  const adultsNum = reserves.map((reserveItems:any) => reserveItems.adultsNum)
  const childernNum = reserves.map((reserveItems:any) => reserveItems.childrenNum)

  const onChangeContact = (e: any) => {
    setContact(e.target.value);
  };

  const onChangeLodgeFirstName = (e: any) => {
    setLodgeFirstName(e.target.value);
  };

  const onChangeLodgeLastName = (e: any) => {
    setLodgeLastName(e.target.value);
  };

  useEffect(() => {
    //データベースからデータを取得する
    const reserveData = collection(db, "reserve");
    getDocs(reserveData).then((reserveItem) => {
      setReserves(reserveItem.docs.map((doc) => ({ ...doc.data() })));
      // console.log(reserveItem);
      // reserves.map((reserveItems:any) => reserveItems);
    });
  }, []);

  const handleChange = (e: any) => {
    if (val.includes(e.target.value)) {
      setVal(val.filter((item) => item !== e.target.value));
    } else {
      setVal([...val, e.target.value]);
    }
  };

  const valueChange = (e:any) => {
    setRadioVal(e.target.value);
  }

  const selectValueChange = (e:any) => {
    setSelectItem(e.target.velue)
  }

  const clickReservate = async () => {
    await addDoc(collection(db, "reserved"), {
      //ログイン情報も送る？
      reserveFirstName: reserveFirstName,
      reserveLastName: reserveLastName,
      lodgeFirstName: lodgeFirstName,
      lodgeLastName: lodgeLastName,
      tel: tel,
      mail: mail,
      contact: contact,
      roomType: roomType,
      adultsNum: adultsNum,
      childernNum: childernNum,
      payment: radioVal
    });
    navigate("/books/ReservateComplete");
  };

  return (
    <div>
      <div className={ReservateConfirmContentsStyles.information}>
        <div className={ReservateConfirmContentsStyles.personInformation}>
          <div className={ReservateConfirmContentsStyles.subscriber}>
            {/* ログイン済みの場合、ログイン情報から自動入力 */}
            <h3>予約者情報</h3>
            <p>氏名</p>
            <div>
              <input
                type="text"
                value={reserveFirstName}
                onChange={(e) => setReserveFirstName(e.target.value)}
                placeholder="姓"
                className={ReservateConfirmContentsStyles.input}
              />
              <input
                type="text"
                value={reserveLastName}
                onChange={(e) => setReserveLastName(e.target.value)}
                placeholder="名"
                className={ReservateConfirmContentsStyles.input}
              />
              <br />
              <input
                type="text"
                placeholder="姓(フリガナ)"
                className={ReservateConfirmContentsStyles.input}
              />
              <input
                type="text"
                placeholder="名(フリガナ)"
                className={ReservateConfirmContentsStyles.input}
              />
            </div>
            {/* <LodgerName
              reserveFirstName={reserveFirstName}
              onChangeReserveFirstName={onChangeReserveFirstName}
              reserveLastName={reserveLastName}
              onChangeReserveLastName={onChangeReserveLastName}
            /> */}
            <p>電話番号</p>
            <input
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              placeholder="電話番号"
              className={ReservateConfirmContentsStyles.input}
            />
            <p>メールアドレス</p>
            <input
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="メールアドレス"
              className={ReservateConfirmContentsStyles.input}
            />
          </div>
          <div className={ReservateConfirmContentsStyles.lodger}>
            <h3>宿泊者情報</h3>
            <div>
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
              {val.length > 0 ? (
                ""
              ) : (
                <LodgerName
                  lodgeFirstName={lodgeFirstName}
                  lodgeLastName={lodgeLastName}
                  onChangeFirst={onChangeLodgeFirstName}
                  onChangeLast={onChangeLodgeLastName}
                />
              )}
            </div>
            <div>
              <Content contact={contact} onChangeContact={onChangeContact} />
            </div>
          </div>
        </div>
        <div className={ReservateConfirmContentsStyles.reservateplan}>
          <h3>予約プラン確認</h3>
          <ul>
            {reserves.map((reserve: any) => (
              <React.Fragment key={reserve.adultsNum}>
                <li>客室：{reserve.roomType}</li>
                <li>宿泊プラン：{reserve.plan}</li>
                <li>日程：</li>
                {(function () {
                  let peopleNumber = reserve.adultsNum + reserve.childrenNum;
                  return (
                    <li>
                      予約人数：{peopleNumber}
                      名（内訳：大人{reserve.adultsNum}名、子ども
                      {reserve.childrenNum}名）
                    </li>
                  );
                })()}
                {(function () {
                  let totalPrice = reserve.price * 1.1;
                  return <li>宿泊金額：{totalPrice}円（税込）</li>;
                })()}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
      <div className={ReservateConfirmContentsStyles.payment}>
        <p>
          お支払い方法<span>※必須</span>
        </p>
        {radioItem.map((radioItems) => (
          <React.Fragment key={radioItems.title}>
        <input type="radio" id={radioItems.id} name="payment" value={radioItems.value} onChange={valueChange} />
        <label htmlFor={radioItems.id}>{radioItems.title}</label>
        {/* <input type="radio" id="creditpay" name="payment" value={radioItems.value}/>
        <label htmlFor="creditpay">{radioItems.title}</label> */}
        </React.Fragment>
        ))}
      </div>
      <div className={ReservateConfirmContentsStyles.reservateButton}>
        <button onClick={clickReservate}>予約する</button>
      </div>
    </div>
  );
};

export const Content = (props: any) => {
  const { contact, onChangeContact } = props;

  const [click, setClick] = useState(false);

  const accordionClick = () => {
    if (click === false) {
      setClick(true);
    } else {
      setClick(false);
    }
  };

  let result = 0;
  for (let i = 9; i <= 22; i++) {
    result += i;
  }
  return (
    <>
      <div className={ReservateConfirmContentsStyles.accordionContents}>
        <ArrivalTime />
        {/* <div className="check-time">
          <label htmlFor="arrivalTime">到着時間：</label>
          {(function () {
            const list = [];
            for (let i = 9; i <= 22; i++) {
              list.push(<option>{i}</option>);
            }
            return (
              <select id="arrivalTime">
                <option>---</option>
                {list}
              </select>
            );
          })()}
          時
        </div> */}
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

export const LodgerName = (props:any) => {

  const {lodgeFirstName,lodgeLastName,onChangeFirst,onChangeLast} = props;

  return (
    <>
      <br />
      <input
        type="text"
        value={lodgeFirstName}
        onChange={onChangeFirst}
        placeholder="姓"
        className={ReservateConfirmContentsStyles.input}
      />
      <input
        type="text"
        value={lodgeLastName}
        onChange={onChangeLast}
        placeholder="名"
        className={ReservateConfirmContentsStyles.input}
      />
      <br />
      <input
        type="text"
        placeholder="姓(フリガナ)"
        className={ReservateConfirmContentsStyles.input}
      />
      <input
        type="text"
        placeholder="名(フリガナ)"
        className={ReservateConfirmContentsStyles.input}
      />
    </>
  );
};

export const ArrivalTime = ({selectValueChange}:any) => {
  return (
    <div className={ReservateConfirmContentsStyles.checkTime}>
      <label htmlFor="arrivalTime">到着時間：</label>
      {(function () {
        const list = [];
        for (let i = 9; i <= 22; i++) {
          list.push(<option>{i}</option>);
        }
        return (
          <select
            id="arrivalTime"
            onChange={selectValueChange}
            className={ReservateConfirmContentsStyles.input}
          >
            <option>---</option>
            {list}
          </select>
        );
      })()}
      時
    </div>
  );
};

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
      ご予約完了後のキャンセルは、下記のポリシーに従ってキャンセル料がかかる場合がございます。
    </p>
    <ul className={ReservateConfirmContentsStyles.cancellist}>
      <li>当日：宿泊料金の80%</li>
      <li>1日前：宿泊料金の20%</li>
      <li> 連絡なしキャンセル：宿泊料金の100%</li>
    </ul>
  </div>
);

export { cancel };

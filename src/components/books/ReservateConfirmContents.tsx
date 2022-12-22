/* eslint-disable valid-typeof */
import React, { useState, ChangeEvent } from "react";
import ReservateConfirmContentsStyles from "../../styles/books/_ReservateConfirmContents.module.scss";
import { useNavigate } from "react-router-dom";
import db from "../../Firebase.js";
import { collection, doc, setDoc } from "firebase/firestore";
import { NameInput } from "../Organisms/form/nameInput";
import { TelInput } from "../Organisms/form/telInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase";
import { MailInput } from "../Organisms/form/mailInput";
import { FiAlertTriangle } from "react-icons/fi";
import { ArrivalTime } from "./ArrivalTime";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import { contactInput, select } from "../../store/ReservateConfirmSlice";
import PrimaryButton from "../Atoms/button/PrimaryButton";

export const ReservateConfirmContents: React.FC = () => {
  const selectItem = ["--", 15, 16, 17, 18, 19, 20, 21, 22];

  //redux
  const contactInput = useSelector((state: any) => state.inputValue.contact);
  const paymentItem = useSelector((state: any) => state.inputValue.paymentItem);
  const payment = useSelector((state: any) => state.inputValue.payment);
  const reserveFirstName = useSelector(
    (state: any) => state.registerInput.firstName
  );
  const reserveLastName = useSelector(
    (state: any) => state.registerInput.lastName
  );
  const telValue = useSelector((state: any) => state.registerInput.tel);
  const mailValue = useSelector((state: any) => state.registerInput.mail);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [val, setVal] = useState<string[]>(["check"]);
  const [click, setClick] = useState<boolean>(false);

  //ログインしているユーザーのメールアドレス
  const [user] = useAuthState(auth);
  let userEmail = user?.email;
  if (user) {
    // console.log(user.email);
  }

  //入力フォームの値
  const [reserveFirstNameErrorState, SetReserveFirstNameErrorState] =
    useState<string>("init");
  const [reserveLastNameErrorState, SetReserveLastNameErrorState] =
    useState<string>("init");
  const [lodgeFirstName, SetLodgeFirstName] = useState("");
  const [lodgeFirstNameErrorState, SetLodgeFirstNameErrorState] =
    useState<string>("init");
  const [lodgeLastName, SetLodgeLastName] = useState("");
  const [lodgeLastNameErrorState, SetLodgeLastNameErrorState] =
    useState<string>("init");
  const [telErrorState, SetTelErrorState] = useState<string>("init");
  const [mailErrorState, SetMailErrorState] = useState<string>("init");
  const [selectVal, setSelectVal] = useState<string>("--");
  const [errorFlag, SetErrorFlag] = useState<string>("false");

  const [confirmMessage, setConfirmMessage] = useState<string>("none");
  const [openModal, setOpenModal] = useState<boolean>(false);

  //Arrival inputに入力された数字の型を数値に変換
  const arrivalTime = parseInt(selectVal);

  // 予約データ受け取り
  const location = useLocation();
  const reserveData = location.state;

  const noPlan = "プランなし";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (val.includes(e.target.value)) {
      setVal(val.filter((item) => item !== e.target.value));
    } else {
      setVal([...val, e.target.value]);
    }
  };

  const selectValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectVal(e.target.value);
  };

  const accordionClick = () => {
    if (click === false) {
      setClick(true);
    } else {
      setClick(false);
    }
  };

  const clickModal = () => {
    setOpenModal(true);
  };

  //現在日付を文字列に変換
  let dt = new Date();
  let y = dt.getFullYear();
  let m = ("00" + (dt.getMonth() + 1)).slice(-2);
  let d = ("00" + dt.getDate()).slice(-2);
  let todayDate = y + "-" + m + "-" + d;

  const clickReservate = async () => {
    //必須項目の入力確認
    if (
      !reserveFirstName ||
      !reserveLastName ||
      !telValue ||
      !mailValue ||
      !payment ||
      !arrivalTime
    ) {
      setConfirmMessage("block");
    } else {
      const newCityRef = doc(collection(db, "reserved"));
      const data = {
        reserveFirstName: reserveFirstName,
        reserveLastName: reserveLastName,
        lodgeFirstName: lodgeFirstName,
        lodgeLastName: lodgeLastName,
        tel: telValue,
        mail: mailValue,
        contact: contactInput,
        payment: payment,
        adultsNum: reserveData.adultsNum,
        childrenNum: reserveData.childrenNum,
        roomType: reserveData.roomType,
        plan: reserveData.plan || noPlan,
        checkIn: reserveData.checkIn,
        reservationDate: todayDate,
        price: reserveData.price,
        arrivalTime: arrivalTime,
        lodgeNum: reserveData.totalDate,
        loginMail: userEmail,
      };
      await setDoc(newCityRef, data);
      navigate("/books/ReservateComplete");
    }
  };
  console.log(lodgeFirstName);
  console.log(lodgeLastName);

  return (
    <div>
      <div className={ReservateConfirmContentsStyles.information}>
        <div className={ReservateConfirmContentsStyles.personInformation}>
          <div className={ReservateConfirmContentsStyles.subscriber}>
            <h3 className={ReservateConfirmContentsStyles.innertitle}>
              予約者情報
            </h3>
            <div className={ReservateConfirmContentsStyles.subscriberInfo}>
              <NameInput
                firstNameErrorState={reserveFirstNameErrorState}
                SetFirstNameErrorState={SetReserveFirstNameErrorState}
                lastNameErrorState={reserveLastNameErrorState}
                SetLastNameErrorState={SetReserveLastNameErrorState}
                errorFlag={errorFlag}
              />
              <TelInput
                telErrorState={telErrorState}
                SetTelErrorState={SetTelErrorState}
                errorFlag={errorFlag}
              />
              <MailInput
                mailErrorState={mailErrorState}
                SetMailErrorState={SetMailErrorState}
                errorFlag={errorFlag}
                displayFlag={true}
              />
            </div>
          </div>
          <div className={ReservateConfirmContentsStyles.lodger}>
            <h3 className={ReservateConfirmContentsStyles.innertitle}>
              宿泊者情報
            </h3>
            <div className={ReservateConfirmContentsStyles.lodgerInfo}>
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
                  lodgeName="ok"
                  SetLodgeLastName={SetLodgeLastName}
                  SetLodgeFirstName={SetLodgeFirstName}
                  firstNameErrorState={lodgeFirstNameErrorState}
                  SetFirstNameErrorState={SetLodgeFirstNameErrorState}
                  lastNameErrorState={lodgeLastNameErrorState}
                  SetLastNameErrorState={SetLodgeLastNameErrorState}
                  errorFlag={errorFlag}
                  markNone="ok"
                />
              )}
              <div className={ReservateConfirmContentsStyles.lodgerContents}>
                <Content
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
                  {reserveData.plan ? (
                    <p>{reserveData.plan}</p>
                  ) : (
                    <p>{noPlan}</p>
                  )}
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
                      名（内訳：大人{reserveData.adultsNum}名、子供
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
            <button
              onClick={clickModal}
              className={ReservateConfirmContentsStyles.backBtn}
            >
              戻る
            </button>
            {openModal ? (
              <DeleteModal setOpenModal={setOpenModal} openModal={openModal} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {/* <div className={ReservateConfirmContentsStyles.paymentAll}> */}
        <div className={ReservateConfirmContentsStyles.payment}>
          <h3 className={ReservateConfirmContentsStyles.innertitle}>
            お支払い方法
          </h3>
          <div className={ReservateConfirmContentsStyles.paymentContents}>
            <span>必須</span>
            <div className={ReservateConfirmContentsStyles.paymentRadioBtn}>
              {paymentItem.map((radioItems: any) => (
                <React.Fragment key={radioItems.title}>
                  <input
                    type="radio"
                    id={radioItems.id}
                    name="payment"
                    value={radioItems.value}
                    onChange={(e: any) => dispatch(select(e.target.value))}
                  />
                  <label htmlFor={radioItems.id}>{radioItems.title}</label>
                </React.Fragment>
              ))}
            </div>
          {/* </div> */}
        </div>
      </div>
      <div className={ReservateConfirmContentsStyles.reservateButton}>
        <PrimaryButton onClick={clickReservate} id="submit">
          予約する
        </PrimaryButton>
      </div>
      <div className={ReservateConfirmContentsStyles.reservateMessage}>
        <p style={{ display: confirmMessage }}>
          <FiAlertTriangle />
          必須項目を入力してください
        </p>
      </div>
    </div>
  );
};

export const Content = (props: any) => {
  const {
    selectValueChange,
    selectItem,
    selectVal,
    setSelectVal,
    click,
    accordionClick,
    ArrivalTime,
  } = props;

  const dispatch = useDispatch();

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
            onChange={(e: any) => dispatch(contactInput(e.target.value))}
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

const cancel = (
  <div className={ReservateConfirmContentsStyles.cancel}>
    <p>
      ご予約完了後のキャンセルは、下記のポリシーに従って
      <br />
      キャンセル料がかかる場合がございます。
    </p>
    <ul className={ReservateConfirmContentsStyles.cancellist}>
      <li>
        当日：宿泊料金の<span>80%</span>
      </li>
      <li>
        1日前：宿泊料金の<span>20%</span>
      </li>
      <li>
        {" "}
        連絡なしキャンセル：宿泊料金の<span>100%</span>
      </li>
    </ul>
  </div>
);

const newCityRef = doc(collection(db, "reserved"));

export { cancel, newCityRef };

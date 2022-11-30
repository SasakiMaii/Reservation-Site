/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from "react";
import ReservateHistoryStyles from "../../styles/books/_ReservateHistory.module.scss";
import { cancel } from "../../components/books/ReservateConfirmContents";
import { ArrivalTime } from "../../components/books/ArrivalTime";
import db from "../../Firebase";
import { auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { FiAlertTriangle } from "react-icons/fi";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
import useSWR, { useSWRConfig } from "swr";

const ReservateHistory = () => {
  //(firebase)データベースを格納
  const [reserves, setReserves] = useState<any>([]);

  //入力フォームの値
  const [lodgeFirstName, setLodgeFirstName] = useState("");
  const [lodgeLastName, setLodgeLastName] = useState("");
  const [adultsNum, setAdultsNum] = useState("0");
  const [childrenNum, setChildrenNum] = useState("0");
  const [lodgeNum, setLodgeNum] = useState("0");
  const [price, setPrice] = useState(0);
  const [checkIn, setCheckIn] = useState("0");

  //コンポーネント表示切り替え
  const [openUnlodgeDisplay, setOpenUnlodgeDisplay] = useState(false);
  const [hideUnlodgeMessage, setHideUnlodgeMessage] = useState("block");
  const [openLodgedDisplay, setOpenLodgedDisplay] = useState(false);
  const [hideLodgedMessage, setHideLodgedMessage] = useState("block");

  const [change, setChange] = useState(false);
  const [click, setClick] = useState(false);
  const [clickCancel, setOnCancelClick] = useState(false);
  const [clickReservateDetails, setClickReservateDetails] = useState(false);
  const [clickUnReservateDetails, setClickUnReservateDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState("none");

  //ログインしているユーザーのIDが入る
  const [docID, setDocID] = useState<any>({});
  const docIDstate = useRef<any>([]);

  //inputに入力された数字の型を数値に変換（変換前は文字列）
  const adultsNums = parseInt(adultsNum);
  const childrenNums = parseInt(childrenNum);
  const lodgeNums = parseInt(lodgeNum);

  let totalPeople = adultsNums + childrenNums;
  let changeAfter = totalPeople * price * lodgeNums;

  let dt = new Date();
  let y = dt.getFullYear();
  let m = ("00" + (dt.getMonth() + 1)).slice(-2);
  let d = ("00" + dt.getDate()).slice(-2);
  let todayDate = y + "-" + m + "-" + d;

  const checkIns = Date.parse(checkIn);
  let a = checkIn.slice(8, 10);
  const dateNum = Date.parse(todayDate);
  const x = "2023-01-01";
  const p = Date.parse(x);

  //firebaseからログインユーザーの情報を取得
  const [user] = useAuthState(auth);
  let userEmail = user?.email;
  if (user) {
    // console.log(user.email);
  }

  const ClickCancelPolicy = () => {
    if (click === false) {
      setClick(true);
    } else {
      setClick(false);
    }
  };

  const onClickCancel = () => {
    if (clickCancel === false) {
      setOnCancelClick(true);
    } else {
      setOnCancelClick(false);
    }
  };

  const onChangeAdults = (e: any) => {
    setAdultsNum(e.target.value);
  };

  const onChangeChildren = (e: any) => [setChildrenNum(e.target.value)];

  const onChangeFirst = (e: any) => {
    setLodgeFirstName(e.target.value);
  };

  const onChangeLast = (e: any) => {
    setLodgeLastName(e.target.value);
  };

  const clickChange = () => {
    if (clickUnReservateDetails === false) {
      setClickUnReservateDetails(true);
    } else {
      setClickUnReservateDetails(false);
    }
  };

  const clickDetails = () => {
    if (clickReservateDetails === false) {
      setClickReservateDetails(true);
    } else {
      setClickReservateDetails(false);
    }
  };
  const listDocID: any = [];
  const clickUnlodgeOpen = async () => {
    setOpenUnlodgeDisplay(true);
    setHideUnlodgeMessage("none");

    //firebaseから、ログインしているユーザーメールアドレスと一致する予約データを取得する
    const reserveData = query(
      collection(db, "reserved"),
      where("mail", "==", userEmail)
    );
    getDocs(reserveData).then((reserveItem) => {
      setReserves(reserveItem.docs.map((doc) => ({ ...doc.data() })));
    });

    //docID取得
    const documentFetch = async () => {
      // const unReserveItems = unReserve.map((unReserveItem:any) => unReserveItem[0].checkIn)
      const loginReserve = query(
        collection(db, "reserved"),
        where("mail", "==", userEmail)
        // where("mail", "==", userEmail),where("checkIn","==",unReserveItems)
      );
      const querySnapshot = await getDocs(loginReserve);
      console.log("s", querySnapshot);
      querySnapshot.forEach((doc: any) => {
        const docData = doc.data();
        console.log("dS", docData);

        listDocID.push(docData.id);
        docData.id = doc.id;
        console.log(doc.id, "=>", doc.data());
        docIDstate.current.push(doc.id);
      });
    };
    documentFetch();
  };
  console.log(reserves);
  console.log("a", docIDstate.current);

  // checkOutの日付が過去か未来か判別
  // eslint-disable-next-line array-callback-return
  const unReserve: any = [];
  const reserved: any = [];
  // eslint-disable-next-line array-callback-return
  reserves.map((reserveItems: any) => {
    const abc = Date.parse(reserveItems.checkOut);
    if (abc > dateNum) {
      unReserve.push(reserveItems);
    } else {
      reserved.push(reserveItems);
    }
  });
  const unReserveItem = unReserve.map((reserveItems: any) => reserveItems);
  // console.log(unReserve);
  // console.log(reserved);
  // unReserve.forEach((element:any) => {
  //   const checkOutDays = element.checkOut;
  //   console.log(checkOutDays)
  // });

  const clickLodgedOpen = async () => {
    setOpenLodgedDisplay(true);
    // setOpenContents(true);
    setHideLodgedMessage("none");

    //firebaseから、ログインしているユーザーメールアドレスと一致する予約データを取得する
    const reserveData = query(
      collection(db, "reserved"),
      where("mail", "==", userEmail)
    );
    getDocs(reserveData).then((reserveItem) => {
      setReserves(reserveItem.docs.map((doc) => ({ ...doc.data() })));
    });

    const documentFetch = async () => {
      const q = query(
        collection(db, "reserved"),
        where("mail", "==", userEmail)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc: any) => {
        const docData = doc.data();
      });
    };
    documentFetch();
  };

  return (
    <>
      <Header />
      <div className={ReservateHistoryStyles.HistoryContainer}>
        <h1 className={ReservateHistoryStyles.HistoryTitle}>予約履歴確認</h1>
        <UnReserveTitle
          clickUnlodgeOpen={clickUnlodgeOpen}
          hideUnlodgeMessage={hideUnlodgeMessage}
        />
        {openUnlodgeDisplay ? (
          <UnReserve
            lodgeFirstName={lodgeFirstName}
            lodgeLastName={lodgeLastName}
            onChangeFirst={onChangeFirst}
            onChangeLast={onChangeLast}
            reserves={reserves}
            change={change}
            clickChange={clickChange}
            onClickCancel={onClickCancel}
            changeAfter={changeAfter}
            errorMessage={errorMessage}
            UnReservateDetails={UnReservateDetails}
            clickUnReservateDetails={clickUnReservateDetails}
            unReserve={unReserve}
          />
        ) : (
          ""
        )}
        <ReservedTitle
          clickLodgedOpen={clickLodgedOpen}
          hideLodgedMessage={hideLodgedMessage}
        />
        {openLodgedDisplay ? (
          <Reserved
            clickDetails={clickDetails}
            clickReservateDetails={clickReservateDetails}
            reserves={reserves}
            reserved={reserved}
          />
        ) : (
          ""
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReservateHistory;

export const UnReserveTitle = (props: any) => {
  const { clickUnlodgeOpen, hideUnlodgeMessage } = props;
  return (
    <div
      style={{ display: hideUnlodgeMessage }}
      className={ReservateHistoryStyles.unReserveTitle}
    >
      <h1>宿泊待ち予約</h1>
      <button onClick={clickUnlodgeOpen}>
        確認する
      </button>
    </div>
  );
};

export const UnReserve = (props: any) => {
  const {
    clickChange,
    unReserve,
    UnReservateDetails,
    clickUnReservateDetails,
  } = props;

  return (
    <div className={ReservateHistoryStyles.unLodger}>
      <h3 className={ReservateHistoryStyles.innerTitle}>宿泊待ち予約</h3>
      <div className={ReservateHistoryStyles.unLodgerContents}>
        <p className={ReservateHistoryStyles.subTitle}>予約内容</p>
      </div>
      <div className={ReservateHistoryStyles.unLodgerContentsList}>
        {unReserve.map((unReserveItem: any) => {
          return <p>{unReserveItem.plan}宿泊プラン名【】</p>;
        })}
        <button onClick={clickChange}>詳細を見る</button>
      </div>
      {clickUnReservateDetails ? (
        <UnReservateDetails
          unReserve={unReserve}
          className={ReservateHistoryStyles.unReservateDetails}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export const UnReservateDetails = ({ unReserve }: any) => {
  return (
    <div className={ReservateHistoryStyles.unReservateDetails}>
      <ul>
        {unReserve.map((reserveItem: any) => {
          return (
            <>
              <li>
                <span>予約完了日</span>{reserveItem.reservationDate}
              </li>
              <li>
                <span>宿泊プラン</span>{reserveItem.plan}
              </li>
              <li>
                <span>客室</span>{reserveItem.roomType}
              </li>
              <li>
                <span>チェックイン日</span>{reserveItem.checkIn}
              </li>
              <li>
                <span>宿泊数</span>{reserveItem.lodgeNum}泊
              </li>
              {(function () {
                let peopleNumber =
                  reserveItem.adultsNum + reserveItem.childrenNum;
                return (
                  <li>
                    <span>予約人数</span>{peopleNumber}
                    名（内訳：大人{reserveItem.adultsNum}名、子ども
                    {reserveItem.childrenNum}名）
                  </li>
                );
              })()}
              {/* {(function () {
                        let totalday = reserveItem.checkIn - reserveItem.checkOut;
                        console.log(reserveItem.checkIn);
                        console.log(totalday);
                        return <li>{totalday}</li>;
                      })()} */}
              {(function () {
                const reserveNumber =
                  reserveItem.adultsNum + reserveItem.childrenNum;
                let totalPrice = reserveItem.price * 1.1;
                let reserveTotalPrice =
                  reserveNumber * totalPrice * reserveItem.lodgeNum;
                return (
                  <div className={ReservateHistoryStyles.totalPrice}>
                    <li>
                      <span>宿泊金額</span>{reserveTotalPrice}円（税込）
                    </li>
                  </div>
                );
              })()}
            </>
          );
        })}
      </ul>
    </div>
  );
};

export const ReservedTitle = (props: any) => {
  const { clickLodgedOpen, hideLodgedMessage } = props;
  return (
    <div
      className={ReservateHistoryStyles.ReservedTitle}
      style={{ display: hideLodgedMessage }}
    >
      <h1>宿泊済み予約</h1>
      <button onClick={clickLodgedOpen}>
        確認する
      </button>
    </div>
  );
};

export const Reserved = (props: any) => {
  const { clickDetails, clickReservateDetails, reserved } = props;
  return (
    <div className={ReservateHistoryStyles.lodged}>
      <h3 className={ReservateHistoryStyles.innerTitle}>宿泊済み予約</h3>
      <div className={ReservateHistoryStyles.lodgedContents}>
        <p className={ReservateHistoryStyles.subTitle}>予約内容</p>
      </div>
      <div className={ReservateHistoryStyles.lodgedContentsList}>
        {reserved.map((reservedItem: any) => {
          return <p>{reservedItem.plan}宿泊プラン名【】</p>;
        })}
        <button onClick={clickDetails}>詳細を見る</button>
      </div>
      {clickReservateDetails && reserved ? (
        <ReservateDetails
          reserved={reserved}
          className={ReservateHistoryStyles.reservateDetails}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export const ReservateDetails = ({ reserved }: any) => {
  return (
    <div className={ReservateHistoryStyles.reservateDetails}>
      <ul>
        {reserved?.map((reservedItem: any) => {
          return (
            <>
              <li>
                <span>予約完了日</span>{reservedItem.reservationDate}
              </li>
              <li>
                <span>宿泊プラン</span>{reservedItem.plan}
              </li>
              <li>
                <span>客室</span>{reservedItem.roomType}
              </li>
              <li>
                <span>チェックイン日</span>{reservedItem.checkIn}
              </li>
              <li>
                <span>宿泊数</span>{reservedItem.lodgeNum}泊
              </li>
              {(function () {
                let peopleNumber =
                  reservedItem.adultsNum + reservedItem.childrenNum;
                return (
                  <li>
                    <span>予約人数</span>{peopleNumber}
                    名（内訳：大人{reservedItem.adultsNum}名、子ども
                    {reservedItem.childrenNum}名）
                  </li>
                );
              })()}
              {(function () {
                const reserveNumber =
                  reservedItem.adultsNum + reservedItem.childrenNum;
                let totalPrice = reservedItem.price * 1.1;
                let reserveTotalPrice =
                  reserveNumber * totalPrice * reservedItem.lodgeNum;
                return (
                  <div className={ReservateHistoryStyles.totalPrice}>
                    <li>
                      <span>宿泊金額</span>{reserveTotalPrice}円（税込）
                    </li>
                  </div>
                );
              })()}
            </>
          );
        })}
      </ul>
    </div>
  );
};

// export const LodgerName = (props: any) => {
//   const { lodgeFirstName, lodgeLastName, onChangeFirst, onChangeLast } = props;

//   return (
//     <>
//       <br />
//       <input
//         type="text"
//         value={lodgeFirstName}
//         onChange={onChangeFirst}
//         placeholder="例）田中"
//         className={ReservateHistoryStyles.input}
//       />
//       <input
//         type="text"
//         value={lodgeLastName}
//         onChange={onChangeLast}
//         placeholder="例）太郎"
//         className={ReservateHistoryStyles.input}
//       />
//     </>
//   );
// };

// export const ChangeAfter = (props: any) => {
//   const { changeAfter } = props;

//   return (
//     <>
//       <div>
//         <div className={ReservateHistoryStyles.changeAfter}>
//           変更後の金額：{changeAfter}円（税込）
//         </div>
//       </div>
//     </>
//   );
// };

/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
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

const ReservateHistoryCopy = () => {
  //(firebase)データベースを格納
  const [reserves, setReserves] = useState<any>([]);

  //firebaseから予約データ取得、予約確定時にfirebaseへ送信するためのデータ
  // const reserveItem = reserves.map((reserveItems: any) => reserveItems);
  // const reserveItem = unReserve.map((reserveItems:any) => reserveItems);

  //入力フォームの値
  const [lodgeFirstName, setLodgeFirstName] = useState("");
  const [lodgeLastName, setLodgeLastName] = useState("");
  const [adultsNum, setAdultsNum] = useState("0");
  const [childrenNum, setChildrenNum] = useState("0");
  const [lodgeNum, setLodgeNum] = useState("0");
  const [roomNum, setRoomNum] = useState(0);
  const [price, setPrice] = useState(0);
  const [checkIn, setCheckIn] = useState("0");
  const [checkOutDay, setCheckOutDay] = useState("");
  const [selectVal, setSelectVal] = useState("--");
  // const [arrivalTime,setArrivalTime] = useState("");

  //コンポーネント表示切り替え
  const [openUnlodgeDisplay, setOpenUnlodgeDisplay] = useState(false);
  const [hideUnlodgeMessage, setHideUnlodgeMessage] = useState("block");
  const [openLodgedDisplay, setOpenLodgedDisplay] = useState(false);
  const [hideLodgedMessage, setHideLodgedMessage] = useState("block");

  const [openContents, setOpenContents] = useState(false);

  const [change, setChange] = useState(false);
  const [click, setClick] = useState(false);
  const [clickCancel, setOnCancelClick] = useState(false);
  const [clickReservateDetails, setClickReservateDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState("none");
  const [numMessage, setNumMessage] = useState("none");

  //ログインしているユーザーのIDが入る
  const [unLodgedocID, setUnLodgeDocID] = useState<any>("");
  const [lodgeddocID, setLodgedDocID] = useState<any>("");
  const [docID, setDocID] = useState<any>({});

  //inputに入力された数字の型を数値に変換（変換前は文字列）
  const adultsNums = parseInt(adultsNum);
  const childrenNums = parseInt(childrenNum);
  const lodgeNums = parseInt(lodgeNum);

  let totalPeople = adultsNums + childrenNums;
  let changeAfter = totalPeople * price * lodgeNums;
  const selectItem = ["--", 15, 16, 17, 18, 19, 20, 21, 22];

  let dt = new Date();
  let y = dt.getFullYear();
  let m = ("00" + (dt.getMonth() + 1)).slice(-2);
  let d = ("00" + dt.getDate()).slice(-2);
  let todayDate = y + "-" + m + "-" + d;

  const { mutate } = useSWRConfig();
  const { data } = useSWR("/books/ReservateHistoryCopy", getDocs);
  console.log(data);

  // console.log(lodgeNums);
  const checkIns = Date.parse(checkIn);
  // console.log(checkIns);
  // console.log(checkIn);
  let a = checkIn.slice(8, 10);
  // console.log(a);
  // console.log(typeof todayDate)
  const dateNum = Date.parse(todayDate);
  //   console.log(dateNum);
  const x = "2023-01-01";
  const p = Date.parse(x);
  // console.log(p);

  //firebaseからログインユーザーの情報を取得
  const [user] = useAuthState(auth);
  let userEmail = user?.email;
  if (user) {
    // console.log(user.email);
  }
  console.log(docID);

  // //firebaseデータ更新（ドキュメントID指定して更新）
  const onClickReserveChange = async () => {
    if (
      !lodgeFirstName &&
      !lodgeLastName &&
      adultsNums === unReserveItem[0].adultsNum &&
      childrenNums === unReserveItem[0].childrenNum &&
      lodgeNum === unReserveItem[0].lodgeNum &&
      roomNum === unReserveItem[0].roomNum
      // arrivalTime === reserveItem[0].arrivalTime
    ) {
      setErrorMessage("block");
    } else if (adultsNums + childrenNums > 3) {
      setNumMessage("block");
    } else {
      const updateRef = doc(db, "reserved", docID);
      await updateDoc(updateRef, {
        lodgeFirstName: lodgeFirstName,
        lodgeLastName: lodgeLastName,
        adultsNum: adultsNums,
        childrenNum: childrenNums,
        lodgeNum: lodgeNums,
        totalPrice: changeAfter,
        // arrivalTime: arrivalTime
      });
      alert("変更しました");
      mutate("/books/ReservateHistoryCopy");
    }
  };
  console.log(docID);

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

  // const selectValueChange = (e: any) => {
  //   setSelectVal(e.target.value);
  // };

  const reservateChange = [
    {
      title: "宿泊者代表",
      contents: (
        <LodgerName
          lodgeFirstName={lodgeFirstName}
          lodgeLastName={lodgeLastName}
          onChangeFirst={onChangeFirst}
          onChangeLast={onChangeLast}
        />
      ),
    },
    {
      title: "宿泊人数",
      contents: (
        <>
          <p
            style={{ display: numMessage }}
            className={ReservateHistoryStyles.numMessage}
          >
            客室定員(3名)以上は選択できません
          </p>
          <div>
            大人&nbsp;&nbsp;
            <input
              type="number"
              value={adultsNum}
              onChange={onChangeAdults}
              min={0}
            />
            小人&nbsp;&nbsp;
            <input
              type="number"
              value={childrenNum}
              onChange={onChangeChildren}
              min={0}
            />
          </div>
        </>
      ),
    },
    // {
    //   title: "宿泊日数（減泊のみ）",
    //   contents: (
    //     <input
    //       type="number"
    //       min={1}
    //       value={lodgeNum}
    //       onChange={(e: any) => setLodgeNum(e.target.value)}
    //     />
    //   ),
    // },
    // {
    //   title: "",
    //   contents: <ArrivalTime selectValueChange={selectValueChange} selectItem={selectItem} selectVal={selectVal} value={arrivalTime}/>
    // },
    {
      title: (
        <button
          onClick={ClickCancelPolicy}
          className={ReservateHistoryStyles.cancelBtn}
        >
          キャンセルポリシー
        </button>
      ),
      contents: click ? (
        <div className={ReservateHistoryStyles.cancel}>
          {cancel}
          <span>
            キャンセルはお電話でのみ承ります。
            <br />
            TEL：03-0000-0000
          </span>
        </div>
      ) : (
        ""
      ),
    },
  ];

  const clickChange = () => {
    if (change === false) {
      setChange(true);
    } else {
      setChange(false);
    }
    setAdultsNum(unReserveItem[0].adultsNum);
    setChildrenNum(unReserveItem[0].childrenNum);
    setLodgeNum(unReserveItem[0].lodgeNum);
    setRoomNum(unReserveItem[0].roomNum);
    setPrice(unReserveItem[0].price);
    setCheckIn(unReserveItem[0].checkIn.toString());
    // setArrivalTime(reserveItem[0].arrivalTime)
  };

  const clickDetails = () => {
    if (clickReservateDetails === false) {
      setClickReservateDetails(true);
    } else {
      setClickReservateDetails(false);
    }
  };

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
      querySnapshot.forEach((doc: any) => {
        const docData = doc.data();
        docData.id = doc.id;
        console.log(doc.id, "=>", doc.data());
        setDocID(doc.id);
      });
    };
    documentFetch();
  };
  console.log(reserves);
  console.log("a", docID);

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
      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      // setReserves(doc.docs.map((doc:any) => ({ ...doc.data() })));
      // const docData = doc.data();
      // const listC = [];
      // listC.push(doc.data());
      // setReserves(listC);
      // });
    };
    documentFetch();
  };
  // console.log("f",lodgeddocID);

  return (
    <>
      <Header />
      <div className={ReservateHistoryStyles.historycontainer}>
        <h1 className={ReservateHistoryStyles.reservatehistoryTitle}>
          予約履歴確認
        </h1>
        <UnReserveTitle
          clickUnlodgeOpen={clickUnlodgeOpen}
          hideUnlodgeMessage={hideUnlodgeMessage}
        />
        {/* <div> */}
        {openUnlodgeDisplay ? (
          <UnReserve
            lodgeFirstName={lodgeFirstName}
            lodgeLastName={lodgeLastName}
            onChangeFirst={onChangeFirst}
            onChangeLast={onChangeLast}
            reserves={reserves}
            change={change}
            onClickReserveChange={onClickReserveChange}
            reservateChange={reservateChange}
            clickChange={clickChange}
            onClickCancel={onClickCancel}
            changeAfter={changeAfter}
            errorMessage={errorMessage}
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
        {/* {openContents ? <Contents reserves={reserves} /> : ""} */}
      </div>
      {/* <footer> */}
        <Footer />
      {/* </footer> */}
    </>
  );
};

export default ReservateHistoryCopy;

export const ChangeReservate = (props: any) => {
  const {
    reservateChange,
    onClickReserveChange,
    reserves,
    changeAfter,
    errorMessage,
  } = props;

  return (
    <div className={ReservateHistoryStyles.changeReservate}>
      <p className={ReservateHistoryStyles.subTitle}>変更可能項目</p>
      <ul>
        {reservateChange.map((change: any, index: number) => {
          return (
            <div key={index}>
              <li>
                <span>{change.title}</span>
                {change.contents}
              </li>
            </div>
          );
        })}
      </ul>
      <ChangeAfter reserves={reserves} changeAfter={changeAfter} />
      <button
        onClick={onClickReserveChange}
        className={ReservateHistoryStyles.changeReservateBtn}
      >
        予約内容を変更する
      </button>
      <p
        style={{ display: errorMessage }}
        className={ReservateHistoryStyles.changeReservateMessage}
      >
        <FiAlertTriangle />
        変更内容を入力してください
      </p>
    </div>
  );
};

export const ReservateDetails = ({ reserved }: any) => {
  return (
    <div className={ReservateHistoryStyles.reservateDetails}>
      <ul>
        {reserved?.map((reserve: any) => {
          return (
            <>
              <li>
                <span>予約完了日</span>：{reserve.reservationDate}
              </li>
              <li>
                <span>宿泊プラン</span>：{reserve.plan}
              </li>
              <li>
                <span>客室</span>：{reserve.roomType}
              </li>
              <li>
                <span>宿泊日程</span>：{reserve.checkIn}〜{reserve.checkOut}
              </li>
              <li>
                <span>宿泊数</span>：{reserve.lodgeNum}泊
              </li>
              {(function () {
                let peopleNumber = reserve.adultsNum + reserve.childrenNum;
                return (
                  <li>
                    <span>予約人数</span>：{peopleNumber}
                    名（内訳：大人{reserve.adultsNum}名、子ども
                    {reserve.childrenNum}名）
                  </li>
                );
              })()}
              {(function () {
                const reserveNumber = reserve.adultsNum + reserve.childrenNum;
                let totalPrice = reserve.price * 1.1;
                let reserveTotalPrice =
                  reserveNumber * totalPrice * reserve.lodgeNum;
                return (
                  <div className={ReservateHistoryStyles.totalPrice}>
                    <li>
                      <span>宿泊金額</span>：{reserveTotalPrice}円（税込）
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

export const LodgerName = (props: any) => {
  const { lodgeFirstName, lodgeLastName, onChangeFirst, onChangeLast } = props;

  return (
    <>
      <br />
      <input
        type="text"
        value={lodgeFirstName}
        onChange={onChangeFirst}
        placeholder="例）田中"
        className={ReservateHistoryStyles.input}
      />
      <input
        type="text"
        value={lodgeLastName}
        onChange={onChangeLast}
        placeholder="例）太郎"
        className={ReservateHistoryStyles.input}
      />
    </>
  );
};

export const UnReserveTitle = (props: any) => {
  const { clickUnlodgeOpen, hideUnlodgeMessage } = props;
  return (
    <div
      className={ReservateHistoryStyles.UnReserveTitle}
      style={{ display: hideUnlodgeMessage }}
    >
      <h1>宿泊待ち予約</h1>
      <button onClick={clickUnlodgeOpen}>
        確認する
        {/* <GiClick /> */}
      </button>
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
        {/* <GiClick /> */}
      </button>
    </div>
  );
};

export const UnReserve = (props: any) => {
  const {
    clickGet,
    reserves,
    clickChange,
    change,
    reservateChange,
    onClickReserveChange,
    clickCancel,
    onClickCancel,
    changeAfter,
    errorMessage,
    unReserve,
  } = props;

  return (
    <div className={ReservateHistoryStyles.unLodger}>
      <h3 className={ReservateHistoryStyles.innerTitle}>宿泊待ち予約</h3>
      <p className={ReservateHistoryStyles.innerMessage}>
        変更可能項目があります。
      </p>
      <div className={ReservateHistoryStyles.unLodgerContentsTotal}>
        <div className={ReservateHistoryStyles.unLodgerContents}>
          <div>
            <p className={ReservateHistoryStyles.subTitle}>予約内容</p>
            <ul>
              {unReserve.map((reserveItem: any) => {
                return (
                  <>
                    <li>
                      <span>予約日完了日</span>：{reserveItem.reservationDate}
                    </li>
                    <li>
                      <span>宿泊プラン</span>：{reserveItem.plan}
                    </li>
                    <li>
                      <span>客室</span>：{reserveItem.roomType}
                    </li>
                    <li>
                      <span>宿泊日程</span>：{reserveItem.checkIn}〜
                      {reserveItem.checkOut}
                    </li>
                    <li>
                      <span>宿泊数</span>：{reserveItem.lodgeNum}泊
                    </li>
                    {(function () {
                      let peopleNumber =
                        reserveItem.adultsNum + reserveItem.childrenNum;
                      return (
                        <li>
                          <span>予約人数</span>：{peopleNumber}
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
                            <span>宿泊金額</span>：{reserveTotalPrice}円（税込）
                          </li>
                        </div>
                      );
                    })()}
                    {/* 複数予約ある場合
                    <button onClick={clickChange}>変更</button>
                    {change ? (
                      <ChangeReservate
                        reservateChange={reservateChange}
                        onClickReserveChange={onClickReserveChange}
                        clickChange={clickCancel}
                        onClickCancel={onClickCancel}
                        reserves={reserves}
                        changeAfter={changeAfter}
                        errorMessage={errorMessage}
                      />
                    ) : (
                      ""
                    )} */}
                  </>
                );
              })}
            </ul>
          </div>
          <button onClick={clickChange}>変更</button>
        </div>
        {change ? (
          <ChangeReservate
            reservateChange={reservateChange}
            onClickReserveChange={onClickReserveChange}
            clickChange={clickCancel}
            onClickCancel={onClickCancel}
            reserves={reserves}
            changeAfter={changeAfter}
            errorMessage={errorMessage}
          />
        ) : (
          ""
        )}
      </div>
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

export const ChangeAfter = (props: any) => {
  const { changeAfter } = props;

  return (
    <>
      <div>
        <div className={ReservateHistoryStyles.changeAfter}>
          変更後の金額：{changeAfter}円（税込）
        </div>
      </div>
    </>
  );
};

// const q = query(collection(db, "reserved"), where("mail", "==", userEmail));

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
// doc.data() is never undefined for query doc snapshots
// console.log(doc.id, " => ", doc.data());
// const listC = [];
// listC.push(doc.data());
// setDocID(doc.id);
// setReserves(listC);
// console.log(doc.data());
// });

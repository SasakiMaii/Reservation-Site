/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from "react";
import ReservateHistoryStyles from "../../styles/books/_ReservateHistory.module.scss";
import {
  ArrivalTime,
  cancel,
} from "../../components/books/ReservateConfirmContents";
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

const ReservateHistory = () => {
  const [change, setChange] = useState(false);
  const [click, setClick] = useState(false);
  const [clickReservateDetails, setClickReservateDetails] = useState(false);
  const [reserves, setReserves] = useState<any>([]);
  const [lodgeFirstName, setLodgeFirstName] = useState("");
  const [lodgeLastName, setLodgeLastName] = useState("");
  const [adultsNumber, setAdultsNum] = useState("");
  const [childrenNumber, setChildrenNum] = useState("");
  const [lodgeNum, setLodgeNum] = useState("");
  const [roomNum, setRoomNum] = useState("");
  //ログインしているユーザーのIDが入る
  const [docID, setDocID] = useState<any>("");

  //inputに入力された数字の型を数値に変換（変換前は文字列）
  const adultsNum = parseInt(adultsNumber);
  const childrenNum = parseInt(childrenNumber);

  //firebaseからログインユーザーの情報を取得
  const [user] = useAuthState(auth);
  let userEmail = user?.email;
  if (user) {
    console.log(user.email);
  }

  const clickGet = () => {
    //firebaseから、ログインしているユーザーメールアドレスと一致する予約データを取得する
    // useEffect(() => {

    const reserveData = query(
      collection(db, "reserved"),
      where("mail", "==", userEmail)
    );
    getDocs(reserveData).then((reserveItem) => {
      setReserves(reserveItem.docs.map((doc) => ({ ...doc.data() })));
    });
    // }, []);
  };

  // firebaseから、ログインしているユーザーメールアドレスと一致するドキュメントID取得
  // useEffect(() => {
  //   const documentFetch = async () => {
  //     const data = query(
  //       collection(db, "reserved"),
  //       where("mail", "==", userEmail)
  //     );
  //     const querySnapshot = await getDocs(data);
  //     querySnapshot.forEach((doc: any) => {
  //       // setDocx(doc.id)
  //       // console.log(doc.id, "=>", doc.data().adultsNum);
  //       // console.log(doc.id);
  //       // console.log(doc.data().contact);
  //       setDocID(doc.id);
  //     });
  //   };
  //   documentFetch();
  // }, []);
  // console.log(docID);

  // //firebaseデータ更新（ドキュメントID指定して更新）
  const onClickReserveChange = async () => {
    if (
      !lodgeFirstName &&
      !lodgeLastName &&
      !adultsNum &&
      !childrenNum &&
      !lodgeNum &&
      !roomNum
    ) {
      alert("変更内容を入力してください");
    } else {
      const updateRef = doc(db, "reserved", docID);
      await updateDoc(updateRef, {
        lodgeFirstName: lodgeFirstName,
        lodgeLastName: lodgeLastName,
        adultsNum: adultsNum,
        childrenNum: childrenNum,
        lodgeNum: lodgeNum,
        roomNum: roomNum,
      });
      alert("変更しました");
    }
  };

  const ClickCancelPolicy = () => {
    if (click === false) {
      setClick(true);
    } else {
      setClick(false);
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
      title: "宿泊人数（部屋の定員を超えない場合のみ）",
      contents: (
        <div>
          大人：
          <input
            type="number"
            value={adultsNumber}
            onChange={onChangeAdults}
            min={1}
          />
          小人：
          <input
            type="number"
            value={childrenNumber}
            onChange={onChangeChildren}
            min={1}
          />
        </div>
      ),
    },
    {
      title: "宿泊日数（減泊のみ）",
      contents: (
        <input
          type="number"
          min={1}
          value={lodgeNum}
          onChange={(e: any) => setLodgeNum(e.target.value)}
        />
      ),
    },
    {
      title: "部屋数（減室のみ）",
      contents: (
        <input
          type="number"
          min={1}
          value={roomNum}
          onChange={(e: any) => setRoomNum(e.target.value)}
        />
      ),
    },
    {
      title: "",
      // contents: <ArrivalTime />,
    },
    {
      title: <button onClick={ClickCancelPolicy}>キャンセルポリシー</button>,
      contents: click ? <div>{cancel}</div> : "",
    },
  ];

  const clickChange = () => {
    if (change === false) {
      setChange(true);
    } else {
      setChange(false);
    }
  };

  const clickDetails = () => {
    if (clickReservateDetails === false) {
      setClickReservateDetails(true);
    } else {
      setClickReservateDetails(false);
    }
  };

  return (
    <div className={ReservateHistoryStyles.historycontainer}>
      <h1 className={ReservateHistoryStyles.reservatehistoryTitle}>
        予約履歴確認コピー
      </h1>
      <UnReserveTitle />
      {/* <div> */}
        <UnReserve lodgeFirstName={lodgeFirstName} lodgeLastName={lodgeLastName} onChangeFirst={onChangeFirst} onChangeLast={onChangeLast}/>
        {/* <div className={ReservateHistoryStyles.unLodger}>
          <h3>宿泊待ち予約</h3>
          <button
            onClick={clickGet}
            className={ReservateHistoryStyles.unLodgerBtn}
          >
            確認する
          </button>
          <div className={ReservateHistoryStyles.unLodgerContentsTotal}>
            <div className={ReservateHistoryStyles.unLodgerContents}>
              <div>
                <ul>
                  {reserves.map((reserveItem: any) => {
                    return (
                      <>
                        <li>予約内容</li>
                        <hr />
                        <li>
                          <span>宿泊プラン</span>：{reserveItem.plan}
                        </li>
                        <li>
                          <span>客室</span>：{reserveItem.roomType}
                        </li>
                        <li>
                          <span>客室数</span>：{reserveItem.roomNum}室
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
              />
            ) : (
              ""
            )}
          </div>
        </div> */}
        <Reserved clickDetails={clickDetails} clickReservateDetails={clickReservateDetails} reserves={reserves}/>
        {/* <div className={ReservateHistoryStyles.lodged}>
          <h3>宿泊済み予約</h3>
          <p>プラン内容</p>
          <button onClick={clickDetails}>詳細を見る</button>
          {clickReservateDetails ? (
            <ReservateDetails reserves={reserves} />
          ) : (
            ""
          )}
        </div> */}


      {/* </div> */}
    </div>
  );
};

export default ReservateHistory;

export const ChangeReservate = (props: any) => {
  const { reservateChange, onClickReserveChange } = props;

  return (
    <div className={ReservateHistoryStyles.changeReservate}>
      <ul>
        {reservateChange.map((change: any, index: number) => {
          return (
            <div key={index}>
              <li>
                {change.title}
                {change.contents}
              </li>
            </div>
          );
        })}
      </ul>
      <button
        onClick={onClickReserveChange}
        className={ReservateHistoryStyles.changeReservateBtn}
      >
        予約内容を変更する
      </button>
    </div>
  );
};

export const ReservateDetails = ({ reserves }: any) => {
  return (
    <div>
      <ul>
        {reserves?.map((reserve: any) => {
          return <li>{reserve.mail}</li>;
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

export const UnReserveTitle = () => {
  return (
    <div>
      <h1>宿泊待ち予約</h1>
      <button>確認する</button>
    </div>
  );
};

export const ReservedTitle = () => {
  return (
    <div>
      <h1>宿泊済み予約</h1>
      <button>確認する</button>
    </div>
  );
};


export const UnReserve = (props:any) => {
    const {clickGet,reserves,clickChange,change,reservateChange,onClickReserveChange} = props;
    return (
<div className={ReservateHistoryStyles.unLodger}>
          <h3>宿泊待ち予約</h3>
          <button
            onClick={clickGet}
            className={ReservateHistoryStyles.unLodgerBtn}
          >
            確認する
          </button>
          <div className={ReservateHistoryStyles.unLodgerContentsTotal}>
            <div className={ReservateHistoryStyles.unLodgerContents}>
              <div>
                <ul>
                  {reserves.map((reserveItem: any) => {
                    return (
                      <>
                        <li>予約内容</li>
                        <hr />
                        <li>
                          <span>宿泊プラン</span>：{reserveItem.plan}
                        </li>
                        <li>
                          <span>客室</span>：{reserveItem.roomType}
                        </li>
                        <li>
                          <span>客室数</span>：{reserveItem.roomNum}室
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
              />
            ) : (
              ""
            )}
          </div>
        </div>
    )
}

export const Reserved = (props:any) => {

    const {clickDetails,clickReservateDetails,reserves} = props;
    return (
        <div className={ReservateHistoryStyles.lodged}>
          <h3>宿泊済み予約</h3>
          <p>プラン内容</p>
          <button onClick={clickDetails}>詳細を見る</button>
          {clickReservateDetails ? (
            <ReservateDetails reserves={reserves} />
          ) : (
            ""
          )}
        </div>
    )

}

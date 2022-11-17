/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import ReservateHistoryStyles from "../../styles/books/_ReservateHistory.module.scss";
import {
  ArrivalTime,
  cancel,
  newCityRef,
} from "../../components/books/ReservateConfirmContents";
import { LodgerName } from "../../components/books/ReservateConfirmInputName";
import db from "../../Firebase";
import { auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";

const ReservateHistory = () => {
  const [change, setChange] = useState(false);
  const [click, setClick] = useState(false);
  const [clickReservateDetails, setClickReservateDetails] = useState(false);
  const [reserves, setReserves] = useState<any>([]);
  const [adultsNumber, setAdultsNum] = useState("");
  const [childrenNumber, setChildrenNum] = useState("");
  //ログインしているユーザーのIDが入る
  const [docID, setDocID] = useState<any>("");

  //inputに入力された数字の型を数値に変換（変換前は文字列）
  const adultsNum = parseInt(adultsNumber);
  const childrenNum = parseInt(childrenNumber);

  //firebaseからログインユーザーの予約情報を取得


  //ログインしているユーザーのメールアドレス（一致しているuserコレクションから取得）
  const [user] = useAuthState(auth);
  let userEmail = user?.email;
  if(user){
    console.log(user.email);
  }

  // firebaseデータ　ドキュメントID取得
  useEffect(() => {
    const documentFetch = async () => {
      const q = query(
        collection(db, "reserved"),
        where("mail", "==", userEmail)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc: any) => {
        // setDocx(doc.id)
        // console.log(doc.id, "=>", doc.data().adultsNum);
        // console.log(doc.id);
        // console.log(doc.data().contact);
        setDocID(doc.id);
      });
    };
    documentFetch();
  }, []);
  console.log(docID);


  useEffect(() => {
    //データベースからデータを取得する
    const reserveData = query(
      collection(db, "reserved"),
      where("mail", "==", userEmail)
    );
    getDocs(reserveData).then((reserveItem) => {
      setReserves(reserveItem.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  //firebaseデータ更新（ドキュメントID指定して更新）
  const onClickReserveChange = async () => {
    const updateRef = doc(db, "reserved", docID);
    await updateDoc(updateRef, {
      adultsNum: adultsNum,
      childrenNum: childrenNum,
    });
    alert("変更しました");
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

  const reservateChange = [
    {
      title: "宿泊者代表",
      contents: <LodgerName />,
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
      contents: <input type="number" min={1} />,
    },
    {
      title: "部屋数（減室のみ）",
      contents: <input type="number" min={1} />,
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
        予約履歴確認
      </h1>
      <div>
        <div className={ReservateHistoryStyles.unLodger}>
          <h3>宿泊待ち予約</h3>
          <div className={ReservateHistoryStyles.unLodgerContentsTotal}>
            <div className={ReservateHistoryStyles.unLodgerContents}>
              <div>
                <h4>プラン内容</h4>
                <ul>
                  {reserves.map((reserveItem: any) => {
                    return (
                      <>
                        <li>宿泊プラン：{reserveItem.plan}</li>
                        <li>客室：{reserveItem.roomType}</li>
                        <li>
                          宿泊日程：{reserveItem.checkIn}〜
                          {reserveItem.checkOut}
                        </li>
                        {(function () {
                          let peopleNumber =
                            reserveItem.adultsNum + reserveItem.childrenNum;
                          return (
                            <li>
                              予約人数：{peopleNumber}
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
        <div className={ReservateHistoryStyles.lodged}>
          <h3>宿泊済み予約</h3>
          <p>プラン内容</p>
          <button onClick={clickDetails}>詳細を見る</button>
          {clickReservateDetails ? (
            <ReservateDetails reserves={reserves} />
          ) : (
            ""
          )}
          {/* <PrimaryButton children="変更" onClick={() => console.log("")}/> */}
        </div>
      </div>
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
      <button onClick={onClickReserveChange} className={ReservateHistoryStyles.changeReservateBtn}>予約内容を変更する</button>
      
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

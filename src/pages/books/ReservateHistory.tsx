import { useState, useEffect } from "react";
import ReservateHistoryStyles from "../../styles/books/ReservateHistory.module.scss";
import { ArrivalTime, cancel } from "../../components/books/ReservateConfirmContents";
import db from "../../Firebase.js";
import { collection, doc, setDoc, getDocs, addDoc } from "firebase/firestore";
// import PrimaryButton from "../../components/PrimaryButton";

const ReservateHistory = () => {
  const [change, setChange] = useState(false);
  const [click, setClick] = useState(false);
  const [clickReservateDetails, setClickReservateDetails] = useState(false);
  const [reserves, setReserves] = useState<any>([]);

  const ClickCancelPolicy = () => {
    if (click === false) {
      setClick(true);
    } else {
      setClick(false);
    }
  };

  const reservateChange = [
    {
      title: "宿泊人数（部屋の定員を超えない場合のみ）",
      contents: <input type="number" min={1} />,
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
      contents: <ArrivalTime />,
    },
    {
      title: <button onClick={ClickCancelPolicy}>キャンセルポリシー</button>,
      contents: click ? <div>{cancel}</div> : "",
    },
  ];

  //propsでもらってくるほうが良い？
  useEffect(() => {
    //データベースからデータを取得する
    const reserveData = collection(db, "reserved");
    getDocs(reserveData).then((reserveItem) => {
      setReserves(reserveItem.docs.map((doc) => ({ ...doc.data() })));
      // console.log(reserves);
    });
  }, []);

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
          <div className={ReservateHistoryStyles.unLodgerContents}>
            <p>プラン内容：</p>
            <ul>
              {reserves.map((reserveItem:any) => {
                return (
                  <li>客室：{reserveItem.payment}</li>
                )
              })}
            </ul>
            <button onClick={clickChange}>変更</button>
            {change ? (
              <ChangeReservate reservateChange={reservateChange} />
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

export const ChangeReservate = ({ reservateChange }: any) => {
  const changeSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <form action="#" onSubmit={changeSubmit}>
      <div>
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
        <button onClick={() => alert("予約内容を変更しました")}>
          予約内容を変更する
        </button>
      </div>
    </form>
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

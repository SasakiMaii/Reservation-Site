import { useState } from "react";
import "../../styles/ReservateHistory.scss";
import { ArrivalTime,cancel } from "../../components/ReservateConfirmContents";
// import PrimaryButton from "../../components/PrimaryButton";


const ReservateHistory = () => {
  const [change, setChange] = useState(false);
  const [click, setClick] = useState(false);

  const ClickCancelPolicy = () => {
    if (click === false) {
      setClick(true);
    } else {
      setClick(false);
    }
  }

  const reservateChange = [
    {
      title: "宿泊人数（部屋の定員を超えない場合のみ）",
      contents: <input type="number" min={1}/>,
    },
    {
      title: "宿泊日数（減泊のみ）",
      contents: <input type="number" min={1}/>,
    },
    {
      title: "部屋数（減室のみ）",
      contents: <input type="number" min={1}/>,
    },
    {
      title: "",
      contents: <ArrivalTime />
    },
    {
      title: <button　onClick={ClickCancelPolicy}>キャンセルポリシー</button>,
      contents: click ? <div>{cancel}</div> : ""
    }
  ];

  const clickChange = () => {
    if (change === false) {
      setChange(true);
    } else {
      setChange(false);
    }
  };

  return (
    <div className="historycontainer">
      <h1 className="reservatehistory-title">予約履歴確認</h1>
      <div>
        <div className="un-lodger">
          <h3>宿泊待ち予約</h3>
          <div className="un-lodger-contents">
            <p>プラン内容：</p>
            <button onClick={clickChange}>変更</button>
            {change ? (
              <ChangeReservate reservateChange={reservateChange} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="lodged">
          <h3>宿泊済み予約</h3>
          <p>プラン内容</p>
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
          {reservateChange.map((change: any,index:number) => {
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

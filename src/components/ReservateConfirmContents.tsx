import { useState } from "react";
import "../styles/ReservateConfirmContents.scss";
import { useNavigate } from "react-router-dom";
// import { collection, doc, setDoc } from "firebase/firestore";

export const ReservateConfirmContents = () => {
  const navigate = useNavigate();
  const [val, setVal] = useState(["check"]);

  const reservatePlan = [
    {
      title: "宿泊先",
      content: "",
    },
    {
      title: "客室",
      content: "",
    },
    {
      title: "宿泊プラン",
      content: "",
    },
    {
      title: "日程",
      content: "",
    },
    {
      title: "予約人数",
      content: "",
    },
    {
      title: "宿泊金額 合計",
      content: "",
    },
  ];

  const handleChange = (e: any) => {
    if (val.includes(e.target.value)) {
      setVal(val.filter((item) => item !== e.target.value));
    } else {
      setVal([...val, e.target.value]);
    }
  };

  const clickReservate = () => {
    navigate("/books/ReservateComplete");
  };

  return (
    <div>
      {/* <h1>予約内容の確認</h1> */}
      <div className="information">
        <div className="person-information">
          <div className="subscriber">
            <h3>予約者情報</h3>
            <p>名前：</p>
            <p>電話番号：</p>
            <p>メールアドレス：</p>
          </div>
          <div className="lodger">
            <h3>宿泊者情報</h3>
            <div>
              <p>宿泊者代表</p>
              <input
                type="checkbox"
                id="lodger"
                onChange={handleChange}
                checked={val.includes("check")}
                value="check"
              />
              <label htmlFor="lodger">
                上記予約者と同じ
                <br />
                代表者が異なる場合はチェックを外し、情報を入力してください。
              </label>
              {val.length > 0 ? "" : <LodgerName />}
            </div>
            <div>
              <Content />
            </div>
          </div>
        </div>
        <div className="reservateplan">
          <h3>予約プラン確認</h3>
          <ul>
            {reservatePlan.map((plan: any, index: any) => (
              <li key={index}>
                {plan.title}：{plan.contents}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="payment">
        <p>
          お支払い方法<span>※必須</span>
        </p>
        <input type="radio" id="localpay" name="payment" />
        <label htmlFor="localpay">現地にて精算</label>
        <input type="radio" id="creditpay" name="payment" />
        <label htmlFor="creditpay">クレジット精算</label>
      </div>
      <div className="reservateButton">
        <button onClick={clickReservate}>予約する</button>
      </div>
    </div>
  );
};

export const Content = () => {
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
  console.log(result);
  return (
    <>
      <div className="accordion-contents">
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
          <textarea></textarea>
        </div>
        <div>
          <ul className="accordion-menu">
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

export const LodgerName = () => {
  return (
    <>
      <br />
      <input type="text" placeholder="姓" />
      <input type="text" placeholder="名" />
      <br />
      <input type="text" placeholder="姓(フリガナ)" />
      <input type="text" placeholder="名(フリガナ)" />
    </>
  );
};

export const ArrivalTime = () => {
  return (
    <div className="check-time">
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
    </div>
  );
};

export const ClickCancelPolicy = (accordionClick:any,click:any) => {
  return (
    <div>
          <ul className="accordion-menu">
            <li>
              <button type="button" onClick={accordionClick}>
                キャンセルポリシー
              </button>
              {click ? <div>{cancel}</div> : ""}
            </li>
          </ul>
        </div>
  )
}


const cancel = (
  <div>
    <p>
      ご予約完了後のキャンセルは、下記のポリシーに従ってキャンセル料がかかる場合がございます。
    </p>
    <ul>
      <li>当日：宿泊料金の80%</li>
      <li>1日前：宿泊料金の20%</li>
      <li> 連絡なしキャンセル：宿泊料金の100%</li>
    </ul>
  </div>
);


export { cancel };

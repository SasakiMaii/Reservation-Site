import { Children, MouseEvent } from "react";
import { Link } from "react-router-dom";
import SearchStyle from "../../styles/rooms/_Search.module.scss";
import PrimaryButton from "../../components/button/PrimaryButton";
import SearchInputLayout from "../../components/rooms/SearchInputLayout";

//React icon
import {
  IoCalendarOutline,
  IoAccessibilitySharp,
  IoAccessibilityOutline,
  IoSearchOutline,
} from "react-icons/io5";
import Header from "../../components/layout/Header";

const RoomSearch = () => {
  return (
    <>
      <Header />
      <Link to={"/"} className={SearchStyle.reservedCheck}>
        ご予約内容の確認・変更・取り消しはこちら
      </Link>
      <div className={SearchStyle.container}>
        <Checkin />
        <ObsessionSearch />
      </div>
    </>
  );
};

export const Checkin = () => {
  const dateChoise = () => {};

  return (
    <div className={SearchStyle.checkContainer}>
      <div className="checkinDate">
        <p style={{fontSize:"18px",marginBottom:"20px"}}>
          <IoCalendarOutline />
          チェックイン日
        </p>

        <PrimaryButton onClick={dateChoise}>日程を選択</PrimaryButton>
      </div>
      <div className={SearchStyle.adult}>
        {/* 宿泊人数の上限を超えていますのエラーを出す */}
        <p>
          <IoAccessibilitySharp />
          大人
        </p>
        <SearchInputLayout />
      </div>
      <div className={SearchStyle.children}>
        <p>
          <IoAccessibilityOutline />
          子供（小学生以下）
        </p>
        <SearchInputLayout />
      </div>
    </div>
  );
};

//ループ使う際 {(()=>{})}

//こだわり条件
export const ObsessionSearch = ({ dateChoice }: any) => {
  const obroop = () => {
    const price = [];
    for (let i = 10000; i <= 100000; i = i + 5000) {
      price.push(
        <option key={i} value={i}>
          {i}円
        </option>
      );
    }
    return price;
  };

  return (
    <>
      {/* mapでデータとってくる？ */}

      <div className={SearchStyle.obsessionContainer}>
        <h2 className={SearchStyle.conditions}>
          <IoSearchOutline />
          こだわり条件
        </h2>
        <div>
          <p className={SearchStyle.roomSerch}>客室の種類</p>
          <select
            className={SearchStyle.priceroomSelect}
            name="gestroom"
            id="gestroom"
          >
            <option value="#" selected>
              指定なし▼
            </option>
            <option value="north">north</option>
            <option value="north">south</option>
            <option value="north">west</option>
            <option value="north">east</option>
          </select>
        </div>
        <div className={SearchStyle.btnWrapper}>
          <div className={SearchStyle.roomPrice}>
            <p>一室もしくは１人あたりの宿泊料金</p>
            <select
              className={SearchStyle.priceroomSelect}
              name="downprice"
              id="downprice"
            >
              <option value="#" selected>
                下限なし▼
              </option>
              {obroop()}
            </select>
            &nbsp;&nbsp;&nbsp;〜&nbsp;
            <select
              className={SearchStyle.priceroomSelect}
              name="upprice"
              id="upprice"
            >
              <option value="#" selected>
                上限なし▼
              </option>
              {obroop()}
            </select>
          </div>
          <div className="rightbutton">
            <PrimaryButton onClick={dateChoice}>検索</PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomSearch;

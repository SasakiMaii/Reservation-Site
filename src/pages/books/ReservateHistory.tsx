/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import ReservateHistoryStyles from "../../styles/books/_ReservateHistory.module.scss";
import db from "../../Firebase";
import { auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
import Head from "../../components/layout/Head";

const ReservateHistory: React.FC = () => {
  //(firebase)データベースを格納
  const [reserves, setReserves] = useState<any>([]);

  //コンポーネント表示切り替え
  const [openUnlodgeDisplay, setOpenUnlodgeDisplay] = useState<boolean>(false);
  const [hideUnlodgeMessage, setHideUnlodgeMessage] = useState<string>("block");
  const [openLodgedDisplay, setOpenLodgedDisplay] = useState<boolean>(false);
  const [hideLodgedMessage, setHideLodgedMessage] = useState<string>("block");

  //アコーディオンメニュー
  const [openUnReseveAnswer, setUnReserveOpenAnswer] = useState<any>({
    0: false,
  });
  const [openResevedAnswer, setReservedOpenAnswer] = useState<any>({
    0: false,
  });

  let dt = new Date();
  let y = dt.getFullYear();
  let m = ("00" + (dt.getMonth() + 1)).slice(-2);
  let d = ("00" + dt.getDate()).slice(-2);
  let todayDate = y + "-" + m + "-" + d;

  const dateNum = Date.parse(todayDate);

  //firebaseからログインユーザーの情報を取得
  const [user] = useAuthState(auth);
  let userEmail = user?.email;
  if (user) {
    // console.log(user.email);
  }

  const clickChange = (index: number) => {
    setUnReserveOpenAnswer((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const clickDetails = (index: number) => {
    setReservedOpenAnswer((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const clickUnlodgeOpen = async () => {
    setOpenUnlodgeDisplay(true);
    setHideUnlodgeMessage("none");

    //firebaseから、ログインしているユーザーメールアドレスと一致する予約データを取得する
    const reserveData = query(
      collection(db, "reserved"),
      where("loginMail", "==", userEmail)
    );
    getDocs(reserveData).then((reserveItem) => {
      setReserves(reserveItem.docs.map((doc) => ({ ...doc.data() })));
    });
  };

  const clickLodgedOpen = async () => {
    setOpenLodgedDisplay(true);
    setHideLodgedMessage("none");

    //firebaseから、ログインしているユーザーメールアドレスと一致する予約データを取得する
    const reserveData = query(
      collection(db, "reserved"),
      where("loginMail", "==", userEmail)
    );
    getDocs(reserveData).then((reserveItem) => {
      setReserves(reserveItem.docs.map((doc) => ({ ...doc.data() })));
    });
  };

  // checkOutの日付が過去か未来か判別
  // eslint-disable-next-line array-callback-return
  let unReserve: any = [];
  let reserved: any = [];

    reserves.map((reserveItems: any) => {
      const abc = Date.parse(reserveItems.checkIn);
      if (abc > dateNum) {
        unReserve.push(reserveItems);
      } else {
        reserved.push(reserveItems);
      }
    });
  

  return (
    <>
      <Head
        title="PrinceViewHotel-予約履歴"
        description="ホテルの予約サイトです。-PrinceViewHotel-"
      />
      <Header />
      <div className={ReservateHistoryStyles.HistoryContainer}>
        <h1 className={ReservateHistoryStyles.HistoryTitle}>予約履歴確認</h1>
        <UnReserveTitle
          clickUnlodgeOpen={clickUnlodgeOpen}
          hideUnlodgeMessage={hideUnlodgeMessage}
        />
        {openUnlodgeDisplay ? (
          <UnReserve
            clickChange={clickChange}
            UnReservateDetails={UnReservateDetails}
            unReserve={unReserve}
            openUnReseveAnswer={openUnReseveAnswer}
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
            reserved={reserved}
            openResevedAnswer={openResevedAnswer}
          />
        ) : (
          ""
        )}
        <Footer />
      </div>
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
      <button onClick={clickUnlodgeOpen}>確認する</button>
    </div>
  );
};

export const UnReserve = (props: any) => {
  const { clickChange, unReserve, UnReservateDetails, openUnReseveAnswer } =
    props;

  return (
    <div className={ReservateHistoryStyles.unLodger}>
      <h3 className={ReservateHistoryStyles.innerTitle}>宿泊待ち予約</h3>
      <div className={ReservateHistoryStyles.unLodgerContents}>
        <p className={ReservateHistoryStyles.subTitle}>予約内容</p>
      </div>
      <div>
        <div className={ReservateHistoryStyles.unLodgerContentsList}>
          {unReserve.map((unReserveItem: any, index: number) => {
            return (
              <div key={index}>
                <div className={ReservateHistoryStyles.unLodgerContentsLists}>
                  <p>
                    ・{unReserveItem.checkIn}〜<br />
                    {unReserveItem.plan}
                  </p>
                  <button onClick={() => clickChange(index)}>詳細を見る</button>
                  {unReserveItem.question}
                </div>

                <div>
                  {openUnReseveAnswer[index] && unReserve ? (
                    <UnReservateDetails unReserveItem={unReserveItem} />
                  ) : undefined}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const UnReservateDetails = ({ unReserveItem }: any) => {
  return (
    <div className={ReservateHistoryStyles.unReservateDetails}>
      <ul>
        {" "}
        <li>
          <span>予約完了日</span>
          {unReserveItem.reservationDate}
        </li>
        <li>
          <span>宿泊プラン</span>
          {unReserveItem.plan}
        </li>
        <li>
          <span>客室</span>
          {unReserveItem.roomType}
        </li>
        <li>
          <span>チェックイン日</span>
          {unReserveItem.checkIn}
        </li>
        <li>
          <span>宿泊数</span>
          {unReserveItem.lodgeNum}泊
        </li>
        {(function () {
          let peopleNumber =
            unReserveItem.adultsNum + unReserveItem.childrenNum;
          return (
            <li>
              <span>予約人数</span>
              {peopleNumber}
              名（内訳：大人{unReserveItem.adultsNum}名、子供
              {unReserveItem.childrenNum}名）
            </li>
          );
        })()}
        <li>
          <span>宿泊金額</span>
          {unReserveItem.price}円（税込）
        </li>
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
      <button onClick={clickLodgedOpen}>確認する</button>
    </div>
  );
};

export const Reserved = (props: any) => {
  const { clickDetails, reserved, openResevedAnswer } = props;
  return (
    <div className={ReservateHistoryStyles.lodged}>
      <h3 className={ReservateHistoryStyles.innerTitle}>宿泊済み予約</h3>
      <div className={ReservateHistoryStyles.lodgedContents}>
        <p className={ReservateHistoryStyles.subTitle}>予約内容</p>
      </div>
      <div className={ReservateHistoryStyles.lodgedContentsList}>
        {reserved.map((reservedItem: any, index: number) => {
          return (
            <div key={index}>
              <div className={ReservateHistoryStyles.lodgedContentsLists}>
                <p>
                  ・{reservedItem.checkIn}〜<br />
                  {reservedItem.plan}
                </p>
                <button onClick={() => clickDetails(index)}>詳細を見る</button>
                {reservedItem.question}
              </div>
              <div>
                {openResevedAnswer[index] ? (
                  <ReservateDetails reservedItem={reservedItem} />
                ) : undefined}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ReservateDetails = ({ reservedItem }: any) => {
  return (
    <div className={ReservateHistoryStyles.reservateDetails}>
      <ul>
        <li>
          <span>予約完了日</span>
          {reservedItem.reservationDate}
        </li>
        <li>
          <span>宿泊プラン</span>
          {reservedItem.plan}
        </li>
        <li>
          <span>客室</span>
          {reservedItem.roomType}
        </li>
        <li>
          <span>チェックイン日</span>
          {reservedItem.checkIn}
        </li>
        <li>
          <span>宿泊数</span>
          {reservedItem.lodgeNum}泊
        </li>
        {(function () {
          let peopleNumber = reservedItem.adultsNum + reservedItem.childrenNum;
          return (
            <li>
              <span>予約人数</span>
              {peopleNumber}
              名（内訳：大人{reservedItem.adultsNum}名、子供
              {reservedItem.childrenNum}名）
            </li>
          );
        })()}
        <li>
          <span>宿泊金額</span>
          {reservedItem.price}円（税込）
        </li>
      </ul>
    </div>
  );
};

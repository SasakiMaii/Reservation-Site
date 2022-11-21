import RoomSearchSoart from "../../components/rooms/RoomSearchSoart";
import RoomStyle from "../../styles/rooms/_Gestroom.module.scss";
import PrimaryButton from "../../components/button/PrimaryButton";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import PagingStyle from "../../styles/rooms/_Paging.module.scss";
import { useEffect, useState, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
// import "firebase";
import db from "../../Firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  endBefore,
  where,
} from "firebase/firestore";
import RoomPlanSearch from "../../components/rooms/Search";
import SecondryButton from "../../components/button/SecondryButton";

const GestroomPlan = () => {
  const navigate = useNavigate();
  const [rooms, SetRooms] = useState<any>([]);
  const [descClick, setDescClick] = useState(false);
  const [ascClick, setAscClick] = useState(false);

  const [room, setRoom] = useState<any>([]); //db取り出し
  const [reserve, setReserve] = useState<any>([]); //db取り出し
  const [reserved, setReserved] = useState<any>([]); //db取り出し
  const [adultInput, setAdultInput] = useState<any>("");
  const [chilrdInput, setChilrdInput] = useState<any>("");
  const [roomChange, setRoomChange] = useState<any>(""); //selectの値
  const [downChange, setDownChange] = useState<any>("");
  const [upChange, setUpChange] = useState<any>("");
  const [datetext, setDatetext] = useState("");
  const [err, setErr] = useState([]); //検索のバリデーション

  const noemptyDate = reserve.filter((x: any) => {
    return String(x.checkIn) === datetext;
  });
  // console.log(noemptyDate); //一致した値が入る
  //日付が一致（予約確認のDBと入力値）
  const noemptyDates = reserved.filter((x: any) => {
    return String(x.checkIn) === datetext;
  });
  //日付が一致（予約確認のDBと入力値）

  const noemptyRoom = reserved.filter((x: any) => {
    return x.roomType === roomChange;
  });
  //部屋が一致

  const reserveRoom = reserve.map((x: any) => {
    return x;
  });

  const noemptyRooms = reserve.filter((x: any) => {
    return x.roomType === roomChange;
  });
  //部屋が一致
  const count = Number(adultInput) + Number(chilrdInput) <= 3;
  //人数が合わせて３人以上だったらtrue

  // const noemptyRoom = room.filter((x: any) => {
  //   return String(x.roomType) === roomChange;
  // });
  // //ゲストルームのDBのルームタイプと,部屋の入力値が一致

  const priceFilter = downChange <= upChange;
  //上限金額のが高いように(trueが正常)

  // console.log(roomFilters && noemptyDate)

  const price = room.filter((x: any) => {
    return Number(downChange) >= x.price || x.price <= Number(upChange);
  });

  const roomPick = room.filter((r: any) => {
    return r.roomType === roomChange;
  });

  //検索ボタン・検索バリデーション
  const dateChoice = () => {
    setErr([]);
    const errorMsg: any = [];
    if (adultInput === "" || datetext === "") {
      errorMsg.push("チェックイン日と大人の宿泊人数は入力必須項目です");
    }
    if (count === false) {
      errorMsg.push("一部屋に対しての人数が超過しています");
    }
    if (new Date(datetext) <= new Date(new Date().toString())) {
      errorMsg.push("今日以降の日付を入れてください");
    }
    // console.log(roomPick)
    if (priceFilter === false) {
      errorMsg.push("金額の入力を確認してください");
    }
    if (
      (noemptyDate.length === 1 && noemptyRooms.length === 1) ||
      (noemptyRoom.length === 1 && noemptyDates.length === 1)
    ) {
      errorMsg.push(
        "上記の条件で空室はございません。条件を変更して検索しなおしてください。"
      );
    } else if (
      (noemptyDate.length === 1 && !noemptyRoom.length) ||
      (noemptyDates.length === 1 && !noemptyRooms.length)
    ) {
      SetRooms(roomPick);
    }

    if (
      (noemptyDate.length === 0 && roomPick) ||
      (noemptyDates.length === 0 && roomPick)
    ) {
      SetRooms(roomPick);
    }

    if (
      (noemptyDate.length === 1 && noemptyRoom.length === 0) ||
      (noemptyDates.length === 1 && noemptyRooms.length === 0)
    ) {
      SetRooms(roomPick);
    }

    const resRoom = rooms.map((room: any) => {
      return room;
    }); //全部を表示

    if (datetext && roomChange === "") {
      SetRooms(resRoom);
    }

    console.log(roomPick)


    //日付は埋まってるけど部屋は空いてるから指定の部屋を表示

    // 宿泊数に対して空いているか（できていない）

    setErr(errorMsg);
  };

  return (
    <>
      <Header />
      <p className={RoomStyle.pageTitle}>
        <IoSearchOutline size={28} />
        空室検索
      </p>
      <Link to={"/"} className={RoomStyle.reservedCheck}>
        ご予約内容の確認・変更・取り消しはこちら
      </Link>
      {err.map((error: any) => {
        return (
          <p key={err[0]} className={RoomStyle.err}>
            ※{error}
          </p>
        );
      })}
      <RoomPlanSearch
        room={room}
        setRoom={setRoom}
        reserve={reserve}
        setReserve={setReserve}
        reserved={reserved}
        setReserved={setReserved}
        chilrdInput={chilrdInput}
        setChilrdInput={setChilrdInput}
        adultInput={adultInput}
        setAdultInput={setAdultInput}
        roomChange={roomChange}
        setRoomChange={setRoomChange}
        downChange={downChange}
        setDownChange={setDownChange}
        upChange={upChange}
        setUpChange={setUpChange}
        datetext={datetext}
        setDatetext={setDatetext}
        dateChoice={dateChoice}
      />
      <p className={RoomStyle.pageTitle}>全ての客室＆プラン</p>
      <div className={RoomStyle.roomLinkWrapper}>
        <Link to={"#"} className={RoomStyle.roomLink}>
          {" "}
          客室で探す{" "}
        </Link>
        <Link to={"/rooms/Plan"}> プランで探す </Link>
      </div>
      <RoomCard
        descClick={descClick}
        setDescClick={setDescClick}
        rooms={rooms}
        setRooms={SetRooms}
        ascClick={ascClick}
        setAscClick={setAscClick}
      />
      {/* <Pageing /> */}
      <Footer />
    </>
  );
};

//部屋の詳細
export const RoomCard = (prps: any) => {
  const { descClick, setDescClick, rooms, setRooms, ascClick, setAscClick } =
    prps;
  const soartData = collection(db, "gestRoomType");
  const [showPlan, setShowPlan] = useState(false);

  const showPlanChange = () => {
    if (showPlan) {
      setShowPlan(false);
    } else {
      setShowPlan(true);
    }
  };

  useEffect(() => {
    // const roomDate = collection(db, "gestRoomType");
    const roomDate = query(soartData, orderBy("price"), limit(3));
    getDocs(roomDate).then((snapShot) => {
      setRooms(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  //ソート関数
  const onAscSort = async () => {
    const priceAsc = query(soartData, orderBy("price"), limit(3));
    const data = await getDocs(priceAsc);
    const newAscData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setAscClick(true);
    setDescClick(false);
    setRooms(newAscData);
  };

  const onDescSort = async () => {
    const priceDesc = query(soartData, orderBy("price", "desc"), limit(3));
    const data = await getDocs(priceDesc);
    const newDescData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setDescClick(true);
    setAscClick(false);
    setRooms(newDescData);
  };
  //---
  // const roomData=collection(db,"gestRoomType")
  // const documentId=query(roomData,where("id","==","1"))

  // const idArr= [ ESCltzAbsUa9uEzrEpFt,
  //   VMThmbgb0Cb8r4Unx9Gn,
  //   lwRWhU1tqc54kqUxwmvl,
  //   wz128l8sMh4eAvpHPou7];
  //予約ボタン
  const navigate = useNavigate();
  const handleResarvedRoomBtn = () => {
    // rooms.filter((room:any)=>{room.id})
    navigate(`/rooms/RoomDetails`);
  };

  //次のページへ進むボタン。ソートボタンがクリックされていた場合は、料金順でページングになるように。
  // console.log(descClick)
  // console.log(ascClick)
  const handleNextPage = async () => {
    if (descClick === true) {
      const priceDesc = query(soartData, orderBy("price", "desc"), limit(3));
      const data = await getDocs(priceDesc);
      const last = data.docs[data.docs.length - 1];
      const next = query(
        soartData,
        orderBy("price", "desc"),
        startAfter(last),
        limit(3)
      );
      const nextdata = await getDocs(next);
      const nextPage = nextdata.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(nextPage)
      setRooms(nextPage);
    } else if (ascClick === true) {
      const priceDesc = query(soartData, orderBy("price"), limit(3));
      const data = await getDocs(priceDesc);
      const last = data.docs[data.docs.length - 1];
      const next = query(
        soartData,
        orderBy("price"),
        startAfter(last),
        limit(3)
      );
      const nextdata = await getDocs(next);
      const nextPage = nextdata.docs.map((doc) => ({
        ...doc.data(),
      }));
      // console.log(nextPage)

      setRooms(nextPage);
    } else {
      const priceDesc = query(soartData, orderBy("price"), limit(3));
      const data = await getDocs(priceDesc);
      const last = data.docs[data.docs.length - 1];
      const next = query(
        soartData,
        orderBy("price"),
        startAfter(last),
        limit(3)
      );
      const nextdata = await getDocs(next);
      const nextPage = nextdata.docs.map((doc) => ({
        ...doc.data(),
      }));

      setRooms(nextPage);
    }
  };
  //前のページに戻るボタン
  const handlePrevPage = async () => {
    //安い順の時はこれでちゃんと戻れる
    if (descClick === true) {
      const priceDesc = query(soartData, orderBy("price", "desc"), limit(3));
      const data = await getDocs(priceDesc);
      const newDescData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRooms(newDescData);
    } else {
      const p = query(soartData, orderBy("price"), limit(4));
      const data = await getDocs(p);
      const descPrev = data.docs[data.docs.length - 1];
      const next = query(
        soartData,
        orderBy("price"),
        endBefore(descPrev),
        limit(3)
      );
      const descPrevdata = await getDocs(next);
      const prevPage = descPrevdata.docs.map((doc) => ({
        ...doc.data(),
      }));
      setRooms(prevPage);
    }
  };

  return (
    <>
      <div className={RoomStyle.roomPlanContainer}>
        <ul>
          <RoomSearchSoart onAscClick={onAscSort} onDescClick={onDescSort} />
          {rooms.map((room: any) => {
            return (
              <li key={room.area} className={RoomStyle.roomPlanCard}>
                <div className={RoomStyle.cardTitle}>
                  <h1 className={RoomStyle.roomName}>{room.area}</h1>
                  <p className={RoomStyle.roomArea}>{room.capacityArea}</p>
                </div>
                <div className={RoomStyle.detailContainer}>
                  <img
                    className={RoomStyle.roompic}
                    src="../hotel-4.jpg"
                    alt="roompicture"
                  />
                  <div className={RoomStyle.roomDetails}>
                    <p className={RoomStyle.roomCapacity}>
                      定員{room.capacity}名
                    </p>
                    <p className={RoomStyle.bedType}>
                      ベッドタイプ｜{room.bedType}
                    </p>
                    <p className={RoomStyle.roomEquipmentTitle}>
                      【客室室内設備】
                    </p>
                    <p className={RoomStyle.roomEquipment}>
                      {room.roomFacility}
                    </p>
                    <p className={RoomStyle.roomPrice}>
                      ¥{room.price.toLocaleString()}
                      <span>〜/人</span>
                    </p>
                  </div>
                </div>
                <div className={RoomStyle.ResarvedRoomBtn}>
                  <PrimaryButton onClick={handleResarvedRoomBtn}>
                    空室を探す
                  </PrimaryButton>
                </div>
                <div className={RoomStyle.roomplanWrapper}>
                  <p className={RoomStyle.roomplan}>プラン</p>
                  {showPlan ? (
                    <button
                      onClick={showPlanChange}
                      style={{ fontSize: "18px" }}
                    >
                      元に戻す
                    </button>
                  ) : (
                    <button
                      onClick={showPlanChange}
                      style={{ fontSize: "17px" }}
                    >
                      もっと見る...
                    </button>
                  )}
                </div>
                <hr />

                <div className={RoomStyle.roomplanCards}>
                  <img width={200} src="../hotel-4.jpg" alt="roompicture" />
                  <div className={RoomStyle.roomplanContainer}>
                    <p className={RoomStyle.roomplantext}>{room.plan1}</p>
                    <div className={RoomStyle.roomplanButton}>
                      <SecondryButton onClick={handleResarvedRoomBtn}>
                        このプランで探す
                      </SecondryButton>
                    </div>
                  </div>
                </div>
                {showPlan ? (
                  <div>
                    <div className={RoomStyle.roomplanCards}>
                      <img width={200} src="../hotel-4.jpg" alt="roompicture" />
                      <div className={RoomStyle.roomplanContainer}>
                        <p className={RoomStyle.roomplantext}>{room.plan2}</p>
                        <div className={RoomStyle.roomplanButton}>
                          <SecondryButton onClick={handleResarvedRoomBtn}>
                            このプランで探す
                          </SecondryButton>
                        </div>
                      </div>
                    </div>
                    {room.plan3 ? (
                      <div className={RoomStyle.roomplanCards}>
                        <img
                          width={200}
                          src="../hotel-4.jpg"
                          alt="roompicture"
                        />
                        <div className={RoomStyle.roomplanContainer}>
                          <p className={RoomStyle.roomplantext}>{room.plan3}</p>
                          <div className={RoomStyle.roomplanButton}>
                            <SecondryButton onClick={handleResarvedRoomBtn}>
                              このプランで探す
                            </SecondryButton>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {room.plan4 ? (
                      <div className={RoomStyle.roomplanCards}>
                        <img
                          width={200}
                          src="../hotel-4.jpg"
                          alt="roompicture"
                        />
                        <div className={RoomStyle.roomplanContainer}>
                          <p className={RoomStyle.roomplantext}>{room.plan4}</p>
                          <div className={RoomStyle.roomplanButton}>
                            <SecondryButton onClick={handleResarvedRoomBtn}>
                              このプランで探す
                            </SecondryButton>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    <p>
                      ※表示されている料金は参考価格です。予約内容確認画面で最終的な料金をご確認ください。
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={PagingStyle.pagingWrapper}>
        {<button onClick={handlePrevPage}>1</button>}
        <button onClick={handleNextPage}>2</button>
        <p className={PagingStyle.pagingdetail}>全2ページ</p>
      </div>
    </>
  );
};

export default GestroomPlan;

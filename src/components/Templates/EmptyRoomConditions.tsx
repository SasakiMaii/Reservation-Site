import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import db from "../../Firebase";
import RoomPlanSearch from "./Search";


const EmptyRoomConditions = (props: any) => {
  const {
    datetext,
    setDatetext,
    reserved,
    rooms,
    SetRooms,
    setErr,
    setInfo,
    setReserved,
    setReserve,
    reserve,
  } = props;
  const roomData = collection(db, "gestRoomType");
  const [emptyRoom,setEmptyRoom]=useState<any>([]);

  useEffect(() => {
    const roomDescDate = query(roomData, orderBy("price","desc"));
    getDocs(roomDescDate).then((snapShot) => {
      setEmptyRoom(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  //Redux
  const adultEl = useSelector((state: any) => state.searchInput.adultInput);
  const childEl = useSelector((state: any) => state.searchInput.childInput);
  const roomEl = useSelector((state: any) => state.gestroom.roomSelect);
  const upEl = useSelector((state: any) => state.gestroom.upSelect);
  const downEl = useSelector((state: any) => state.gestroom.downSelect);
  //---------------------------
  //日付が一致（予約確認のDBと入力値）
  const noemptyDates = reserved.filter((x: any) => {
    return String(x.checkIn) === datetext;
  });

  //部屋が一致(予約されている部屋と)
  const noemptyRoom = reserved.filter((x: any) => {
    return x.roomType === roomEl;
  });

  //人数が合わせて３人以上だったらtrue
  const count = Number(adultEl) + Number(childEl) <= 2;

  const priceFilter = upEl <= downEl;
  //上限金額のが高いように(trueが正常)

  //金額での絞り込み（10,000円〜15,000円の間など）
  const price = emptyRoom.filter((x: any) => {
    return Number(downEl) >= x.price || x.price <= Number(upEl);
  });

  //roomChangeで指定された部屋の表示
  const roomPick = emptyRoom.filter((r: any) => {
    return r.area === roomEl;
  });

  //全部屋情報
  const resRoom = emptyRoom.filter((room: any) => {
    return room;
  }); //全部を表示

  const reset = emptyRoom.filter((room: any) => {
    return room.area === datetext;
  });

  //検索ボタン・検索バリデーション
  const dateChoice = () => {
    setErr([]);
    setInfo([]);
    SetRooms(resRoom);
    const errorMsg: any = [];
    const infoMsg: any = [];
    const errorInfo: any = [];
    if (adultEl === "" || datetext === "") {
        errorMsg.push("チェックイン日と大人の宿泊人数は入力必須項目です");
        SetRooms(resRoom);
        errorInfo.push("エラー");
    }
    if (count === false) {
        console.log("input");
        errorMsg.push("一部屋での宿泊可能人数を超えています");
        SetRooms(resRoom);
        errorInfo.push("エラー");
    }

    if (new Date(datetext) <= new Date(new Date().toString())) {
        SetRooms(resRoom);
        errorMsg.push("今日以降の日付を入れてください");
        errorInfo.push("エラー");
    }

    if (priceFilter === false) {
        SetRooms(resRoom);
        errorMsg.push("金額の入力を確認してください");
        errorInfo.push("エラー");
    }
    //予約している部屋と一致、日付も一致
    if (noemptyRoom.length >= 1 && noemptyDates.length >= 1) {
      errorMsg.push(
        "上記の条件で空室はございません。条件を変更して検索しなおしてください。"
      );
      SetRooms(reset);
    } else {
      if (noemptyRoom.length === 0 && noemptyDates.length >= 1) {
        SetRooms(roomPick);
      }
      //日付も部屋もdbと一致しない場合は全件データ表示
      if (roomEl.length >= 1) {
        if (errorInfo.length >= 1) {
          SetRooms(resRoom);
        } else {
          infoMsg.push(`現在、${roomEl}は空室です`);
          SetRooms(roomPick);
    
        }
      } else if (roomEl.length <= 1) {
        if (errorInfo.length >= 1) {
          SetRooms(resRoom);
        } else {
          infoMsg.push(`現在、5つのお部屋が空室です`);
          SetRooms(resRoom);
        }
      }
    }
    // 宿泊数に対して空いているか（できていない）
    setErr(errorMsg);
    setInfo(infoMsg);
  };
  return (
    <>
      <RoomPlanSearch
        reserve={reserve}
        setReserve={setReserve}
        reserved={reserved}
        setReserved={setReserved}
        datetext={datetext}
        setDatetext={setDatetext}
        dateChoice={dateChoice}
      />
    </>
  );
};


export default EmptyRoomConditions

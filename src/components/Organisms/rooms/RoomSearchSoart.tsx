import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../../../Firebase";
import { setAscclick, setDescclick } from "../../../store/GestroomSlice";
import RoomStyle from "../../../styles/rooms/_Gestroom.module.scss";

//料金が安い順高い順並び替え
const RoomSearchSoart = ({
  SetRooms,descClick, setDescClick, ascClick, setAscClick
}: any) => {
  // const dispatch = useDispatch();
  // const descEl = useSelector((state: any) => state.gestroom.descClick);
  // const ascEl = useSelector((state: any) => state.gestroom.ascClick);
  const soartData = collection(db, "gestRoomType");

  const onAscSort = async () => {
    const priceAsc = query(soartData, orderBy("price"), limit(3));
    const data = await getDocs(priceAsc);
    const newAscData = data.docs.map((doc) => ({
      ...doc.data(),
    }));
    // dispatch(setAscclick(false))
    // dispatch(setDescclick(false))
    setAscClick(true);
    setDescClick(false);

    SetRooms(newAscData);
  };

  const onDescSort = async () => {
    const priceDesc = query(soartData, orderBy("price", "desc"), limit(3));
    const data = await getDocs(priceDesc);
    const newDescData = data.docs.map((doc) => ({
      ...doc.data(),
    }));
    setDescClick(true);
    setAscClick(false);
    // dispatch(setDescclick(false))
    // dispatch(setAscclick(false))

    SetRooms(newDescData);
  };
 
  return (
    <>
      <div className={RoomStyle.soartStyle}>
        <button onClick={onAscSort}>料金が安い順</button>
        <button onClick={onDescSort}>料金が高い順</button>
      </div>
    </>
  );
};

export default RoomSearchSoart;
import RoomStyle from "../../styles/rooms/_Gestroom.module.scss";
import { query, collection, getDocs, orderBy, limit } from "firebase/firestore";
import db from "../../Firebase";
import { useEffect, useState } from "react";

//料金が安い順高い順並び替え

const RoomSearchSoart = ({onClick}:any) => {
  const [descSoarts, SetDescSoart] = useState<any>([]);
  const [ascSoarts, SetAscSoart] = useState<any>([]);
  const soartData = collection(db, "gestRoomType");

  const onAscSoart = ({onClick}:any) => {
    const priceAsc = query(soartData, orderBy("price"));
    getDocs(priceAsc).then((snapShot) => {
      SetAscSoart(snapShot.docs.map((doc) => ({ ...doc.data() })));
      ascSoarts.map((soartAsc: any) => soartAsc);
    });
  };
  const onDescSoart = () => {
    const priceDesc = query(soartData, orderBy("price", "desc"), limit(4));
    getDocs(priceDesc).then((snapShot) => {
      SetDescSoart(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  };
  return (
    <>
      <div className={RoomStyle.soartStyle}>
        <button onClick={onClick}>料金が安い順</button>
        {/* <button onClick={() => onAscSoart()}>料金が高い順</button> */}
      </div>
    </>
  );
};

export default RoomSearchSoart;
function onDescSoart(): void {
  throw new Error("Function not implemented.");
}

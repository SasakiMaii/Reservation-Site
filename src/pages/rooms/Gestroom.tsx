import RoomSearchSoart from "../../components/rooms/RoomSearchSoart";
import RoomStyle from "../../styles/rooms/_Gestroom.module.scss";
import PrimaryButton from "../../components/button/PrimaryButton";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
import { Link } from "react-router-dom";
import PagingStyle from "../../styles/rooms/_Paging.module.scss";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
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
} from "firebase/firestore";

const GestroomPlan = () => {
  return (
    <>
      <Header />
      <p className={RoomStyle.pageTitle}>全ての客室＆プラン</p>
      <div className={RoomStyle.roomLinkWrapper}>
        <Link to={"#"} className={RoomStyle.roomLink}>
          {" "}
          客室{" "}
        </Link>
        <Link to={"/rooms/Plan"}> プラン </Link>
      </div>
      <RoomCard />
      {/* <Pageing /> */}
      <Footer />
    </>
  );
};

//部屋の詳細
export const RoomCard = () => {
  const [rooms, SetRoom] = useState<any>([]);
  const [descClick,setDescClick]=useState(false);
  const [ascClick,setAscClick]=useState(false);
  const soartData = collection(db, "gestRoomType");
  const navigation = useNavigate()


  useEffect(() => {
    // const roomDate = collection(db, "gestRoomType");
    const roomDate =query(soartData,orderBy("price"),limit(3));
    getDocs(roomDate).then((snapShot) => {
      SetRoom(snapShot.docs.map((doc) => ({ ...doc.data() })));
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
    SetRoom(newAscData);
  };

  const onDescSort = async () => {
    const priceDesc = query(soartData, orderBy("price", "desc"), limit(3),);
    const data = await getDocs(priceDesc);
    const newDescData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setDescClick(true);
    setAscClick(false);
    SetRoom(newDescData);
  };
  //---

  //予約ボタン
  const handleResarvedRoomBtn = async () => {};

  //次のページへ進むボタン。ソートボタンがクリックされていた場合は、料金順でページングになるように。
  console.log(descClick)
  console.log(ascClick)
  const handleNextPage = async () => {
    if(descClick===true){
      const priceDesc = query(soartData, orderBy("price","desc"), limit(3));
      const data = await getDocs(priceDesc);
      const last = data.docs[data.docs.length - 1];
      const next = query(soartData, orderBy("price","desc"), startAfter(last), limit(3));
      const nextdata =await getDocs(next)
      const nextPage = nextdata.docs.map((doc)=>({
        ...doc.data(),id:doc.id
      }))
      // console.log(nextPage)
      SetRoom(nextPage)
    }else if(ascClick===true){
      const priceDesc = query(soartData, orderBy("price"), limit(3));
      const data = await getDocs(priceDesc);
      const last = data.docs[data.docs.length - 1];
      const next = query(soartData, orderBy("price"), startAfter(last), limit(3));
      const nextdata =await getDocs(next)
      const nextPage = nextdata.docs.map((doc)=>({
        ...doc.data()
      }))
      // console.log(nextPage)

      SetRoom(nextPage)
    }else{
      const priceDesc = query(soartData, orderBy("price"), limit(3));
      const data = await getDocs(priceDesc);
      const last = data.docs[data.docs.length - 1];
      const next = query(soartData, orderBy("price"), startAfter(last), limit(3));
      const nextdata =await getDocs(next)
      const nextPage = nextdata.docs.map((doc)=>({
        ...doc.data()
      }))
      // console.log(nextPage)

      SetRoom(nextPage)
    }
  };
  //前のページに戻るボタン
  const handlePrevPage =async () => {
    //安い順の時はこれでちゃんと戻れる
    if(descClick===true){
      const priceDesc = query(soartData, orderBy("price", "desc"), limit(3),);
      const data = await getDocs(priceDesc);
      const newDescData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      SetRoom(newDescData)
    }else{
      const p = query(soartData, orderBy("price"), limit(4));
      const data = await getDocs(p);
      const descPrev = data.docs[data.docs.length - 1];
      const next = query(soartData, orderBy("price"), endBefore(descPrev), limit(3));
      const descPrevdata =await getDocs(next)
      const prevPage = descPrevdata.docs.map((doc)=>({
        ...doc.data()
      }))
      SetRoom(prevPage)
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
                      ¥{room.price}
                      <span>〜/人</span>
                    </p>
                  </div>
                </div>
                <div className={RoomStyle.ResarvedRoomBtn}>
                  <PrimaryButton onClick={handleResarvedRoomBtn}>
                    空室を探す
                  </PrimaryButton>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={PagingStyle.pagingWrapper}>
        {<button onClick={handlePrevPage}>前へ</button>}
        <button onClick={handleNextPage}>次へ</button>
        <p className={PagingStyle.pagingdetail}>全2ページ</p>
      </div>
    </>
  );
};

export default GestroomPlan;

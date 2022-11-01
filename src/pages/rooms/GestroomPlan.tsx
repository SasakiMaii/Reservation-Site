import Pageing from "../../components/rooms/Pageing";
import RoomSearchSoart from "../../components/rooms/RoomSearchSoart";
import  RoomStyle  from "../../styles/rooms/GestroomPlan.module.scss"

const GestroomPlan = () => {
  return (
    <>
      <p className={RoomStyle.pageTitle}>~全ての客室＆プラン~</p>
      <RoomSearchSoart />
      <RoomCard />
      <Pageing />
    </>
  );
};

//部屋の詳細＆プランの詳細
export const RoomCard = () => {
  return (
    <div className={RoomStyle.roomCard}>
      <ul>
        {/* map使って回す */}
        <li>
          <div className={RoomStyle.cardTitle}>
            <h1 className={RoomStyle.roomName}>east room</h1>
            <p className={RoomStyle.roomArea}>14-15m2</p>
          </div>
          <div className={RoomStyle.detailContainer}>
          <img className={RoomStyle.roompic} src="hotel-4.jpg" alt="roompicture" />
          <div className={RoomStyle.roomDetails}>
            <p className={RoomStyle.roomCapacity}>定員1-2名</p>
            <p className={RoomStyle.bedType}>ベッドタイプ｜セミダブル</p>
            <p className={RoomStyle.roomEquipmentTitle}>【客室室内設備】</p>
            <p className={RoomStyle.roomEquipment}>
              32～40インチテレビ / 竹製 歯ブラシ / 歯磨き粉 / シャンプー /
              コンディショナー ボディーソープ / ハンドソープ / パジャマ /
              スリッパ アロマディフューザー / ヘアドライヤー / 空気清浄機 /
              冷蔵庫 金庫 / 電気ケトル / Wi-Fi
            </p>
            <p className={RoomStyle.roomPrice}>¥20,000<span>~/人</span></p>
          </div>
          </div>
          <h2 className={RoomStyle.sectionTitle}>プラン</h2>
          <hr />
          <div className={RoomStyle.planDetails}>
            <img className={RoomStyle.planpic} src="hotel-4.jpg" alt="planpicture" />
            <p className={RoomStyle.plantitle}>プラン名</p>
            <button className={RoomStyle.planReserveBtn}>このプランで予約</button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GestroomPlan;

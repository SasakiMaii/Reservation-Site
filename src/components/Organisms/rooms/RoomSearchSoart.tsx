import RoomStyle from "../../../styles/rooms/_Gestroom.module.scss";

//料金が安い順高い順並び替え
const RoomSearchSoart = ({ onDescClick, onAscClick }: any) => {

  return (
    <>
      <div className={RoomStyle.soartStyle}>
        <button onClick={onAscClick}>料金が安い順</button>
        <button onClick={onDescClick}>料金が高い順</button>
      </div>
    </>
  );
};

export default RoomSearchSoart;


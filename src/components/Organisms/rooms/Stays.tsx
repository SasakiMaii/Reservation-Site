import RoomDetailStyle from "../../../styles/rooms/_RoomDetails.module.scss";

const Stays = (props: any) => {
  const { setNum } = props;
  return (
    <>
      <div className={RoomDetailStyle.detaildate}>
        <p className={RoomDetailStyle.count}>宿泊日数</p>
        <select
          name="people"
          id="people"
          onChange={(e: any) => setNum(e.target.value)}
        >
          <option value="1">1泊</option>
          <option value="2">2泊</option>
          <option value="3">3泊</option>
          <option value="4">4泊</option>
          <option value="5">5泊</option>
        </select>
      </div>
    </>
  );
};

export default Stays

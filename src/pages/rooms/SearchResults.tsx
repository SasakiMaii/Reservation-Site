import { Link } from "react-router-dom";
import RoomSearchSoart from "../../components/rooms/RoomSearchSoart";
import Pageing from "../../components/rooms/Pageing";

const SearchResults = () => {
  return (
    <>
      <p>・・・空室検索</p>
      <RoomSearchSoart/>
      <Pageing/>
      <Link to={`/`}>ホームに戻る</Link>
    </>
  );
};


export default SearchResults;

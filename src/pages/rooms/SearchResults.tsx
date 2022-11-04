import { Link } from "react-router-dom";
import RoomSearchSoart from "../../components/rooms/RoomSearchSoart";
import Pageing from "../../components/rooms/Pageing";
import Header from "../../components/layout/Header";
import SearchResultsStyle from "../../styles/rooms/_SearchResult.module.scss";

const SearchResults = () => {
  return (
    <>
      <Header />
      <p className={SearchResultsStyle.searchReasults}>・・・空室検索結果</p>
      <RoomSearchSoart />
      <p className={SearchResultsStyle.searchReasultEmpty}>現在空室はありません</p>
      <Pageing />
      <Link to={`/`}>ホームに戻る</Link>
    </>
  );
};

export default SearchResults;

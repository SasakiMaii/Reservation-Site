import { Link } from "react-router-dom";

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

export const RoomSearchSoart = () => {
  return (
    <div>
    <button>おすすめ順</button>
    <button>料金が安い順</button>
    <button>料金が高い順</button>
    </div>
  )
};

export const Pageing = () => {
  return(
    <div>
    <button>1</button>
    <button>2</button>
    <button>3</button>
    <p>全3ページ</p>
    </div>
  )
};



export default SearchResults;

import { Link } from "react-router-dom";

const SearchResults = () => {
  return (
    <>
      <p>・・・空室検索</p>
      <RoomSearchSoart/>
      <RoomCard/>
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

export const RoomCard = () => {
  return (
    <ul>
      {/* map使って回す */}
      <li>
        <div>
        <h1>east room</h1>
        <p>14-15m2</p>
        </div>
        <img src="#" alt="roompicture" />
        <div>
          <p>定員1-2名</p>
          <p>ベッドタイプ｜セミダブル</p>
          <p>【客室室内設備】</p>
          <p>
            32～40インチテレビ / 竹製 歯ブラシ / 歯磨き粉 / 綿棒 / コットン /
            化粧水セット / 洗顔セット 竹製 ヘアくし / シャンプー /
            コンディショナー ボディーソープ / ハンドソープ / パジャマ / スリッパ
            アロマディフューザー / ヘアドライヤー / 空気清浄機 / 冷蔵庫 金庫 /
            電気ケトル / 壁掛式Bluetoothスピーカー / Wi-Fi
          </p>
          <p>¥20,000~/人</p>
        </div>
        <h2>プラン</h2>
        <hr />
        <div>
        <img src="#" alt="planpicture" />
        <p>プラン名</p>
        <button>このプランで予約</button>
        </div>
      </li>
    </ul>
  );
};

export default SearchResults;

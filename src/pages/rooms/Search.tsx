import { Link } from "react-router-dom";

const RoomSearch = () => {
  return (
  <>
  <Link to={'/'}>ご予約内容の確認・変更・取り消し</Link>
  <p>Prince`VuewHotel</p>
  <Checkin/>
  <ObsessionSearch/>
  <SearchButton/>
  </>
  );
};

// コンポーネント

export const Checkin = () => {
  return(
    <div>
    <div>
    <p>チェックイン日</p>
    <button>日程未定</button>
    </div>
    <div>
      {/* 宿泊人数の上限を超えていますのエラーを出す */}
      <p>大人</p>
      <input type="text" placeholder="人数未定" />
    </div>
    <div>
      <p>子供（小学生以下のお子様）</p>
      <input type="text" placeholder="人数未定" />
    </div>
    </div>
  );
};

// {(()=>{

// })}

//こだわり条件
export const ObsessionSearch = () => {
  
  return(
    <>
    {/* mapでデータとってくる？ */}
    <div>
    <p>客室の種類</p>
    <select name="gestroom" id="gestroom">
    <option value="#" selected>指定なし</option>
    <option value="north">north</option>
    <option value="north">south</option>
    <option value="north">west</option>
    <option value="north">east</option>
    </select>
    </div>
    <div>

    </div>
    <p>一室もしくは１人あたりの１泊宿泊料金</p>
    <select name="downprice" id="downprice">
    <option value="#" selected>下限なし</option>
      <option value="">45,000円~</option>
      <option value="">40,000円~</option>
      <option value="">35,000円~</option>
      <option value="">30,000円~</option>
      <option value="">25,000円~</option>
      <option value="">20,000円~</option>
      <option value="">15,000円~</option>
      <option value="">10,000円~</option>
    </select>
    <select name="upprice" id="uprice">
    <option value="#" selected>上限なし</option>
      <option value="">~100,000円</option>
      <option value="">~90,000円</option>
      <option value="">~80,000円</option>
      <option value="">~70,000円</option>
      <option value="">~60,000円</option>
      <option value="">~50,000円</option>
      <option value="">~40,000円</option>
      <option value="">~35,000円</option>
      <option value="">~30,000円</option>
      <option value="">~25,000円</option>
      <option value="">~20,000円</option>
      <option value="">~15,000円</option>
      <option value="">~10,000円</option>
    </select>
    </>
  );
};

export const SearchButton = () => {
  return(
    <>
    <button>検索</button>
    </>
  );
};

export default RoomSearch;

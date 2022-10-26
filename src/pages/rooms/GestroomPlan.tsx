import { Pageing, RoomSearchSoart } from "./SearchResults";

const GestroomPlan=()=>{
  return(
    <>
    <p>全ての客室＆プラン</p>
    <RoomSearchSoart/>
    {/* 検索結果に応じてroomcardを表示させる */}
    <Pageing/>
    </>
  )
}


export default GestroomPlan;
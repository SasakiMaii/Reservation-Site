import React from "react";
import  RoomStyle  from "../../styles/rooms/_GestroomPlan.module.scss"
import Header from "../layout/Header";

const RoomSearchSoart = () => {
  return (
    <>
    <div className={RoomStyle.soartStyle}>
    <button>おすすめ順</button>
    <button>料金が安い順</button>
    <button>料金が高い順</button>
    </div>
   </>
  )
};

export default RoomSearchSoart;
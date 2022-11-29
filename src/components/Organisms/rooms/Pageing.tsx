import { collection, getDoc, getDocs } from "firebase/firestore";
import React, { Children, useState } from "react";
import db from "../../../Firebase";
import  PagingStyle  from "../../../styles/rooms/_Paging.module.scss"

//昇順降順そのままでページ遷移、後でコンポーネント記述

// const handleNextPage =async () => {
//   setLoding(true);
//   const priceDesc = query(soartData, orderBy("price", "desc"), limit(3));
//   const data = await getDocs(priceDesc);
//   const last =data.docs[data.docs.length-1]
//   const next=query(soartData,orderBy("price"),startAfter(last),limit(3))
// };
// const handlePrevPage = () => {
//   setLoding(true);
// };

const Pageing = () => {



  return(
    <>
    <div className={PagingStyle.pagingWrapper}>
    {/* <button onClick={handlePrevPage}>前へ</button>
    <button onClick={handleNextPage}>次へ</button> */}
    <p className={PagingStyle.pagingdetail}>全2ページ</p>
    </div>
    </>
  )
};

export default Pageing;
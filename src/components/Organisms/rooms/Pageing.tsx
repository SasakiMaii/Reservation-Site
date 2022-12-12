import { collection, getDoc, getDocs } from "firebase/firestore";
import React, { Children, useState } from "react";
import db from "../../../Firebase";
import  PagingStyle  from "../../../styles/rooms/_Paging.module.scss"

const Pageing = ({onPrevClick,onNextClick}:any) => {



  return(
    <>
    <div className={PagingStyle.pagingWrapper}>
    <div className={PagingStyle.pagingWrapper}>
          <button onClick={onPrevClick}>1</button>
          <button onClick={onNextClick}>2</button>・・
        </div>
    <p className={PagingStyle.pagingdetail}>全2ページ</p>
    </div>
    </>
  )
};

export default Pageing;
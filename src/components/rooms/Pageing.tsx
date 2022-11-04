import React from "react";
import  PagingStyle  from "../../styles/rooms/_Paging.module.scss"

const Pageing = () => {
  return(
    <div className={PagingStyle.pagingWrapper}>
    <button>1</button>
    <button>2</button>
    <p className={PagingStyle.pagingdetail}>全2ページ</p>
    </div>
  )
};

export default Pageing;
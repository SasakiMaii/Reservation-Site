import React, { useState, useEffect, useRef, createRef } from 'react';
import style from "../../styles/top/_Top.module.scss"
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import { Link as Scroll } from "react-scroll";

import 'firebase/auth';
import "../../Firebase"
import db, { storage } from "../../Firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { async } from '@firebase/util';
import { any } from 'prop-types';


// AOS.js
import Aos from 'aos';
import 'aos/dist/aos.css';

export const RoomsIntroduction = () => {

  const [posts, SetPosts] = useState<any>([]);
  const pathList: any = []

  // firebaseからplanデータを取得　関数
  const getRoomData = () => {
    const postDate = collection(db, "gestRoomType");
    getDocs(postDate).then((snapShot) => {
      SetPosts(snapShot.docs.map((doc) => ({ ...doc.data() })))
    })


  }

  // postの中身がなければ、firebaseからデータを取得
  if (posts.length === 0) {
    getRoomData();
  }


  // storageから画像を取得
  // アクセストークンをPlanのimageの中に入れてます。
  posts.map((data: any, index: number) => {
    pathList.push(data.image)
  })


  Aos.init();
  return (
    <>
    <div className={style.test2wrapper}>
        <section className={style.test2}  >
          <div className={style.roomsImagePicWrapper}>
        <img className={style.roomsImagePic} width={300} height={300} src="/topImage/flower2.png" alt="flowerPicture" />
          <h2 >お部屋紹介</h2>
          </div>
          {posts.map((data: any, index: number) => {
            if (index % 2 === 0) {
              return (
                <div className={style.roomsIntroductionCols} 
                data-aos="zoom-out-right"
                data-aos-easing="linear"
                data-aos-duration="1000"
                data-aos-anchor-placement="bottom-bottom"
                key={index}
                >
                  <img src={data.image} alt="" className={style.roomsIntroductionImgae} />
                  <div className={style.roomsIntroductionSentence}>
                    <h3 className={style.roomsIntroductionTitle}>{data.area}</h3>
                    <p className={style.roomsIntroductionInformation}>{data.bedType}</p>
                    <p className={style.roomsIntroductionInformation}>{data.roomFacility}</p>
                  </div>
                </div>
              )
            } else {
              return (
                <div className={style.roomsIntroductionCols}
                data-aos="zoom-out-left"
                data-aos-easing="linear"
                data-aos-duration="1000"
                data-aos-anchor-placement="bottom-bottom"
                key={index}
                >
                  <div className={style.roomsIntroductionSentence}>
                    <h3 className={style.roomsIntroductionTitle}>{data.area}</h3>
                    <p className={style.roomsIntroductionInformation}>{data.bedType}</p>
                    <p className={style.roomsIntroductionInformation}>{data.roomFacility}</p>
                  </div>
                  <img src={data.image} alt="" className={style.roomsIntroductionImgae} />
                </div>
              )
            }
          })}
        </section>
    </div>

    </>
  )

}

export default RoomsIntroduction

import React, { useState, useEffect, useRef, createRef } from 'react';
import style from "../../styles/top/_Top.module.scss"
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Link as Scroll } from "react-scroll";
import "../../styles/top/_swiperNavigation.module.scss";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';

import "swiper/css/bundle";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import 'firebase/auth';
import "../../Firebase"
import db, { storage } from "../../Firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { async } from '@firebase/util';
import { any } from 'prop-types';

SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

export const PlanRecomendSwiper = () => {

  const [posts, SetPosts] = useState<any>([]);
  const pathList: any = []

  // firebaseからplanデータを取得　関数
  const getRoomData = () => {
    const postDate = collection(db, "Plan");
    getDocs(postDate).then((snapShot) => {
      SetPosts(snapShot.docs.map((doc) => ({ ...doc.data() })))
    })


  }

  // postの中身がなければ、firebaseからデータを取得
  if (posts.length === 0) {
    getRoomData();
  }


  // storageから画像を取得
  // アクセストークン付きURLをPlanのimageの中に入れてます。
  posts.map((data: any, index: number) => {
    pathList.push(data.image)
  })

  return (
    <>
        <section className={style.recommendPlanSection} id="concept">
        <div className={style.roomsImagePicWrapper}>
        <img className={style.roomsImagePic} width={300} height={300} src="topImage/flower1.png" alt="flowerPicture" />
          <h2>おすすめプラン</h2>
        </div>
          <div
            className={style.swiperBody}
          >
            <Swiper
              slidesPerView={2}  // 〇枚表示
              centeredSlides={true}  // スライドをセンター
              autoplay={{ 
                delay: 3000, 
                disableOnInteraction: true
                // pauseOnMouseEnter: true, 
              }}  // 自動スライド　focusされると止まる
              navigation={true}
              speed={1000}
              loop={true}
              modules={[Pagination]}
              spaceBetween={10}
              // スライドが切り替わるたび実行される。
              // onSlideChange={(swiper) => console.log('スライドが変更されました。')}
              // スライドが表示された最初の1回に実行されます。
              // onSwiper={(swiper) => console.log('スライドが生成されました')}
              className={`${style.swiperColsFrame} mySwiper`}  // .mySwiperでスタイル変更
            >

              {posts.map((data: any, index: number) => {
                return (
                  <SwiperSlide key={index} >
                    <div className={style.swiperCols}>
                      <img src={pathList[index]} alt={data.name} className={style.swiperPlanImage} />
                      <div className={style.swiperPlanSentenceGroup}>
                        <h3 className={style.swiperPlanTitle}>{data.name}</h3>
                        <p className={style.swiperPlanInformation}>{data.planDetail}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })
              }

            </Swiper>
          </ div>
        </section>

    </>
  )

}

export default PlanRecomendSwiper

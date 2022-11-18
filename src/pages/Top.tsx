import React, { useState, useEffect } from 'react';
import style from "../styles/_Top.module.scss"
import scrollImage from "../topMaterial/scroll.png";
import "./swiperNavigation.module.scss"


// yarn add @types/react-scrollしてください！

import { Link as Scroll } from "react-scroll";

// yarn add @types/swiperしてください！
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay } from 'swiper'

import "swiper/css/bundle"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

export const Top = () => {

  const images = ["../../public/topImage/sofa.jpg", "../../public/topImage/sofa.jpg", "../../public/topImage/sofa.jpg"];
  // const scrollImage = "../../public/topMaterial/scroll.png"

  return (
    <>
      <header className={style.topImage}>
        <p className={style.hotelName} data-aos="fade-up">Prince'Vuew Hotel</p>
        {/* スクロールのスピード　 durationで設定*/}
        <Scroll to="concept" smooth={true} duration={2000} offset={0}>
          <img src={scrollImage} alt="矢印" className={style.scrollImage} />
        </Scroll>
      </header>

      <main>
        <section className={style.test} id="concept">
          <h2>おすすめプラン</h2>
          <div
            className={style.swiperBody}
          >
            <Swiper
              slidesPerView={3}  // ４枚表示
              centeredSlides={true}  // スライドをセンター
              autoplay={{ delay: 3000, disableOnInteraction: true, pauseOnMouseEnter: true, }}  // 自動スライド　focusされると止まる
              navigation={true}  
              speed={1000}
              loop={true}
              modules={[Pagination]}
              spaceBetween={10}
              // スライドが切り替わるたび実行される。
              onSlideChange={(swiper) => console.log('スライドが変更されました。')}
              // スライドが表示された最初の1回に実行されます。
              onSwiper={(swiper) => console.log('スライドが生成されました')}
              className={`${style.swiperColsFrame} mySwiper`}  // .mySwiperでスタイル変更
            >
              <SwiperSlide>
                <div className={style.swiperCols}>1</div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={style.swiperCols}>2</div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={style.swiperCols}>3</div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={style.swiperCols}>4</div>
              </SwiperSlide>

            </Swiper>
          </ div>
        </section>


      </main>
    </>
  )

}

export default Top

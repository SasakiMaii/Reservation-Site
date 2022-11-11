import React, { useState, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
// import { ItemCardsWrap } from "components/itemCards-wrap";
// import { SearchForm } from "components/searchForm"
// import { Loader } from "components/loader";
// import RecognizeList from "components/recognizeList";
// import { Calendar } from "components/calendar";
// import { Information } from "components/Information";
// import { Map } from "components/map";
// import { NewItemsSection, RecognizeItesSection ,ItemsSection} from "components/topItemListSection";
// import { SearchNavigationbar } from "components/searchNavigationbar";
// import { Slide } from "components/swiper";
// import style from "../styles/swiper.module.css"
// import SwiperCore, { Pagination, Autoplay, EffectFade } from 'swiper';
import { EffectFade } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import style from "../styles/Top.module.css"
import styleSwiper from "../styles/swiper.module.css"
// import  "../styles/swiper.module.css"


import Swiper from "react-id-swiper";
import { Autoplay, Swiper as RealSwiper } from "swiper";
RealSwiper.use([Autoplay]);

// SwiperCore.use([Pagination, EffectFade, Autoplay])



// const fetcher = (url: any) => fetch(url).then((res) => res.json());

export const Top = () => {

  // const params = {
  //   // slidesPerView: 1,
  //   slidesPerView: 1,
  //   // spaceBetween: 0,
  //   centeredSlides: true,
  //   autoplay: {
  //     delay: 3000,
  //     disableOnInteraction: false
  //   },
  //   pagination: {
  //     el: '.swiper-pagination',
  //     dynamicBullets: true,
  //     clickable: true
  //   },
  //   loop: true,
  //   speed: 8000,
   
  // }

  // return (
  //   <>

  //     <div className={`${styleSwiper.main}`} >

  //       <Swiper {...params} >
  //         <SwiperSlide key="1"> <img src="hotel-4.jpg" alt=""  /></SwiperSlide>
  //         <SwiperSlide key="3"><img src="hotel-4.jpg" alt="" /></SwiperSlide>
  //       </Swiper>

  //     </div>
    // </>
  // );


return (
  <>
  <div className={`${styleSwiper.main}`} >
     <img src="hotel-4.jpg" alt=""  className={`${styleSwiper.topImage}`}/>
  </div>
  
  <section>
   <div><p>ホテルです</p></div>
   <div><img src="hotel-4.jpg" alt=""  className={``}/></div>
  </section>
  <section>


  </section>
  </>
)

}

export default Top;

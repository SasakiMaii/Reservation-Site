/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../layout/Header";
import RoomsIntroduction from "../Organisms/RoomIntroductionSection";
import { PlanRecomendSwiper } from "../Organisms/PlanRecomendSwiper";
import Access from "../Organisms/Access";
import TopHeader from "../Organisms/TopHeader";
import Footer from "../layout/footer";

import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Head from "../layout/Head";
import News from "../Organisms/News";

export const TopLayout = () => {
  return (
    <>
      <Head
        title="PrinceViewHotel-TOP"
        description="ホテルの予約サイトです。-PrinceViewHotel-"
      />
      <Header />
      <TopHeader />
      <main>
        <PlanRecomendSwiper />
        <RoomsIntroduction />
        <News />
        <Access />
      </main>
      <Footer />
    </>
  );
};

export default TopLayout;

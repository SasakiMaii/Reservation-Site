import Header from "../layout/Header";
import RoomsIntroduction from '../Organisms/RoomIntroductionSection';
import { PlanRecomendSwiper } from '../Organisms/PlanRecomendSwiper';
import Access from '../Organisms/Access';
import TopHeader from '../Organisms/TopHeader';
import Footer from '../layout/footer';

// [お願い]
// yarn add --dev react-scroll
// yarn add @types/react-scroll
// yarn add aos
// yarn add @types/aos
// yarn add swiper
// yarn add @types/swiperしてください！


import "swiper/css/bundle"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Head from "../layout/Head";


export const TopLayout = () => {

  return (
    <>
    <Head title="PrinceViewHotel-TOP" description="ホテルの予約サイトです。-PrinceViewHotel-"/>
      <Header />
      <TopHeader />
      <main>
        <PlanRecomendSwiper />
        <RoomsIntroduction />
        <Access />
      </main>
      <Footer />
    </>
  )

}

export default TopLayout;

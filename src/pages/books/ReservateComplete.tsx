import ReservateCompleteStyles from "../../styles/books/_ReservateComplete.module.scss";

import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";
import DeleteModal from "../../components/books/DeleteModal";
import Head from "../../components/layout/Head";

const ReservateComplete = () => {
  return (
    <>
      <Head title="PrinceViewHotel-予約完了" description="ホテルの予約サイトです。-PrinceViewHotel-"/>
      <Header />
      <div className={ReservateCompleteStyles.reservateComplete}>
        <h1>予約完了しました</h1>
        <p>
          ご予約いただきありがとうございます。
          <br />
          詳細につきましては、ご予約時のメールアドレスにお送りいたします。
        </p>
        <div className={ReservateCompleteStyles.link}>
          <Link to="/rooms/Gestroom">お買い物を続ける</Link>
        </div>
      </div>
      {/* <DeleteModal /> */}
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default ReservateComplete;

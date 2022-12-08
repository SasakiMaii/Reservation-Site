import ReservateCompleteStyles from "../../styles/books/_ReservateComplete.module.scss";

import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";

const ReservateComplete = () => {
  return (
    <>
      <Header />
      <div className={ReservateCompleteStyles.reservateComplete}>
        <h1>予約完了しました</h1>
        <p>
          ご予約いただきありがとうございます。
          <br />
          詳細につきましては、ご予約時のメールアドレスにお送りいたします。
        </p>
        <div className={ReservateCompleteStyles.link}>
          <Link to="/rooms/Gestroom">客室・プラン検索に戻る</Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReservateComplete;

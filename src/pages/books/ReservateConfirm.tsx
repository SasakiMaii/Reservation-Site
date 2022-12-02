import { ReservateConfirmContents } from "../../components/books/ReservateConfirmContents";
import ReservateConfirmStyles from "../../styles/books/_ReservateConfirm.module.scss";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer";

const ReservateConfirm = () => {
  return (
    <>
      <Header />
      <div className={ReservateConfirmStyles.reservateConfirmContainer}>
        <h1 className={ReservateConfirmStyles.reservateConfirmTitle}>
          予約内容の確認
        </h1>
        <p className={ReservateConfirmStyles.confirmMessage}>
          (必須項目の入力)
        </p>
        <div>
          <ReservateConfirmContents />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReservateConfirm;

import ReservateCompleteStyles from "../../styles/books/_ReservateComplete.module.scss";

import { Link } from "react-router-dom";

const ReservateComplete = () => {
  return (
    <>
      <div className={ReservateCompleteStyles.reservateComplete}>
        <h1>予約完了しました</h1>
        <p>
          ご予約いただきありがとうございます。<br />詳細につきましては、ご予約時のメールアドレスにお送りいたします。
        </p>
        <div className={ReservateCompleteStyles.link}>
        <Link to="/rooms/Gestroom">お買い物を続ける</Link>
        </div>
      </div>
    </>
  );
};

export default ReservateComplete;

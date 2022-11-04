import { Link } from "react-router-dom";

const ReservateComplete = () => {
  return (
    <>
      <h1>予約完了しました</h1>
      <p>
        ご予約いただきありがとうございます。詳細につきましては、ご予約時のメールアドレスにお送りいたします。
      </p>
      <Link to="/books/ReservateConfirm">戻る</Link>
    </>
  );
};

export default ReservateComplete;

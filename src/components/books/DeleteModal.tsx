import { useNavigate } from "react-router-dom";
import ReservateConfirmContentsStyles from "../../styles/books/_ReservateConfirmContents.module.scss";

const DeleteModal = (props:any) => {
  const {setOpenModal} = props;

  const navigate = useNavigate();

  const clickYes = () => {
    navigate("/rooms/GestRoom");
  }

  const clickNo = () => {
    setOpenModal(false);
  }

  return (
    <div className={ReservateConfirmContentsStyles.modalStyle}>
      <div className={ReservateConfirmContentsStyles.modalContent}>
        <p>予約せずに戻ります。よろしいですか？</p>
        <p>※仮予約中の内容は保存されず削除されます</p>
        <button onClick={clickYes}>はい</button>
        <button onClick={clickNo}>いいえ</button>
      </div>
    </div>
  );
};


export default DeleteModal;

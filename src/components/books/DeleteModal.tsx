import { useNavigate } from "react-router-dom";

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
    <div style={modalStyle}>
      <div style={modalContent}>
        <p>予約せずに戻ります。よろしいですか？</p>
        <p>※仮予約中の内容は保存されず削除されます</p>
        <button onClick={clickYes}>はい</button>
        <button onClick={clickNo}>いいえ</button>
      </div>
    </div>
  );
};

const modalContent: React.CSSProperties = {
    background: "white",
    width: "700px",
    height: "300px",
    padding: "50px",
    borderRadius: "3px",
  };
  
  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex:100
  };

export default DeleteModal;

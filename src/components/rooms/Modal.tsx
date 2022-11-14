import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Modal = ({showFlag,setShowModal}:any) => {
const closeModal=()=>{
  setShowModal(false);
}
  return (
  <>
{showFlag?(
  <>
        <div style={modalStyle}>
          <div style={modalContent}>
          <h1>チェックイン日</h1>
          <hr />
          <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
          <input type="checkbox" name="check" id="check" />宿泊日未定
          <p>宿泊数</p>
          <select name="" id="">
            <option value="">1泊</option>
            <option value="">2泊</option>
            <option value="">3泊</option>
            <option value="">4泊</option>
          </select>
          <p>室数</p>
          <select name="" id="">
            <option value="">1室</option>
            <option value="">2室</option>
            <option value="">3室</option>
            <option value="">4室</option>
          </select>
          <hr />
          <button onClick={closeModal}>CLOSE</button>
          </div>
        </div>
  </>
):(
  <></>
)}
  </>
  );
};

//モーダルのスタイル
const modalContent: React.CSSProperties = {
  background: "white",
  width:"600px",
  height:"700px",
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
};

export default Modal;



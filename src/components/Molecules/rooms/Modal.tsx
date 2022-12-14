import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import SearchStyle from "../../../styles/rooms/_Search.module.scss";
import interactionPlugin from "@fullcalendar/interaction";
import { GrFormDown } from "react-icons/gr";

const Modal = ({
  showFlag,
  setShowModal,
  setShowBtn,
  setDatetext,
  setChecked,
  inputDate,
  setInputDate,
}: any) => {
  
  const closeModal = () => {
    setShowModal(false);
  };

  //「宿泊日未定」にチェックが入っていたら「宿泊日未定」をチェックイン日の下に表示
  const handleChange = (e: any) => {
    if (e.target.checked === true) {
      setChecked(e.target.value);
      setShowBtn(false);
      setInputDate(false);
    }
  };

  const handleDateClick = (arg: any) => {
    if (inputDate === false) {
      arg.dayEl.style.backgroundColor = "steelblue"; //カレンダーに色つける
      setInputDate(true);
      setShowBtn(false); //「日程を選ぶ」ボタンの非表示
      console.log(setDatetext(arg.dateStr));
    } else if (inputDate === true) {
      arg.dayEl.style.backgroundColor = ""; //カレンダーの色を変える
      setInputDate(false);
      // alert(arg.dateStr)
    }
  };


  return (
    <>
      {showFlag ? (
        <>
          <div style={modalStyle}>
            <div style={modalContent}>
              <div className={SearchStyle.closeBtnFlex}>
                <h1 className={SearchStyle.title}>チェックイン日</h1>
                <button className={SearchStyle.closeBtn} onClick={closeModal}>
                  選択して閉じる
                </button>
              </div>
              <hr />
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                locale="ja"
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                selectable={true}
                selectMirror={true}
                businessHours={true}
              />
              <div className={SearchStyle.modalCheckContainer}>
                <input
                  className={SearchStyle.daycheckBox}
                  type="checkbox"
                  name="check"
                  id="check"
                  value="宿泊日未定"
                  onChange={handleChange}
                />
                <label htmlFor="check">宿泊日未定 </label>
              </div>
              <div className={SearchStyle.modalSelectContainer}>
                <div className={SearchStyle.modalSelectcount}>
                  <p>宿泊数</p>
                  <select name="stay" id="stay">
                    <option value="1">1泊</option>
                    <option value="2">2泊</option>
                    <option value="3">3泊</option>
                    <option value="4">4泊</option>
                  </select>
                  <div className={SearchStyle.arrow}><GrFormDown/></div>
                </div>
                <button
                  className={SearchStyle.closeBtnBottom}
                  onClick={closeModal}
                >
                  選択して閉じる
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

//モーダルのスタイル
const modalContent: React.CSSProperties = {
  background: "white",
  width: "600px",
  height: "800px",
  padding: "60px",
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

export default Modal;

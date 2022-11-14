import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import SearchStyle from "../../styles/rooms/_Search.module.scss";
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Modal = ({ showFlag, setShowModal,setShowBtn,setDatetext}: any) => {
  const[inputDate,setInputDate]=useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const handleDateClick = (arg :any) => {
    if(inputDate===false){
      arg.dayEl.style.backgroundColor='steelblue'
      setInputDate(true)
      setShowBtn(false)
      console.log(setDatetext(arg.dateStr))

    }else if(inputDate===true){
      arg.dayEl.style.backgroundColor=''
      setInputDate(false)
      // alert(arg.dateStr)
    }
  }
  const selectDate=(selectionInfo:any)=>{
    console.log('selectionInfo: ', selectionInfo);
    const calendarApi = selectionInfo.view.calendar;
    calendarApi.unselect();
  }


  return (
    <>
      {showFlag ? (
        <>
          <div style={modalStyle}>
            <div style={modalContent}>
              <div className={SearchStyle.closeBtnFlex}>
              <h1 className={SearchStyle.title}>チェックイン日</h1>
              <button className={SearchStyle.closeBtn} onClick={closeModal}>選択して閉じる</button>
              </div>
              <hr />
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                locale='ja'
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                select={selectDate}
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
              />
              <span>宿泊日未定 </span>
              </div>
              <div className={SearchStyle.modalSelectContainer}>
                <div className={SearchStyle.modalSelectcount}>
              <p>宿泊数</p>
              <select name="" id="">
                <option value="1">1泊 ▼</option>
                <option value="2">2泊</option>
                <option value="3">3泊</option>
                <option value="4">4泊</option>
              </select>
                </div>
                <div className={SearchStyle.modalSelectroom}>
              <p>室数</p>
              <select name="" id="">
                <option value="1">1室 ▼</option>
                <option value="2">2室</option>
                <option value="3">3室</option>
                <option value="4">4室</option>
              </select>
                </div>
                <button className={SearchStyle.closeBtnBottom} onClick={closeModal}>選択して閉じる</button>
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

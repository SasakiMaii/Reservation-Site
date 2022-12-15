import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCallback } from "react";

const Calender=(props:any)=>{
  const{inputDate,setInputDate,setDatetext}=props

  const handleDateClick = useCallback((arg: any) => {
    if (inputDate === false) {
      arg.dayEl.style.backgroundColor = "burlywood"; //カレンダーに色つける
      setInputDate(true);
      setDatetext(arg.dateStr);
    } else if (inputDate === true) {
      arg.dayEl.style.backgroundColor = ""; //カレンダーの色を変える
      setInputDate(false);
    }
  },[]);

  return(
    <>
    <FullCalendar
    plugins={[dayGridPlugin, interactionPlugin]}
    locale="ja"
    initialView="dayGridMonth"
    dateClick={handleDateClick}
    selectable={true}
    selectMirror={true}
    businessHours={true}
  />
    </>
  )
}

export default Calender
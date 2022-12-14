import ReservateConfirmContentsStyles from "../../styles/books/_ReservateConfirmContents.module.scss";

export const ArrivalTime = (props: any) => {
    const { selectValueChange, selectItem, selectVal } = props;
  
    return (
      <>
        <div className={ReservateConfirmContentsStyles.checkTime}>
          <label
            htmlFor="arrivalTime"
            className={ReservateConfirmContentsStyles.arrivalText}
          >
            到着時間
          </label>
          <span>必須</span>
          <select
            value={selectVal}
            onChange={selectValueChange}
            className={ReservateConfirmContentsStyles.input}
          >
            {selectItem.map((selects: any, index:number) => {
              return <option value={selects} key={index}>{selects}</option>;
            })}
          </select>
          時
        </div>
      </>
    );
  };

import ReservateConfirmContentsStyles from "../../styles/books/_ReservateConfirmContents.module.scss";

export const ReserveName = (props: any) => {
  const {
    reserveFirstName,
    reserveLastName,
    onChangeReserveFirstName,
    onChangeReserveLastName,
  } = props;

  return (
    <div>
      <input
        type="text"
        value={reserveFirstName}
        onChange={onChangeReserveFirstName}
        placeholder="姓"
        className={ReservateConfirmContentsStyles.input}
      />
      <input
        type="text"
        value={reserveLastName}
        onChange={onChangeReserveLastName}
        placeholder="名"
        className={ReservateConfirmContentsStyles.input}
      />
      <br />
      <input
        type="text"
        placeholder="姓(フリガナ)"
        className={ReservateConfirmContentsStyles.input}
      />
      <input
        type="text"
        placeholder="名(フリガナ)"
        className={ReservateConfirmContentsStyles.input}
      />
    </div>
  );
};

export const LodgerName = (props: any) => {
  const { lodgeFirstName, lodgeLastName, onChangeFirst, onChangeLast } = props;

  return (
    <>
      <br />
      <input
        type="text"
        value={lodgeFirstName}
        onChange={onChangeFirst}
        placeholder="姓"
        className={ReservateConfirmContentsStyles.input}
      />
      <input
        type="text"
        value={lodgeLastName}
        onChange={onChangeLast}
        placeholder="名"
        className={ReservateConfirmContentsStyles.input}
      />
      <br />
      <input
        type="text"
        placeholder="姓(フリガナ)"
        className={ReservateConfirmContentsStyles.input}
      />
      <input
        type="text"
        placeholder="名(フリガナ)"
        className={ReservateConfirmContentsStyles.input}
      />
    </>
  );
};

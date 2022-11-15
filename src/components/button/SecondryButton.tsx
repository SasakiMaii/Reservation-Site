import SearchStyle from "../../styles/rooms/_Search.module.scss";

const SecondryButton = ({ children,onClick }:any) => {
  return (
    <>
      <button onClick={onClick} className={SearchStyle.secondrybtn}>{children}</button>
    </>
  );
};

export default SecondryButton;
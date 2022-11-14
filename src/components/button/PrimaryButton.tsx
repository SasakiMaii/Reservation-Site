import SearchStyle from "../../styles/rooms/_Search.module.scss";

const PrimaryButton = ({ children,onClick }:any) => {
  return (
    <>
      <button onClick={onClick} className={SearchStyle.searchbtn}>{children}</button>
    </>
  );
};

export default PrimaryButton

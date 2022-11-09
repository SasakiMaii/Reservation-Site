import SearchStyle from "../../styles/rooms/_Search.module.scss";

type Props = {
  children: string;
  onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void
};

const PrimaryButton: React.FC<Props> = ({ children,onClick }) => {
  return (
    <>
      <button onClick={onClick} className={SearchStyle.searchbtn}>{children}</button>
    </>
  );
};

export default PrimaryButton

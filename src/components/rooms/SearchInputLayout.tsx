import SearchStyle from "../../styles/rooms/_Search.module.scss";

 const SearchInputLayout = ({value,onChange}:any) => {
  return (
    <>
      <input
        className={SearchStyle.serchInput}
        type="text"
      value={value}
      onChange={onChange}
        placeholder="人数入力"
      />
    </>
  );
};

export default SearchInputLayout
import SearchStyle from "../../../styles/rooms/_Search.module.scss";

 const SearchInputLayout = ({value,onChange,elm}:any) => {
  
  // console.log("a")
  return (
    <>
      <input
        className={SearchStyle.serchInput}
        type="text"
        ref={elm}
      value={value}
      onChange={onChange}
        placeholder="人数入力"
      />
    </>
  );
};

export default SearchInputLayout
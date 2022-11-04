import SearchStyle from "../../styles/rooms/_Search.module.scss";

 const SearchInputLayout = () => {
  return (
    <>
      <input
        className={SearchStyle.serchInput}
        type="text"
        placeholder="人数入力"
      />
    </>
  );
};

export default SearchInputLayout
import { Link } from "react-router-dom";
import { HiOutlineChevronLeft } from "react-icons/hi";

type Props = {
  title?: string;
  path?: any;
  classname?:any;
};

const SecondaryLink: React.FC<Props> = (props) => {
  const { title, path,classname } = props;
  return (
    <>
      <Link to={path} className={classname} >
      <HiOutlineChevronLeft size={25} />{title}
      </Link>
    </>
  );
};

export default SecondaryLink;
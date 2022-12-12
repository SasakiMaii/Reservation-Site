import { Link } from "react-router-dom";
import RoomStyle from "../../styles/rooms/_Gestroom.module.scss";


type Props = {
  title?: string;
  path?: any;
  classname?:any;
};

const PrimaryLink: React.FC<Props> = (props) => {
  const { title, path,classname } = props;
  return (
    <>
      <Link to={path} className={classname} >
        {title}
      </Link>
    </>
  );
};

// className={RoomStyle.reservedCheck}

export default PrimaryLink;

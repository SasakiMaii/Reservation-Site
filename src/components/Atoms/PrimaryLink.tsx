import { Link } from "react-router-dom";


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

import { FC } from "react";
import { Helmet } from "react-helmet-async";

type Props = {
  title?: string;
  description?: string;
  path?: string;
};

const Head:FC<Props>=(props)=>{
  const  { title, description } = props;
  return(
    <>
    <Helmet>
      <title>{title??"PrinceViewHotel"}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
    </>
  )
}

export default Head
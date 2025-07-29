// src/components/shared/CustomHelmet.jsx
import { Helmet } from "react-helmet-async";
import tourismFavicon from "../../assets/tourism.png"; 

const CustomHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="icon" type="image/png" href={tourismFavicon} />
    </Helmet>
  );
};

export default CustomHelmet;

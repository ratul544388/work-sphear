import { Helmet } from "react-helmet-async";

const Title = ({ children }) => (
  <Helmet>
    <title>{children} | WorkSphear</title>
  </Helmet>
);

export default Title;

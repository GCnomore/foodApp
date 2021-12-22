import { Spinner } from "react-bootstrap";
import * as LoadingComp from "./Loading_Component_Styled";

const LoadingComponent = () => {
  return (
    <LoadingComp.LoadingCompCont>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </LoadingComp.LoadingCompCont>
  );
};

export default LoadingComponent;

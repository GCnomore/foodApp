import { Spinner } from "react-bootstrap";

const LoadingComponent = () => {
  return (
    <div>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingComponent;

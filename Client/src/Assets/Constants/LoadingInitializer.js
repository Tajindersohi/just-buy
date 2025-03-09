import { useLoading } from "../../Components/Common/LoadingIndicator";
import { setLoadingInstance } from "./showLoading";

const LoadingInitializer = () => {
  const { showLoading } = useLoading();
  setLoadingInstance(showLoading);
  return null; 
};

export default LoadingInitializer;

import { useNotifier } from "../../Components/Common/Notifier";
import { setNotifierInstance } from "./showNotifier";

const NotifierInitializer = () => {
  const { showNotifier } = useNotifier();
  setNotifierInstance(showNotifier);
  return null; 
};

export default NotifierInitializer;

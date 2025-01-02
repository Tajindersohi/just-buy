import { useNotifier } from "../../Components/Common/Notifier";

export const useNotifierUtils = () => {
  const { showNotifier } = useNotifier();

  const success = (msg, duration = 2000) => {
    showNotifier({ type: 'success', msg, duration });
  };

  const error = (msg, duration = 2000) => {
    showNotifier({ type: 'error', msg, duration });
  };

  const info = (msg, duration = 2000) => {
    showNotifier({ type: 'info', msg, duration });
  };

  const warning = (msg, duration = 2000) => {
    showNotifier({ type: 'warning', msg, duration });
  };

  return { success, error, info, warning };
};

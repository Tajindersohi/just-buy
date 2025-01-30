let showNotifierInstance = null;

export const setNotifierInstance = (notifier) => {
  showNotifierInstance = notifier;
};

export const showSuccess = (msg, duration = 2000) => {
  showNotifierInstance?.({ type: "success", msg, duration });
};

export const showError = (msg, duration = 2000) => {
  showNotifierInstance?.({ type: "error", msg, duration });
};

export const showInfo = (msg, duration = 2000) => {
  showNotifierInstance?.({ type: "info", msg, duration });
};

export const showWarning = (msg, duration = 2000) => {
  showNotifierInstance?.({ type: "warning", msg, duration });
};

let showNotifierInstance = null;

export const setNotifierInstance = (notifier) => {
  showNotifierInstance = notifier;
};

export const showSuccess = (msg, dir = 'left', isClosable = true, duration = 2000) => {
  showNotifierInstance?.({ type: "success", msg, dir, isClosable, duration });
};

export const showError = (msg, dir = 'left', isClosable = true, duration = 2000) => {
  showNotifierInstance?.({ type: "error", msg, dir, isClosable, duration });
};

export const showInfo = (msg, dir = 'left', isClosable = true, duration = 2000) => {
  showNotifierInstance?.({ type: "info", msg, dir, isClosable, duration });
};

export const showWarning = (msg, dir = 'left', isClosable = true, duration = 2000) => {
  showNotifierInstance?.({ type: "warning", msg, dir, isClosable, duration });
};

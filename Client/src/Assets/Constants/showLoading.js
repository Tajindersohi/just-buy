let showLoadingInstance = null;

export const setLoadingInstance = (notifier) => {
  showLoadingInstance = notifier;
};

export const showLoading = (isLoading, type = "circular", progress = 50) => {
  showLoadingInstance?.({ loading:isLoading , type:type, progress:progress });
};


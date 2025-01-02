import React from 'react';
import { NotifierProvider } from './Components/Common/Notifier';
import LoadingIndicatorProvider from './Components/Common/LoadingIndicator';

const RootProvider = ({ children }) => (
  <LoadingIndicatorProvider>
    <NotifierProvider>{children}</NotifierProvider>
  </LoadingIndicatorProvider>
);

export default RootProvider;

import React from 'react';
import { NotifierProvider } from './Components/Common/Notifier';
import LoadingIndicatorProvider from './Components/Common/LoadingIndicator';
import { SearchProvider } from './context/SearchContext';

const RootProvider = ({ children }) => (
  <LoadingIndicatorProvider>
    <SearchProvider>
        <NotifierProvider>{children}</NotifierProvider>
    </SearchProvider> 
  </LoadingIndicatorProvider>
);

export default RootProvider;

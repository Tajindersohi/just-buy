import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import apiConstants from '../api/Constants';
import { showError } from '../Assets/Constants/showNotifier';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const skipSuggestionRef = useRef(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSearchResults();
        if (!skipSuggestionRef.current) fetchSuggestions(searchQuery);
        skipSuggestionRef.current = false;
      } else {
        setSearchResults([]);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    try {
      setSearchLoading(true);
      const res = await apiConstants.home.searchHome(encodeURIComponent(searchQuery));
      setSearchResults(res.data?.products || []);
    } catch (error) {
      console.error("Search API failed", error);
      showError("Search failed");
    } finally {
      setSearchLoading(false);
    }
  };

  const fetchSuggestions = async (input) => {
    try {
      const res = await apiConstants.home.searchSuggestion(input);
      if (res.data.success) setSuggestions(res.data.suggestions);
    } catch (err) {
      console.error("Suggestions error", err);
    }
  };

  const handleSuggestionClick = (item) => {
    skipSuggestionRef.current = true;
    setSearchQuery(item.name);
    setSearchResults([item]);
    setSuggestions([]);
    setShowSearchResult(true);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        showSearchResult,
        setShowSearchResult,
        searchResults,
        searchLoading,
        suggestions,
        handleSuggestionClick,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

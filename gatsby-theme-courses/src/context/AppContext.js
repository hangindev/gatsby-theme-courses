import React, { createContext, useContext, useReducer } from 'react';
import isBrowser from '../utils/isBrowser';

export const AppContext = createContext();

let localStorage;
if (!isBrowser()) {
  localStorage = {
    getItem: () => {},
    setItem: () => {},
  };
} else {
  localStorage = window.localStorage;
}
const getStorageItem = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};
const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const AUTOPLAY_KEY = 'gatsby-theme-courses/autoplay';
const LIKES_KEY = 'gatsby-theme-courses/likes';
const WATCHED = 'gatsby-theme-courses/watched';

export const AppProvider = ({ children }) => {
  const initialState = {
    autoplay: getStorageItem(AUTOPLAY_KEY, false),
    likes: getStorageItem(LIKES_KEY, {}),
    watched: getStorageItem(WATCHED, {}),
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setAutoplay': {
        setStorageItem(AUTOPLAY_KEY, action.autoplay);
        return {
          ...state,
          autoplay: action.autoplay,
        };
      }
      case 'like': {
        const { id } = action;
        const cloneLikes = { ...state.likes };
        if (cloneLikes[id]) {
          return state;
        }
        cloneLikes[id] = true;
        setStorageItem(LIKES_KEY, cloneLikes);
        return {
          ...state,
          likes: cloneLikes,
        };
      }
      case 'unlike': {
        const { id } = action;
        const cloneLikes = { ...state.likes };
        if (!cloneLikes[id]) {
          return state;
        }
        delete cloneLikes[id];
        setStorageItem(LIKES_KEY, cloneLikes);
        return {
          ...state,
          likes: cloneLikes,
        };
      }
      case 'addToWatched': {
        const { id } = action;
        const cloneWatched = { ...state.watched };
        if (cloneWatched[id]) {
          return state;
        }
        cloneWatched[id] = true;
        setStorageItem(WATCHED, cloneWatched);
        return {
          ...state,
          watched: cloneWatched,
        };
      }
      case 'removeFromWatched': {
        const { id } = action;
        const cloneWatched = { ...state.watched };
        if (!cloneWatched[id]) {
          return state;
        }
        delete cloneWatched[id];
        setStorageItem(WATCHED, cloneWatched);
        return {
          ...state,
          watched: cloneWatched,
        };
      }
      default:
        return state;
    }
  };

  return (
    <AppContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppValue = () => useContext(AppContext);

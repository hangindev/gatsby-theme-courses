import React, { createContext, useContext, useReducer } from 'react';
import localStorage from '../utils/localStorage';

const AUTOPLAY_KEY = 'gatsby-theme-courses/autoplay';
const LIKES_KEY = 'gatsby-theme-courses/likes';
const WATCHED_KEY = 'gatsby-theme-courses/watched';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    autoplay: false,
    likes: {},
    watched: {},
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'init': {
        return {
          ...state,
          autoplay: localStorage.getItem(AUTOPLAY_KEY, false),
          likes: localStorage.getItem(LIKES_KEY, {}),
          watched: localStorage.getItem(WATCHED_KEY, {}),
        };
      }
      case 'setAutoplay': {
        localStorage.setItem(AUTOPLAY_KEY, action.autoplay);
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
        localStorage.setItem(LIKES_KEY, cloneLikes);
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
        localStorage.setItem(LIKES_KEY, cloneLikes);
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
        localStorage.setItem(WATCHED_KEY, cloneWatched);
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
        localStorage.setItem(WATCHED_KEY, cloneWatched);
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

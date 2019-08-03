import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import useLocalStorage from '../hooks/useLocalStorage';

const pop = keyframes`
  50%  {
    transform: scale(1.5);
  }
`;

const Heart = styled.button`
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
  background: none;
  border: 0;
  outline: 0;
  position: relative;
  cursor: pointer;
  z-index: 10;
  transition: all 200ms;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: -1px -1px 0 #333, 1px -1px 0 #333, -1px 1px 0 #333,
    1px 1px 0 #000;
  &[data-hearted='true'] {
    color: #fe456a;
  }
  &[data-pop='true'] {
    animation: ${pop} 350ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
`;

function Like({ className, id }) {
  const [likes, setLikes] = useLocalStorage('gatsby-theme-courses/likes', {});
  const [pop, setPop] = useState(true);

  function toggleLike() {
    const cloneLikes = { ...likes };
    if (cloneLikes[id]) {
      delete cloneLikes[id];
    } else {
      cloneLikes[id] = true;
      setPop(true);
    }
    setLikes(cloneLikes);
  }

  useEffect(() => {
    if (!pop) return;
    const timeoutId = setTimeout(() => setPop(false), 350);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [pop]);

  return (
    <Heart
      className={className}
      onClick={e => {
        e.stopPropagation();
        toggleLike();
      }}
      data-hearted={!!likes[id]}
      data-pop={pop}
    >
      ❤
    </Heart>
  );
}

export default Like;

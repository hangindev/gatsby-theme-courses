import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import useLocalStorage from '../hooks/useLocalStorage';

const pop = keyframes`
  50%  {
    transform: scale(1.8) rotate(5deg);
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
  color: rgba(255, 255, 255, 0.9);
  &[data-hearted='true'] {
    color: #fe456a;
  }
  &[data-pop='true'] {
    animation: ${pop} 350ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
`;

function Like({ className, liked, toggleLike }) {
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (!liked) return;
    setPop(true);
    const timeoutId = setTimeout(() => setPop(false), 350);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [liked]);

  return (
    <Heart
      className={className}
      onClick={e => {
        e.stopPropagation();
        toggleLike();
      }}
      data-hearted={liked}
      data-pop={pop}
    >
      <svg
        aria-hidden="true"
        width="1em"
        height="1em"
        style={{
          msTransform: 'rotate(360deg)',
          WebkitTransform: 'rotate(360deg)',
        }}
        viewBox="0 0 36 36"
        transform="rotate(360)"
      >
        <path
          fill="currentColor"
          stroke="#333333"
          strokeWidth="2"
          d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868-3.308 0-6.227 1.633-8.018 4.129-1.791-2.496-4.71-4.129-8.017-4.129-5.45 0-9.868 4.417-9.868 9.868 0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959.17-.721.268-1.469.268-2.242z"
        />
      </svg>
    </Heart>
  );
}

export default Like;

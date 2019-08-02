import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

function AutoplaySwitch({ className }) {
  const [autoplay, setAutoplay] = useLocalStorage(
    'gatsby-theme-courses/autoplay',
    false
  );

  return (
    <div className={className}>
      <input
        type="checkbox"
        name="autoplay"
        checked={autoplay}
        onChange={e => setAutoplay(e.target.checked)}
      />{' '}
      <small>Autoplay</small>
    </div>
  );
}

export default AutoplaySwitch;

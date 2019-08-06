import React from 'react';
import { useAppValue } from '../context/AppContext';

function AutoplaySwitch({ className }) {
  const [{ autoplay }, dispatch] = useAppValue();
  return (
    <div className={className}>
      <label htmlFor="Autoplay">
        <input
          type="checkbox"
          name="autoplay"
          checked={autoplay}
          onChange={e =>
            dispatch({
              type: 'setAutoplay',
              autoplay: e.target.checked,
            })
          }
          id="Autoplay"
        />{' '}
        <small>Autoplay</small>
      </label>
    </div>
  );
}

export default AutoplaySwitch;

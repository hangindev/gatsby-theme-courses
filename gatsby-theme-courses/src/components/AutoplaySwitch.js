import React from 'react';
import { useAppValue } from '../context/AppContext';

function AutoplaySwitch({ className }) {
  const [{ autoplay }, dispatch] = useAppValue();
  return (
    <div className={className}>
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
      />{' '}
      <small>Autoplay</small>
    </div>
  );
}

export default AutoplaySwitch;

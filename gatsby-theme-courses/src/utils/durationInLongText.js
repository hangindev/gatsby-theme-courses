import secondsToHMS from './secondsToHMS';

function durationInLongText(seconds) {
  const { h, m, s } = secondsToHMS(seconds);
  return h > 0
    ? `${h} hour${h !== 1 ? 's' : ''} ${m} minute${m !== 1 ? 's' : ''}`
    : `${m} minute${m !== 1 ? 's' : ''} ${s} second${s !== 1 ? 's' : ''}`;
}

export default durationInLongText;

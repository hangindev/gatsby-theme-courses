import secondsToHMS from './secondsToHMS';

function durationInText(seconds) {
  const { h, m, s } = secondsToHMS(seconds);
  return h > 0 ? `${h}h${m}m` : `${m}m${s}s`;
}

export default durationInText;

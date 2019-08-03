function secondsToHMS(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds - h * 3600) / 60);
  const s = seconds - h * 3600 - m * 60;
  return { h, m, s };
}

export const durationInLongText = seconds => {
  const { h, m, s } = secondsToHMS(seconds);
  return h > 0
    ? `${h} hour${h !== 1 ? 's' : ''} ${m} minute${m !== 1 ? 's' : ''}`
    : `${m} minute${m !== 1 ? 's' : ''} ${s} second${s !== 1 ? 's' : ''}`;
};

export const durationInText = seconds => {
  const { h, m, s } = secondsToHMS(seconds);
  return h > 0 ? `${h}h${m}m` : `${m}m${s}s`;
};

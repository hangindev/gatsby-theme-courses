export const durationInLongText = second => {
  const h = Math.floor(second / 3600);
  const m = Math.floor((second - h * 3600) / 60);
  const s = second - h * 3600 - m * 60;
  if (h > 0)
    return `${h} hour${h !== 1 ? 's' : ''} ${m} minute${m !== 1 ? 's' : ''}`;
  return `${m} minute${m !== 1 ? 's' : ''} ${s} second${s !== 1 ? 's' : ''}`;
};

export const durationInText = second => {
  const h = Math.floor(second / 3600);
  const m = Math.floor((second - h * 3600) / 60);
  const s = second - h * 3600 - m * 60;
  if (h > 0) return `${h}h${m}m`;
  return `${m}m${s}s`;
};

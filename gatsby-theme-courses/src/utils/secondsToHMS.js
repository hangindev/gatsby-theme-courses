function secondsToHMS(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds - h * 3600) / 60);
  const s = seconds - h * 3600 - m * 60;
  return { h, m, s };
}

export default secondsToHMS;

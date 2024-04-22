export default function sleepTimer(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function wait() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

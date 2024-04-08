export function createUrlFromBlob(blob) {
  const url = URL.createObjectURL(blob);
  return url;
}

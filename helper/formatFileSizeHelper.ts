export function FormatFileSize(sizeInBytes: number) {
  const MB = 1000000;
  return sizeInBytes > MB
    ? `${(sizeInBytes / MB).toFixed(2)} MB`
    : `${(sizeInBytes / 1000).toFixed(2)} KB`;
}

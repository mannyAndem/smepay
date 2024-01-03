export const parseImageUrl = (FileList) => {
  const url = URL.createObjectURL(FileList[0]);
  return url;
};

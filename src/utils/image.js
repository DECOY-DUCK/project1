export function setSaveImageUrl(image) {
  return require(`@/assets/resources${image.saveFolder}/${image.saveFile}`);
}

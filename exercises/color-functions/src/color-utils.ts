export const hexToRgb = (hex: string): { r: number; b: number; g: number } => {
  if (hex.length === 3) {
    let [r, g, b] = hex.split('');
    return hexToRgb(`${r}${r}${g}${g}${b}${b}`);
  }

  const [r, g, b] = [0, 2, 4].map(offset => {
    const hexCh = hex.substring(offset, offset + 2);
    return parseInt(hexCh, 16);
  });
  return { r, b, g };
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return [r, g, b]
    .map(decCh => {
      const hexCh = Math.max(0, Math.min(255, decCh)).toString(16);
      return hexCh.length === 1 ? `0${hexCh}` : hexCh;
    })
    .join('');
};

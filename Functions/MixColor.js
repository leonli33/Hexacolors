// Thanks to https://github.com/GirkovArpa/hex-color-mixer for the color mixing algorithm!
export default MixColors = (hexes) => {
  console.log(hexes, "hexes")
  let rgbs = hexes.map((hex) => this.hex2dec(hex));
  let cmyks = rgbs.map((rgb) => this.rgb2cmyk(...rgb));
  let mixture_cmyk = this.mix_cmyks(...cmyks);
  let mixture_rgb = this.cmyk2rgb(...mixture_cmyk);
  let mixture_hex = this.rgb2hex(...mixture_rgb);
  return mixture_hex;
};

hex2dec = (hex) => {
  hex = "" + hex;
  return hex
    .replace("#", "")
    .match(/.{2}/g)
    .map((n) => parseInt(n, 16));
};

rgb2hex = (r, g, b) => {
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  r = Math.min(r, 255);
  g = Math.min(g, 255);
  b = Math.min(b, 255);
  return (
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  );
};

rgb2cmyk = (r, g, b) => {
  let c = 1 - r / 255;
  let m = 1 - g / 255;
  let y = 1 - b / 255;
  let k = Math.min(c, m, y);
  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);
  return [c, m, y, k];
};

cmyk2rgb = (c, m, y, k) => {
  let r = c * (1 - k) + k;
  let g = m * (1 - k) + k;
  let b = y * (1 - k) + k;
  r = (1 - r) * 255 + 0.5;
  g = (1 - g) * 255 + 0.5;
  b = (1 - b) * 255 + 0.5;
  return [r, g, b];
};

mix_cmyks = (...cmyks) => {
  let c =
    cmyks.map((cmyk) => cmyk[0]).reduce((a, b) => a + b, 0) / cmyks.length;
  let m =
    cmyks.map((cmyk) => cmyk[1]).reduce((a, b) => a + b, 0) / cmyks.length;
  let y =
    cmyks.map((cmyk) => cmyk[2]).reduce((a, b) => a + b, 0) / cmyks.length;
  let k =
    cmyks.map((cmyk) => cmyk[3]).reduce((a, b) => a + b, 0) / cmyks.length;
  return [c, m, y, k];
};

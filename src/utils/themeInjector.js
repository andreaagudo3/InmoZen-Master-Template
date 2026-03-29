import { SITE } from '../config/siteConfig'

function hexToRgb(hex) {
  let r = 0, g = 0, b = 0;
  if(hex.length == 4) {
    r = "0x" + hex[1] + hex[1]; g = "0x" + hex[2] + hex[2]; b = "0x" + hex[3] + hex[3];
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2]; g = "0x" + hex[3] + hex[4]; b = "0x" + hex[5] + hex[6];
  }
  return [+r, +g, +b];
}

function mix(color1, color2, weight) {
  const w1 = weight / 100;
  const w2 = 1 - w1;
  const r = Math.round(color1[0] * w1 + color2[0] * w2);
  const g = Math.round(color1[1] * w1 + color2[1] * w2);
  const b = Math.round(color1[2] * w1 + color2[2] * w2);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Genera y aplica variables CSS para el color primario basado en la configuración.
 */
export function injectTheme() {
  const hex = SITE.branding?.primaryColor;
  if (!hex) return;
  
  const rgb = hexToRgb(hex);
  const white = [255, 255, 255];
  const black = [0, 0, 0];

  // We map the main color mostly to the 600 or 500, let's map it to 500 and create variants.
  const shades = {
    50: mix(rgb, white, 10),
    100: mix(rgb, white, 20),
    200: mix(rgb, white, 40),
    300: mix(rgb, white, 60),
    400: mix(rgb, white, 80),
    500: mix(rgb, white, 100), // Original hex
    600: mix(rgb, black, 80),
    700: mix(rgb, black, 60),
    800: mix(rgb, black, 40),
    900: mix(rgb, black, 20),
    950: mix(rgb, black, 10),
  };

  const root = document.documentElement;
  Object.entries(shades).forEach(([shade, color]) => {
    root.style.setProperty(`--color-primary-${shade}`, color);
  });
}

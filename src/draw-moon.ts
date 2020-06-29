import moonSrc from './moon.jpg';

const moonImage = new Image();
moonImage.src = moonSrc;

const PI = Math.PI;
const TAU = PI * 2;

const loadImage = async (image: HTMLImageElement): Promise<void> => {
  if (image.complete) return;
  return new Promise((resolve, reject) => {
    image.addEventListener('load', () => resolve());
    image.addEventListener('error', reject);
  });
};

export interface DrawMoonOptions {
  /**
   * Width of canvas.
   */
  width: number;
  /**
   * Height of canvas.
   */
  height: number;
  /**
   * Midpoint angle in radians of the illuminated limb of the moon reckoned
   * eastward from the north point of the disk.
   */
  angle: number;
  /**
   * Illuminated fraction of the moon; varies from 0.0 (new moon) to 1.0 (full
   * moon).
   */
  fraction: number;
}

export interface DrawMoon {
  (ctx: CanvasRenderingContext2D, options: DrawMoonOptions): Promise<void>;
}

export const drawMoon: DrawMoon = async (ctx, {
  width,
  height,
  angle,
  fraction,
}) => {
  await loadImage(moonImage);
  ctx.save();
  const radius = Math.min(width, height) / 2;
  const size = radius * 2;
  // Center on midpoint
  ctx.translate(width / 2, height / 2);
  // Shrink from edges
  ctx.scale(0.9, 0.9);
  // Crop as circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, TAU);
  ctx.closePath();
  ctx.clip();
  // Draw upright moon
  ctx.rotate(PI);
  ctx.drawImage(moonImage, -radius, -radius, size, size);
  ctx.rotate(-PI);
  // Darken it
  ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
  ctx.fillRect(-radius, -radius, size, size);
  // Rotate so that 0 degrees is straight up
  ctx.rotate(-PI / 2);
  // Draw light part of moon
  ctx.save();
  ctx.rotate(angle);
  const w = 2 * radius * (fraction - 0.5);
  let start = PI * 1/2;
  let end = PI * 3/2;
  if (fraction < 0.5) [start, end] = [end, start];
  ctx.beginPath();
  ctx.ellipse(0, 0, Math.abs(w), radius, 0, start, end);
  ctx.arc(0, 0, radius, end, start, fraction < 0.5);
  ctx.closePath();
  ctx.clip();
  ctx.rotate(-angle + PI / 2);
  ctx.rotate(PI);
  ctx.drawImage(moonImage, -radius, -radius, size, size);
  ctx.rotate(-PI);
  ctx.restore();
  // Draw border
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, TAU);
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.restore();
};

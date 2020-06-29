import moonSrc from './moon.jpg';

const PI = Math.PI;
const TAU = PI * 2;

const QUARTER_TURN = PI / 2;
const HALF_TURN = PI;
const FULL_TURN = TAU;

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
  /**
   * Custom moon image.
   */
  imageSrc?: string;
}

export interface DrawMoon {
  (ctx: CanvasRenderingContext2D, options: DrawMoonOptions): Promise<void>;
}

export const drawMoon: DrawMoon = async (ctx, {
  width,
  height,
  angle,
  fraction,
  imageSrc = moonSrc,
}) => {
  const moonImage = new Image();
  moonImage.src = imageSrc;
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
  ctx.arc(0, 0, radius, 0, FULL_TURN);
  ctx.closePath();
  ctx.clip();
  // Draw upright moon
  ctx.rotate(HALF_TURN);
  ctx.drawImage(moonImage, -radius, -radius, size, size);
  ctx.rotate(-HALF_TURN);
  // Darken it
  ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
  ctx.fillRect(-radius, -radius, size, size);
  // Rotate so that 0 degrees is straight up
  ctx.rotate(-QUARTER_TURN);
  // Draw light part of moon
  ctx.save();
  ctx.rotate(angle);
  const w = 2 * radius * (fraction - 0.5);
  let start = HALF_TURN - QUARTER_TURN;
  let end = HALF_TURN + QUARTER_TURN;
  if (fraction < 0.5) [start, end] = [end, start];
  ctx.beginPath();
  ctx.ellipse(0, 0, Math.abs(w), radius, 0, start, end);
  ctx.arc(0, 0, radius, end, start, fraction < 0.5);
  ctx.closePath();
  ctx.clip();
  ctx.rotate(-angle + QUARTER_TURN);
  ctx.rotate(HALF_TURN);
  ctx.drawImage(moonImage, -radius, -radius, size, size);
  ctx.rotate(-HALF_TURN);
  ctx.restore();
  // Draw border
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, FULL_TURN);
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.restore();
};

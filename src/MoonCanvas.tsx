import * as React from 'react';
import { drawMoon } from './draw-moon'

const PI = Math.PI;
const TAU = PI * 2;

export interface Props {
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
   * Image to use for the moon's surface.
   */
  imageSrc?: string;
}

const MoonCanvas: React.FC<Props> = ({ angle, fraction, imageSrc }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    drawMoon(ctx, {
      width,
      height,
      angle,
      fraction,
      imageSrc,
    });
  }, [angle, fraction, imageSrc]);

  return <canvas width={500} height={500} ref={canvasRef} />;
};

export default MoonCanvas;

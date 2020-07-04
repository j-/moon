import * as React from 'react';
import { drawMoon } from './draw-moon'

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
   * Angle in radians moon is rotated based on perspective.
   */
  moonOrientation: number;
  /**
   * Image to use for the moon's surface.
   */
  imageSrc?: string;
}

const MoonCanvas: React.FC<Props> = ({ angle, fraction, moonOrientation, imageSrc }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    ctx.save();
    ctx.clearRect(0, 0, width, height);
    drawMoon(ctx, {
      width,
      height,
      angle,
      fraction,
      moonOrientation,
      imageSrc,
    });
    ctx.restore();
  }, [angle, fraction, moonOrientation, imageSrc]);

  return <canvas width={500} height={500} ref={canvasRef} />;
};

export default MoonCanvas;

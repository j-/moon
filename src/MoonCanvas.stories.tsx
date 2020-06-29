import * as React from 'react';
import { withKnobs, number  } from '@storybook/addon-knobs';
import MoonCanvas from './MoonCanvas';

export default {
  title: 'MoonCanvas',
  component: MoonCanvas,
  decorators: [withKnobs],
};

export const DummyValues = () => (
  <MoonCanvas
    angle={number('Angle (rads)', -1.17, {
      range: true,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
    })}
    fraction={number('Fraction (%)', 0.59, {
      range: true,
      min: 0,
      max: 1,
      step: 0.01,
    })}
  />
);

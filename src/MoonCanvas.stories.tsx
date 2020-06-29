import * as React from 'react';
import MoonCanvas from './MoonCanvas';

export default {
  title: 'MoonCanvas',
  component: MoonCanvas,
};

export const DummyValues = () => (
  <MoonCanvas
    angle={-1.166752378752508}
    fraction={0.5932997848074963}
  />
);

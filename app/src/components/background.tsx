import React, { ReactNode } from 'react';

interface BackgroundProps {
  temp: number,
  children: ReactNode
}

const getBackground = (temp: number) => {
  if (temp >= 30) {
    return '#ff8c00';
  }

  if (temp <= -10) {
    return '#00ffff';
  }

  return '#fff700';
};

function Background(props: BackgroundProps) {
  return (
    <div className="background" style={{ background: getBackground(props.temp) }}>
      {props.children}
    </div>
  );
}

export default Background;

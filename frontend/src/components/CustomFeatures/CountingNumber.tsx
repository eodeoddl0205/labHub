import React from 'react';
import { useSpring, animated } from 'react-spring';

interface CountingNumberProps {
  initialCount: number;
  duration: number;
}

const CountingNumber: React.FC<CountingNumberProps> = ({ initialCount, duration }) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: initialCount },
    config: { duration, easing: t => 1 - Math.pow(1 - t, 4) },
  });

  return (
    <div>
      <animated.div>{number.to((val: number) => Math.floor(val))}</animated.div>
    </div>
  );
};

export default CountingNumber;
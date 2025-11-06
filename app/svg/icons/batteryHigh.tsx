import { CustomIconProps } from './types';
const BatteryHigh = (props: CustomIconProps) => {
  const { size, color, ...rest } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <rect x="0.5" y="4.5" width="13" height="7" rx="1.5" stroke={color} />
      <rect x="2" y="6" width="2" height="4" fill={color} />
      <rect x="5" y="6" width="2" height="4" fill={color} />
      <rect x="8" y="6" width="2" height="4" fill={color} />
    </svg>
  );
};

export default BatteryHigh;

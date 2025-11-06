import { CustomIconProps } from './types';
const BatteryEmpty = (props: CustomIconProps) => {
  const { size, color, ...rest } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <rect x="0.5" y="4.5" width="14" height="7" rx="1.5" stroke={color} />
    </svg>
  );
};

export default BatteryEmpty;

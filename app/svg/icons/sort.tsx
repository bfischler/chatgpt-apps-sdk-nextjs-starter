import { CustomIconProps } from './types';

const Sort = (props: CustomIconProps) => {
  const { size, color, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={color}
      {...rest}
      strokeWidth="1"
    >
      <path d="M1 3L4 0.5M4 0.5L7 3M4 0.5V9.5M10 0.5V9.5M10 9.5L7 7M10 9.5L13 7" />
    </svg>
  );
};

export default Sort;

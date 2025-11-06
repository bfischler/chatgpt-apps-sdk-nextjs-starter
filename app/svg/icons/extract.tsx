import { CustomIconProps } from './types';
const Extract = (props: CustomIconProps) => {
  const { size, color, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M8 18H21" />
      <path d="M3 18H3.01083" />
      <path d="M8 12H13.505" />
      <path d="M3 12H3.01083" />
      <path d="M8 6H16.01" />
      <path d="M3 6H3.01083" />
      <path d="M18 13.5L22.5 18L18 22.5" />
    </svg>
  );
};

export default Extract;

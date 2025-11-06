import { CustomIconProps } from './types';
const MultiSelect = (props: CustomIconProps) => {
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
      <path d="M2.25 7.5L4.5 9.75L9.75 4.5" />
      <path d="M2.25 16.5L4.5 18.75L9.75 13.5" />
      <path d="M14.25 8.25H21.75" />
      <path d="M14.25 17.25H21.75" />
    </svg>
  );
};

export default MultiSelect;

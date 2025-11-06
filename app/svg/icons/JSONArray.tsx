import { CustomIconProps } from './types';
const JSONArray = (props: CustomIconProps) => {
  const { size, color, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M6 2.5H3V13.5H6" />
      <path d="M10 2.5H13V13.5H10" />
    </svg>
  );
};

export default JSONArray;

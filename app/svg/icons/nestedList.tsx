import { CustomIconProps } from './types';
const NestedList = (props: CustomIconProps) => {
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
      <path d="M12.9902 18H21.0002" />
      <path d="M7.99316 18H8.004" />
      <path d="M12.9902 12H21.0002" />
      <path d="M7.99316 12H8.004" />
      <path d="M7.99902 6H16.009" />
      <path d="M3 6H3.01083" />
    </svg>
  );
};

export default NestedList;

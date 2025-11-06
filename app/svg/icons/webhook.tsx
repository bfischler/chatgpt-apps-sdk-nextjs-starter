import { CustomIconProps } from './types';
const Webhook = (props: CustomIconProps) => {
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
      <path d="M15.998 6.444a4 4 0 10-6 3.463l-4.411 7.634" />
      <path d="M3.59 14.093a4 4 0 106 3.465l8.817.002" />
      <path d="M16.409 21a4 4 0 10.001-6.928l-4.407-7.637" />
    </svg>
  );
};

export default Webhook;

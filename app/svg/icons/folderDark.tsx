import { CustomIconProps } from './types';
const FolderDark = (props: CustomIconProps) => {
  const { size, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      stroke="none"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.01667 1.68342C1.45425 1.24583 2.04775 1 2.66659 1H5.99992C6.33427 1 6.6465 1.1671 6.83197 1.4453L7.86844 3H13.3333C13.9521 3 14.5456 3.24583 14.9832 3.68342C15.4208 4.121 15.6666 4.71449 15.6666 5.33333V12.6667C15.6666 13.2855 15.4208 13.879 14.9832 14.3166C14.5456 14.7542 13.9521 15 13.3333 15H2.66659C2.04775 15 1.45425 14.7542 1.01667 14.3166C0.579085 13.879 0.333252 13.2855 0.333252 12.6667V3.33333C0.333252 2.7145 0.579084 2.121 1.01667 1.68342Z"
        fill="#676D7E"
      />
    </svg>
  );
};

export default FolderDark;

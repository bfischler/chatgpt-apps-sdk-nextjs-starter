import { CustomIconProps } from './types';
const Graph = (props: CustomIconProps) => {
  const { size, color, ...rest } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      stroke={color}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g clipPath="url(#clip0_953_22485)">
        <path
          d="M4 6.5H2C1.72386 6.5 1.5 6.72386 1.5 7V9C1.5 9.27614 1.72386 9.5 2 9.5H4C4.27614 9.5 4.5 9.27614 4.5 9V7C4.5 6.72386 4.27614 6.5 4 6.5Z"
          stroke="black"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 2.5H10.5C10.2239 2.5 10 2.72386 10 3V6C10 6.27614 10.2239 6.5 10.5 6.5H13.5C13.7761 6.5 14 6.27614 14 6V3C14 2.72386 13.7761 2.5 13.5 2.5Z"
          stroke="black"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 9.5H10.5C10.2239 9.5 10 9.72386 10 10V13C10 13.2761 10.2239 13.5 10.5 13.5H13.5C13.7761 13.5 14 13.2761 14 13V10C14 9.72386 13.7761 9.5 13.5 9.5Z"
          stroke="black"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M4.5 8H7.5" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M10 11.5H9C8.60218 11.5 8.22064 11.342 7.93934 11.0607C7.65804 10.7794 7.5 10.3978 7.5 10V6C7.5 5.60218 7.65804 5.22064 7.93934 4.93934C8.22064 4.65804 8.60218 4.5 9 4.5H10"
          stroke="black"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_953_22485">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Graph;

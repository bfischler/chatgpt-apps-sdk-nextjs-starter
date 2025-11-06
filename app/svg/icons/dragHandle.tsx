import { CustomIconProps } from './types';
const DragHandle = (props: CustomIconProps) => {
  const { size, color, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 10 20"
      stroke={color}
      fill="none"
      {...rest}
    >
      <g>
        <path
          d="M4.68168 13.2388C5.08836 13.2388 5.41804 12.9165 5.41804 12.5188C5.41804 12.1212 5.08836 11.7988 4.68168 11.7988C4.27499 11.7988 3.94531 12.1212 3.94531 12.5188C3.94531 12.9165 4.27499 13.2388 4.68168 13.2388Z"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.68168 8.19977C5.08836 8.19977 5.41804 7.87741 5.41804 7.47977C5.41804 7.08212 5.08836 6.75977 4.68168 6.75977C4.27499 6.75977 3.94531 7.08212 3.94531 7.47977C3.94531 7.87741 4.27499 8.19977 4.68168 8.19977Z"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M8.36328 4.59961L4.68146 0.999609L0.999645 4.59961"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 15.4004L4.68182 19.0004L8.36364 15.4004"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <clipPath id="clip0_4920_339594">
          <rect width="2.94545" height="12.96" fill="white" transform="translate(3.20898 6.03906)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DragHandle;

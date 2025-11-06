import { CustomIconProps } from './types';
const Formula = (props: CustomIconProps) => {
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
      <path d="M4.50004 20.4519C4.91614 20.7429 5.39964 20.925 5.90568 20.9813C6.41171 21.0376 6.92389 20.9662 7.39468 20.7738C7.86547 20.5814 8.27961 20.2742 8.59869 19.8807C8.91776 19.4873 9.13142 19.0202 9.21984 18.523L11.3197 6.71539C11.4754 5.83965 11.8896 5.02936 12.5098 4.38699C13.13 3.74462 13.9284 3.29903 14.804 3.10656C15.6796 2.91408 16.5931 2.98338 17.429 3.30568C18.2649 3.62798 18.9856 4.18881 19.5 4.91725" />
      <path d="M6.74902 11.2499L16.4836 11.2499" />
    </svg>
  );
};

export default Formula;

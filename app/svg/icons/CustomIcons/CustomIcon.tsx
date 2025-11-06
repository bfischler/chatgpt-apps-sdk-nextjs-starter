import clsx from 'clsx';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes, SVGAttributes } from 'react';

import { IconSize, IconSizeClasses } from '@/glaze-components/icon';

// Define the props interface similar to Phosphor Icons

export type CustomIconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

export interface CustomIconProps extends SVGAttributes<SVGSVGElement> {
  size?: IconSize;
  color?: string;
  weight?: CustomIconWeight;
  alt?: string;
  className?: string;
  children?: ReactNode;
  viewBox?: string;
}

export type CustomIcon = ForwardRefExoticComponent<CustomIconProps & RefAttributes<SVGSVGElement>>;

// Create a reusable SVG wrapper component
export const CustomIcon = forwardRef(function CustomIcon(
  props: CustomIconProps,
  ref: React.ForwardedRef<SVGSVGElement>,
) {
  const { alt, size = 'md', className, children, viewBox = '0 0 32 32', ...restProps } = props;

  // Check if any of the IconSizeClasses values are already in the className
  const hasSizeClass = className?.includes('size-');

  // Only apply our own sizeClass if no size class is present in className
  let finalSizeClass = '';
  if (!hasSizeClass && typeof size === 'string') {
    finalSizeClass = IconSizeClasses[size] || IconSizeClasses.md;
  }

  return (
    <svg ref={ref} className={clsx(finalSizeClass, className)} viewBox={viewBox} {...restProps}>
      {alt && <title>{alt}</title>}
      {children}
    </svg>
  );
});

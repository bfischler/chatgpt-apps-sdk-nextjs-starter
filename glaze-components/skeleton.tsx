import { clsx } from "clsx";
import React from "react";

export type SkeletonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface SkeletonBaseProps extends React.HTMLProps<HTMLDivElement> {}

/**
 * This is the base skeleton component that is used to create the other skeleton components.
 * It can also be used to create a custom skeleton component with a custom size and shape.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonBaseProps>(
  function Skeleton({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx("animate-pulse bg-nightshade-100", className)}
        {...props}
      />
    );
  }
);

const rectangularStyles: Record<SkeletonSize, string> = {
  xs: "h-3",
  sm: "h-4",
  md: "h-5",
  lg: "h-6",
  xl: "h-8",
};

type SkeletonVariantProps = Omit<SkeletonBaseProps, "size"> & {
  size?: SkeletonSize;
};

export const SkeletonText = React.forwardRef<
  HTMLDivElement,
  SkeletonVariantProps
>(function SkeletonText({ className, size = "md", ...props }, ref) {
  return (
    <Skeleton
      className={clsx(className, rectangularStyles[size], "w-full rounded")}
      {...props}
      ref={ref}
    />
  );
});

const circularSizeStyles: Record<SkeletonSize, string> = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

export const SkeletonCircle = React.forwardRef<
  HTMLDivElement,
  SkeletonVariantProps
>(function SkeletonCircle({ className, size = "md", ...props }, ref) {
  return (
    <Skeleton
      className={clsx(className, circularSizeStyles[size], "rounded-full")}
      {...props}
      ref={ref}
    />
  );
});

type SkeletonListProps = SkeletonVariantProps & { lines: number };

export const SkeletonTextList = React.forwardRef<
  HTMLDivElement,
  SkeletonListProps
>(function SkeletonList(
  // For whatever reason, the ref is coming through as a props, so we need to ignore it
  { className, size = "md", lines, ...props },
  ref
) {
  return (
    <div className={clsx(className, "flex flex-col gap-2")}>
      {Array.from({ length: lines }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key -- no avoiding an index key here based on the lines prop
        <SkeletonText key={index} size={size} {...props} />
      ))}
    </div>
  );
});

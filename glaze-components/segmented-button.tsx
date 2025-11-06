import { clsx } from "clsx";
import {
  Children,
  createContext,
  ForwardedRef,
  forwardRef,
  Fragment,
  ReactNode,
  useMemo,
} from "react";

const segmentedButtonVariants = [
  "primary",
  "secondary",
  "ghost",
  "danger",
] as const;
export type SegmentedButtonVariant = (typeof segmentedButtonVariants)[number];

export type SegmentedButtonGroupProps = {
  children: ReactNode;
  className?: string;
  variant?: SegmentedButtonVariant;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
};

type SegmentedButtonGroupContext = {
  variant?: SegmentedButtonVariant;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};
export const SegmentedButtonGroupContext =
  createContext<SegmentedButtonGroupContext | null>(null);

const SegmentedButtonGroupSeparator = ({
  variant,
  disabled,
  loading,
}: {
  variant: SegmentedButtonVariant;
  disabled?: boolean;
  loading?: boolean;
}) => {
  const getBackgroundStyles = () => {
    if (variant === "ghost") {
      return "bg-transparent";
    }

    if (disabled || loading) {
      return "bg-border-tertiary";
    }
    return "bg-border-primary";
  };

  return (
    <div
      className={clsx("relative -mx-px w-0.5", getBackgroundStyles())}
      aria-hidden="true"
    />
  );
};

const SegmentedButtonChild = ({
  children,
  variant,
  size,
  loading,
  disabled,
  className,
}: {
  children: ReactNode;
  variant: SegmentedButtonVariant;
  size: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}) => {
  const contextValue = useMemo(
    () => ({
      variant,
      size,
      loading,
      disabled,
      className,
    }),
    [variant, size, loading, disabled, className]
  );

  return (
    <SegmentedButtonGroupContext.Provider value={contextValue}>
      {children}
    </SegmentedButtonGroupContext.Provider>
  );
};

export const SegmentedButtonGroup = forwardRef(function SegmentedButtonGroup(
  {
    children,
    className,
    variant = "primary",
    size = "md",
    loading,
    disabled,
  }: SegmentedButtonGroupProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const childArray = Children.toArray(children);

  return (
    <div
      ref={ref}
      className={clsx(
        className,
        // Base container
        "inline-flex items-stretch"
      )}
    >
      {childArray.map((child, index) => {
        const isFirstChild = index === 0;
        const isLastChild = index === childArray.length - 1;
        const buttonLoading = loading && isFirstChild;
        const buttonDisabled = disabled || (loading && !isFirstChild);

        const buttonClasses = clsx(
          // Rounded corners
          !isFirstChild && "!rounded-l-none !border-l-0",
          !isLastChild && "!rounded-r-none !border-r-0",
          // Z-index to ensure focus ring appears above dividers
          "relative z-0 focus-visible:z-10"
        );

        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            {!isFirstChild && (
              <SegmentedButtonGroupSeparator
                variant={variant}
                disabled={disabled}
                loading={loading}
              />
            )}
            <SegmentedButtonChild
              variant={variant}
              size={size}
              loading={buttonLoading}
              disabled={buttonDisabled}
              className={buttonClasses}
            >
              {child}
            </SegmentedButtonChild>
          </Fragment>
        );
      })}
    </div>
  );
});

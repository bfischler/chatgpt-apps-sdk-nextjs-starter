import {
  type ButtonProps as HeadlessButtonProps,
  Button as HeadlessButton,
} from "@headlessui/react";
import { IconContext, IconProps } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { omit } from "lodash";
import React, { useContext, useMemo } from "react";

import Link from "next/link";
import { LoadingSpinner } from "./loading-spinner";
import { SegmentedButtonGroupContext } from "./segmented-button";

/** @deprecated do not use these sizes */
const deprecatedSizes = {
  xxs: [
    "text-xs/5 h-4 min-w-4 gap-x-1 px-[calc(theme(spacing[1])-1px)] py-0 [&>svg]:size-3",
  ],
  xl: ["text-sm h-11 gap-x-2 px-[calc(theme(spacing[3]))] py-0 [&>svg]:size-4"],
};
export const sizes = {
  xs: [
    "text-xs/5 h-6 min-w-6 gap-x-1 px-[calc(theme(spacing[1.5]))] py-0 [&>svg]:size-3",
  ],
  sm: [
    "text-xs/5 h-7 gap-x-1.5 px-[calc(theme(spacing[2]))] py-0 [&>svg]:size-3",
  ],
  md: [
    "text-sm h-8 gap-x-1.5  px-[calc(theme(spacing[2]))] py-0 [&>svg]:size-4",
  ],
  lg: ["text-sm h-9 gap-x-2 px-[calc(theme(spacing[3]))] py-0 [&>svg]:size-4"],
  content: [],
  ...deprecatedSizes,
};
export type ButtonSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "content";

export const styles = {
  base: [
    // Base
    "relative isolate inline-flex items-center justify-center rounded border font-medium",

    // Focus
    "focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-0 data-[focus]:outline-outline-focus-ring",

    // Disabled
    "data-[disabled]:bg-[--btn-disabled-bg] data-[disabled]:text-[--btn-disabled-text]",

    // Icon
    "[&>svg]:-mx-0.5 [&>svg]:my-0.5 [&>svg]:shrink-0",
  ],
  solid: [
    // Optical border, implemented as the button background to avoid corner artifacts
    "bg-[--btn-bg] data-[hover]:bg-[--btn-hover-bg]",
  ],
  ghost: [
    // Base
    "border-transparent text-nightshade-950 data-[hover]:bg-nightshade-950/5 [--btn-disabled-text:var(--color-nightshade-400)]",
  ],
  sizes,
  colors: {
    primary: [
      "border-transparent text-white [--btn-hover-bg:#0667D9] [--btn-bg:#0382F7] [--btn-disabled-bg:#F7F8F9] [--btn-disabled-text:#BFC4CD]",
    ],
    secondary: [
      "border-content-primary/24 border bg-white text-nightshade-950 data-[hover]:bg-bg-primary-hover [--btn-disabled-text:#BFC4CD]",
    ],
    danger: [
      "border-transparent text-white [--btn-hover-bg:#B21A3F] [--btn-bg:#DD2C53] [--btn-disabled-bg:#BFC4CD] [--btn-disabled-text:white]",
    ],
    "danger-secondary": [
      "border-content-primary/24 border bg-white text-pomegranate-600 data-[hover]:bg-bg-primary-hover [--btn-disabled-text:#BFC4CD]",
    ],
    "danger-ghost": [
      "border-transparent text-pomegranate-600 data-[hover]:bg-nightshade-50 [--btn-disabled-text:#BFC4CD]",
      "[--btn-hover-bg:#B21A3F] [--btn-bg:transparent] [--btn-disabled-bg:#BFC4CD] [--btn-disabled-text:white]",
    ],
    "inline-text": [
      "border-transparent data-[hover]:bg-nightshade-50 [--btn-disabled-text:#BFC4CD",
      "text-blueberry-500 font-medium [--btn-hover-text:#3EA2FD] [--btn-disabled-text:#BFC4CD]",
    ],
  },
};

export const buttonVariants = [
  "primary",
  "secondary",
  "ghost",
  "danger",
  "danger-secondary",
  "danger-ghost",
  "inline-text",
] as const;
export type ButtonVariant = (typeof buttonVariants)[number];
export type ButtonOnClickEvent = React.MouseEvent<
  HTMLButtonElement,
  MouseEvent
> &
  React.MouseEvent<HTMLAnchorElement, MouseEvent>;

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: keyof typeof styles.sizes;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
} & (HeadlessButtonProps | React.ComponentPropsWithoutRef<typeof Link>);

export const Button = React.forwardRef(function Button(
  { className, children, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  const segmentedButtonGroupContext = useContext(SegmentedButtonGroupContext);
  const size = props.size ?? segmentedButtonGroupContext?.size ?? "lg";
  const variant =
    props.variant ?? segmentedButtonGroupContext?.variant ?? "primary";
  const loading = props.loading ?? segmentedButtonGroupContext?.loading;
  const disabled = props.disabled ?? segmentedButtonGroupContext?.disabled;

  const classes = clsx(
    className,
    styles.base,
    styles.sizes[size],
    variant === "ghost"
      ? styles.ghost
      : clsx(styles.solid, styles.colors[variant]),
    segmentedButtonGroupContext?.className
  );

  const currentPhosphorIconDefaultStyles: IconProps = useContext(IconContext);
  const phosphorIconDefaultStyles: IconProps = useMemo(
    () => ({
      ...currentPhosphorIconDefaultStyles,
      weight: "bold",
    }),
    [currentPhosphorIconDefaultStyles]
  );

  return (
    <IconContext.Provider value={phosphorIconDefaultStyles}>
      {"href" in props ? (
        <Link
          {...props}
          aria-disabled={loading ? true : undefined}
          className={classes}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
          <TouchTarget>
            <>
              {loading && <LoadingSpinner />}
              {children}
            </>
          </TouchTarget>
        </Link>
      ) : (
        <HeadlessButton
          {...omit(props, "disabled")}
          {...{
            disabled: disabled || loading,
            "data-disabled": disabled || loading ? "" : undefined,
          }}
          className={clsx(classes)}
          ref={ref}
        >
          <TouchTarget>
            <>
              {loading && <LoadingSpinner />}
              {children}
            </>
          </TouchTarget>
        </HeadlessButton>
      )}
    </IconContext.Provider>
  );
});

/* Expand the hit area to at least 44×44px on touch devices */
export function TouchTarget({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <span
        className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
        aria-hidden="true"
      />
    </>
  );
}

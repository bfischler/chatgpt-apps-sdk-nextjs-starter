import { IconWeight } from "@phosphor-icons/react";
import clsx from "clsx";
import { omit } from "lodash";
import { ComponentType, createElement, forwardRef, ReactNode } from "react";
import { z } from "zod";

import { PhosphorIconMap } from "./icon-map";
import { IconId, IconIdSchema } from "@/shared/icon-ids";

export type IconProps = {
  className?: string;
  color?: string;
  type: IconType;
  size?: IconSize;
  weight?: IconWeight;
  children?: ReactNode;
  tabIndex?: number | string;
  // Adding this so that we can pass any other props to the icon component
  [x: string]: any;
};

export type IconType = ComponentType<any>;

export const IconSizeSchema = z.enum([
  "sm",
  "md",
  "lg",
  "xl",
  "xxl",
  "headline",
]);
export const IconSize = IconSizeSchema.enum;
export type IconSize = z.infer<typeof IconSizeSchema>;

export const IconSizeClasses = {
  sm: "size-3 min-w-3 max-w-3",
  md: "size-4 min-w-4 max-w-4",
  lg: "size-5 min-w-5 max-w-5",
  xl: "size-6 min-w-6 max-w-6",
  xxl: "size-12 min-w-12 max-w-12",
  headline: "size-16 min-w-16 max-w-16",
};

export const Icon = forwardRef<HTMLElement, IconProps>(function Icon(
  {
    className,
    type,
    size = "md",
    weight,
    color = "currentcolor",
    children,
    ...props
  },
  ref
) {
  const iconSizeClass = IconSizeClasses[size as IconSize];
  return createElement(
    type,
    {
      className: clsx(className, iconSizeClass),
      color,
      weight,
      "data-slot": "icon",
      ref,
      ...omit(props, "backgroundColor"),
    },
    children
  );
});

export default Icon;

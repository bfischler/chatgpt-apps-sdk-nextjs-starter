import { mergeProps, useRender } from "@base-ui-components/react";
import { IconContext, IconProps } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { createContext, forwardRef, useContext, useMemo } from "react";

export type TextSize = "lg" | "md" | "sm" | "xs";
export type TextWeight = "light" | "normal" | "medium" | "semibold" | "bold";

export const textVariants = [
  "primary",
  "secondary",
  "tertiary",
  "placeholder",
  "disabled",
  "action",
  "critical",
  "warning",
  "inherit",
] as const;
export type TextVariant = (typeof textVariants)[number];

type TextProps = useRender.ComponentProps<"p"> & {
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  fontFamily?: "sans" | "mono" | "roobert";
};

export const TextContext = createContext<{ size: TextSize }>({ size: "md" });

const styles = {
  sizes: {
    lg: "text-lg",
    md: "text-base",
    sm: "text-sm",
    xs: "text-xs",
  },
  weights: {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  },
  fontFamilies: {
    sans: "font-sans",
    mono: "font-mono",
    roobert: "font-roobert",
  },
  variants: {
    // Inherit is used to inherit the text color from the parent element
    // If we change variant to encapsulate more than text color, we will need to revisit
    // this
    inherit: "",
    primary: "text-content-primary",
    secondary: "text-content-secondary",
    tertiary: "text-content-tertiary",
    placeholder: "text-content-placeholder",
    disabled: "text-content-disabled",
    action: "text-content-action",
    critical: "text-content-danger",
    warning: "text-content-warning",
  },
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
  {
    variant = "inherit",
    size = "md",
    weight = "normal",
    fontFamily = "sans",
    render,
    ...props
  },
  ref
) {
  const currentPhosphorIconDefaultStyles: IconProps = useContext(IconContext);
  const phosphorIconDefaultStyles: IconProps = useMemo(
    () => ({
      ...currentPhosphorIconDefaultStyles,
      weight: "bold",
    }),
    [currentPhosphorIconDefaultStyles]
  );

  const contextValue = useMemo(() => ({ size }), [size]);

  const element = useRender({
    defaultTagName: "p",
    render,
    ref,
    props: {
      "data-slot": "text",
      // mergeProps automatically merges className with the value supplied in the className prop
      // so we don't need to use clsx to merge it here
      ...mergeProps<"p">(
        {
          className: clsx(
            styles.sizes[size],
            styles.weights[weight],
            styles.fontFamilies[fontFamily],
            styles.variants[variant]
          ),
        },
        props
      ),
    },
  });

  return (
    <TextContext.Provider value={contextValue}>
      <IconContext.Provider value={phosphorIconDefaultStyles}>
        {element}
      </IconContext.Provider>
    </TextContext.Provider>
  );
});

export function Strong({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      {...props}
      className={clsx(className, "font-medium text-nightshade")}
    />
  );
}

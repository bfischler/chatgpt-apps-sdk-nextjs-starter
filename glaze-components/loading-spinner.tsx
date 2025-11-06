import { Spinner } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { forwardRef } from "react";

import { Icon, IconSize } from "./icon";

type LoadingSpinnerProps = {
  className?: string;
  size?: IconSize;
};

export const LoadingSpinner = forwardRef<HTMLElement, LoadingSpinnerProps>(
  function LoadingSpinner({ className, size = "md" }, ref) {
    return (
      <Icon
        type={Spinner}
        className={clsx("animate-spin", className)}
        size={size}
        ref={ref}
      />
    );
  }
);

import { IconSize } from "@/glaze-components/icon";
import { ThemedCSSObject } from "../../theme";

export type CustomIconProps = {
  color?: ThemedCSSObject["color"];
  size?: IconSize;
} & React.SVGProps<SVGSVGElement>;

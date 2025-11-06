import { SourceIcon } from "@/shared/source-icons";

import { CustomIcon, customIcons } from "../../../svg/icons";
import { sourceIcons } from "../../../svg/icons/SourceIcon";
import { ThemedColorType } from "../../../theme";
import { IconId, IconIds } from "@/shared/icon-ids";
import { AssertAExtendsB } from "@/shared/utils/typeUtils";

const strokeWidths = {
  $backgroundIcon: 32 / 12 / 16 + "rem",
  $headlineIcon: 32 / 24 / 16 + "rem",
  $title1Icon: 32 / 20 / 16 + "rem",
  $title2Icon: 32 / 20 / 16 + "rem",
  $body1Icon: 32 / 16 / 16 + "rem",
  $body2Icon: 32 / 16 / 16 + "rem",
  $meta1Icon: 32 / 12 / 16 + "rem",
  $meta2Icon: 32 / 12 / 16 + "rem",
};

/**
 * @deprecated
 */
export type IconSize = keyof typeof strokeWidths;
/**
 * @deprecated
 */
export const IconSizes = Object.keys(strokeWidths);
/**
 * @deprecated
 */
export type IconType =
  | CustomIcon
  | SourceIcon
  // phosphor icons
  | IconId;
export const IconTypes: readonly IconType[] = [
  ...(Object.keys(customIcons) as CustomIcon[]),
  ...(Object.keys(sourceIcons) as SourceIcon[]),
  ...IconIds,
];

export type Props = {
  type: IconType;
  children?: never;
  color?: ThemedColorType;
  size?: IconSize;
  className?: string;
  strokeWidth?: number;
  inheritColor?: boolean; // New prop
};

// Type-level assertions to ensure the icon unions that make up `IconType` are pairwise disjoint.
// If any names overlap, these will produce a compile-time error.
type _Custom = CustomIcon;
type _Source = SourceIcon;
type _Phosphor = IconId;

type _Disjoint_Custom_Source = AssertAExtendsB<
  Extract<_Custom, _Source>,
  never
>;
type _Disjoint_Custom_Phosphor = AssertAExtendsB<
  Extract<_Custom, _Phosphor>,
  never
>;

type _Disjoint_Source_Phosphor = AssertAExtendsB<
  Extract<_Source, _Phosphor>,
  never
>;

export type SourceIconProps = {
  size?: IconSize;
} & React.SVGProps<SVGSVGElement>;

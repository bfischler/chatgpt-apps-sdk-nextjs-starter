import { FC } from "react";
import { z } from "zod";

import BatteryEmpty from "./batteryEmpty";
import BatteryFull from "./batteryFull";
import BatteryHigh from "./batteryHigh";
import BatteryLow from "./batteryLow";
import BatteryMedium from "./batteryMedium";
import CoinStack from "./coinStack";
import Credits25 from "./credits25";
import Credits50 from "./credits50";
import Credits75 from "./credits75";
import Credits100 from "./credits100";
import DragHandle from "./dragHandle";
import External from "./external";
import Extract from "./extract";
import FolderDark from "./folderDark";
import Formula from "./formula";
import Graph from "./graph";
import Hourglass from "./hourglass";
import JSONArray from "./JSONArray";
import JSONObject from "./JSONObject";
import Mailbox from "./mailbox";
import MultiSelect from "./multiSelect";
import NestedList from "./nestedList";
import Pin from "./pin";
import SatelliteDishFilled from "./satelliteDishFilled";
import Select from "./select";
import Sort from "./sort";
import StatusIndicator, { StatusIndicatorProps } from "./StyledStatusIndicator";
import { CustomIconProps } from "./types";
import Webhook from "./webhook";
import { getIconSchema } from "@/shared/get-icon-schema";

export const CustomIcons = [
  "CoinStack",
  "Hourglass",
  "DragHandle",
  "External",
  "Extract",
  "Formula",
  "JSONArray",
  "JSONObject",
  "Mailbox",
  "MultiSelect",
  "NestedList",
  "Pin",
  "SatelliteDishFilled",
  "Select",
  "Sort",
  "StatusIndicator",
  "Webhook",
  "Graph",
  "FolderDark",
  "BatteryEmpty",
  "BatteryLow",
  "BatteryMedium",
  "BatteryHigh",
  "BatteryFull",
  "Credits25",
  "Credits50",
  "Credits75",
  "Credits100",
] as const;
export type CustomIcon = (typeof CustomIcons)[number];
export const CustomIconSchema: z.ZodType<
  CustomIcon,
  z.ZodEffectsDef<z.ZodString>,
  string
> = getIconSchema(CustomIcons, "custom icon");

export const customIcons: Record<
  CustomIcon,
  FC<CustomIconProps> | FC<StatusIndicatorProps>
> = {
  CoinStack,
  Hourglass,
  DragHandle,
  External,
  Extract,
  Formula,
  JSONArray,
  JSONObject,
  Mailbox,
  MultiSelect,
  NestedList,
  Pin,
  SatelliteDishFilled,
  Select,
  Sort,
  StatusIndicator,
  Webhook,
  Graph,
  FolderDark,
  BatteryEmpty,
  BatteryLow,
  BatteryMedium,
  BatteryHigh,
  BatteryFull,
  Credits25,
  Credits50,
  Credits75,
  Credits100,
};

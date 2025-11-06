import { type z } from "zod";
import { getIconSchema } from "./get-icon-schema";

export const SourceIcons = [
  "ClaySource",
  "OpenAI",
] as const;

export type SourceIcon = (typeof SourceIcons)[number];
export const SourceIconSchema: z.ZodType<
  SourceIcon,
  z.ZodEffectsDef<z.ZodString>,
  string
> = getIconSchema(SourceIcons, "source icon");

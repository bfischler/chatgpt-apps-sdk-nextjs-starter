import { z } from "zod";

// Roughly equivalent to z.enum(iconIds) but avoids https://github.com/colinhacks/zod/issues/1040 in zod3
export const getIconSchema = <TValues extends readonly string[]>(
  validValues: TValues,
  errorLabel: string
): z.ZodType<TValues[number], z.ZodEffectsDef<z.ZodString>, string> => {
  const validValuesSet = new Set(validValues as readonly string[]);
  return z
    .string()
    .transform<
      TValues[number]
    >((value: string, ctx: z.RefinementCtx): TValues[number] => {
      if (validValuesSet.has(value)) {
        return value as TValues[number];
      }
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid Icon ${errorLabel}: ${value}`,
      });
      return z.NEVER;
    });
};

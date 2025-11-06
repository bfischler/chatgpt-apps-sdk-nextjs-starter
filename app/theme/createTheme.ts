import parse from "postcss-value-parser";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { createGlobalStyle, CSSObject, CSSProperties } from "styled-components";

// Exports
////////////////////////////////////////////////////////////////////////////////

export type ThemedCSSObjectFromThemed<Theme extends AbstractTheme<any>> =
  Parameters<Theme>[0];

export const createTheme = <Config extends AbstractConfig>(config: Config) => {
  const tokens = createTokens(config.tokens) || {};
  const allTokens = Object.values(tokens).reduce((a, b) => ({ ...a, ...b }));
  const utils = config.utils || {};
  const theme = (themeStyle: AbstractThemedCSSObject<any>): CSSObject => {
    const style: CSSObject = {};
    Object.entries(themeStyle).forEach(([key, value]: [string, any]) => {
      if (
        aliases.hasOwnProperty(key) &&
        tokens[aliases[key as keyof Aliases]][value]
      ) {
        style[key] = tokens[aliases[key as keyof Aliases]][value];
      } else if (utils.hasOwnProperty(key) && typeof value !== "undefined") {
        Object.assign(style, utils[key](value));
      } else if (value && typeof value === "object") {
        style[key] = theme(value);
      } else if (typeof value === "string") {
        const parsed = parse(value);
        if (parsed.nodes.length >= 1) {
          parsed.walk((node) => {
            if (node.type === "word" && allTokens[node.value]) {
              node.value = allTokens[node.value];
            }
          });
        }
        style[key] = parsed.toString();
      } else {
        style[key] = value;
      }
    });
    return style;
  };
  return {
    theme: theme as AbstractTheme<Config>,
    tokens: tokens as Config["tokens"],
    utils,
  };
};

// Utils
////////////////////////////////////////////////////////////////////////////////

function createTokens<T extends AbstractConfig["tokens"]>(tokens: T): T {
  if (!tokens) {
    return undefined as T;
  }

  const variables: any = {};
  const rootStyle: CSSObject = {};
  const style: CSSObject = { ":root": rootStyle };

  Object.entries(tokens as T & {}).forEach(([scopeName, scope]) => {
    variables[scopeName] = {};
    Object.entries(scope).forEach(([tokenName, value]) => {
      const variableName = `--${sanitizeCSSVariableName(scopeName)}-${sanitizeCSSVariableName(tokenName)}`;
      variables[scopeName][tokenName] = `var(${variableName}, ${value})`;
      rootStyle[variableName] = value;
    });
  });

  insertGlobalStyle(style);

  return variables as T;
}

function sanitizeCSSVariableName(s: string) {
  return s.replace(/[^0-9a-zA-Z]/g, "-");
}

function insertGlobalStyle(style: CSSObject) {
  const styleContainer = document.createElement("div");
  const root = createRoot(styleContainer);
  root.render(createElement(createGlobalStyle(style)));
}

// Constants
////////////////////////////////////////////////////////////////////////////////

const aliases = {
  backgroundColor: "colors",
  borderBottomColor: "colors",
  borderColor: "colors",
  borderLeftColor: "colors",
  borderRightColor: "colors",
  caretColor: "colors",
  color: "colors",
  columnRuleColor: "colors",
  fill: "colors",
  outlineColor: "colors",
  stroke: "colors",

  borderBottomLeftRadius: "radii",
  borderBottomRightRadius: "radii",
  borderRadius: "radii",
  borderTopLeftRadius: "radii",
  borderTopRightRadius: "radii",

  boxShadow: "shadows",

  blockSize: "sizes",
  flexBasis: "sizes",
  height: "sizes",
  inlineSize: "sizes",
  maxBlockSize: "sizes",
  maxHeight: "sizes",
  maxInlineSize: "sizes",
  maxWidth: "sizes",
  minBlockSize: "sizes",
  minHeight: "sizes",
  minInlineSize: "sizes",
  minWidth: "sizes",
  width: "sizes",

  bottom: "space",
  columnGap: "space",
  gap: "space",
  gridGap: "space",
  gridRowGap: "space",
  inset: "space",
  insetBlock: "space",
  insetBlockEnd: "space",
  insetBlockStart: "space",
  insetInline: "space",
  insetInlineEnd: "space",
  insetInlineStart: "space",
  left: "space",
  margin: "space",
  marginBlock: "space",
  marginBlockEnd: "space",
  marginBlockStart: "space",
  marginBottom: "space",
  marginInline: "space",
  marginInlineEnd: "space",
  marginInlineStart: "space",
  marginLeft: "space",
  marginRight: "space",
  marginTop: "space",
  padding: "space",
  paddingBlock: "space",
  paddingBlockEnd: "space",
  paddingBlockStart: "space",
  paddingBottom: "space",
  paddingInline: "space",
  paddingInlineEnd: "space",
  paddingInlineStart: "space",
  paddingLeft: "space",
  paddingRight: "space",
  paddingTop: "space",
  right: "space",
  rowGap: "space",
  top: "space",
} as const;

// Types
////////////////////////////////////////////////////////////////////////////////

type AbstractConfig = {
  tokens?: {
    [scope: string]: { [token: string]: string };
  };
  utils?: {
    [property: string]: (value: any) => CSSObject;
  };
};

type AbstractThemedCSSProperties<Config extends AbstractConfig> = Omit<
  CSSProperties,
  keyof Aliases
> &
  (Config["tokens"] extends {}
    ? {
        [K in keyof Aliases]?:
          | keyof Config["tokens"][Aliases[K]]
          | (string & {})
          | number;
      }
    : {}) &
  (Config["utils"] extends {}
    ? {
        [K in keyof Config["utils"]]?: Config["utils"][K] extends (
          value: infer V
        ) => any
          ? V
          : never;
      }
    : {});

type AbstractThemedCSSObject<Config extends AbstractConfig> =
  | AbstractThemedCSSProperties<Config>
  | ({
      [selector: string]:
        | AbstractThemedCSSProperties<Config>
        | ({
            [selector: string]:
              | AbstractThemedCSSProperties<Config>
              | ({
                  [selector: string]: AbstractThemedCSSProperties<Config>;
                } & AbstractThemedCSSProperties<Config>);
          } & AbstractThemedCSSProperties<Config>);
    } & AbstractThemedCSSProperties<Config>);

type Aliases = typeof aliases;

type AbstractTheme<Config extends AbstractConfig> = (
  style: AbstractThemedCSSObject<Config>
) => CSSObject;

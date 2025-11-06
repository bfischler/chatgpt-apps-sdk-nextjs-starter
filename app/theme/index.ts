import Color from 'color';

import baseBreakpoints from './atoms/baseBreakpoints';
import baseColors from './atoms/baseColors';
import baseSizes from './atoms/baseSizes';
import baseSpace from './atoms/baseSpace';
import baseTextStyles from './atoms/baseTextStyles';
import { createTheme, ThemedCSSObjectFromThemed } from './createTheme';

export const alpha = (color: string, alpha: number) => Color(color).alpha(alpha).toString();

const space = {
  ...baseSpace,
  $modalPadding: baseSpace.$20,
  $modalGap: baseSpace.$14,
  $body1Gap: baseSpace.$6,
  $body1Padding: baseSpace.$8,
  $body2Gap: baseSpace.$6,
  $body2Padding: baseSpace.$8,
  $meta1Gap: baseSpace.$4,
  $meta1Padding: baseSpace.$6,
  $cellPadding: baseSpace.$8,
  '-$cellPadding': baseSpace['-$8'],
};

const sizes = {
  ...baseSizes,
  $headlineIcon: baseSizes.$24,
  $title1Icon: baseSizes.$20,
  $title2Icon: baseSizes.$20,
  $body1Icon: baseSizes.$16,
  $body2Icon: baseSizes.$16,
  $meta1Icon: baseSizes.$12,
  $meta2Icon: baseSizes.$12,
  $backgroundIcon: baseSizes.$64,
  $largeAvatar: baseSizes.$200,
};

const backgroundColors = {
  $negative: baseColors.red[500],
  $warning: baseColors.yellow[500],
  $positive: baseColors.green[500],
  $accent: baseColors.blue[500],
  $special: baseColors.purple[500],

  $accentHover: baseColors.blue[400],
  $specialHover: baseColors.purple[400],

  $surfaceBackground: 'white',
  $surfaceBackgroundHover: baseColors.gray[100],
  $sidebarBackground: baseColors.gray[100],
  $wash: baseColors.gray[200],
  $washHover: baseColors.gray[300],
  $negativeWash: baseColors.red[200],
  $warningWash: baseColors.yellow[200],
  $positiveWash: baseColors.green[200],
  $accentWash: baseColors.blue[200],
  $accentWashSoft: baseColors.blue[100],
  $specialWash: baseColors.purple[200],
  $orangeWash: baseColors.orange[200],
  $pinkWash: baseColors.pink[200],
  $darkSurfaceBackground: baseColors.gray[800],
  $surfaceBackgroundOverlay: alpha(baseColors.gray[200], 0.06),
  $darkSurfaceBgOverlay: Color(baseColors.gray[600]).lighten(0.1).string(),
  $darkWash: baseColors.gray[700],

  $specialCellBackground: baseColors.purple[100],
  $specialCellBackgroundHover: baseColors.purple[200],

  $warningLite: baseColors.yellow[300],
};

const alphaColors = {
  $accentAlpha10: alpha(baseColors.blue[500], 0.1),
  $accentAlpha20: alpha(baseColors.blue[500], 0.2),
  $accentAlpha30: alpha(baseColors.blue[500], 0.3),
  $accentAlpha40: alpha(baseColors.blue[500], 0.4),
  $accentAlpha50: alpha(baseColors.blue[500], 0.5),
  $accentAlpha60: alpha(baseColors.blue[500], 0.6),
  $accentAlpha70: alpha(baseColors.blue[500], 0.7),
  $accentAlpha80: alpha(baseColors.blue[500], 0.8),
  $accentAlpha90: alpha(baseColors.blue[500], 0.9),

  $warningAlpha10: alpha(baseColors.yellow[500], 0.1),
  $warningAlpha20: alpha(baseColors.yellow[500], 0.2),
  $warningAlpha30: alpha(baseColors.yellow[500], 0.3),
  $warningAlpha40: alpha(baseColors.yellow[500], 0.4),
  $warningAlpha50: alpha(baseColors.yellow[500], 0.5),
  $warningAlpha60: alpha(baseColors.yellow[500], 0.6),
  $warningAlpha70: alpha(baseColors.yellow[500], 0.7),
  $warningAlpha80: alpha(baseColors.yellow[500], 0.8),
  $warningAlpha90: alpha(baseColors.yellow[500], 0.9),

  $negativeAlpha10: alpha(baseColors.red[500], 0.1),
  $negativeAlpha20: alpha(baseColors.red[500], 0.2),
  $negativeAlpha30: alpha(baseColors.red[500], 0.3),
  $negativeAlpha40: alpha(baseColors.red[500], 0.4),
  $negativeAlpha50: alpha(baseColors.red[500], 0.5),
  $negativeAlpha60: alpha(baseColors.red[500], 0.6),
  $negativeAlpha70: alpha(baseColors.red[500], 0.7),
  $negativeAlpha80: alpha(baseColors.red[500], 0.8),
  $negativeAlpha90: alpha(baseColors.red[500], 0.9),

  $specialAlpha05: alpha(baseColors.purple[500], 0.05),
  $specialAlpha10: alpha(baseColors.purple[500], 0.1),

  $whiteAlpha20: alpha('#ffffff', 0.2),

  $surfaceAlpha80: alpha(baseColors.gray[100], 0.8),
};

const overlayColors = {
  $negativeOverlay: baseColors.red[800],
  $warningOverlay: baseColors.yellow[800],
  $positiveOverlay: baseColors.green[800],
  $accentOverlay: baseColors.blue[800],
  $specialOverlay: baseColors.purple[800],
  $lightOverlay: baseColors.gray[300],
  $darkOverlay: baseColors.gray[900],

  $surfaceBackgroundOverlay: baseColors.gray[200],
  $sidebarBackgroundOverlay: baseColors.gray[300],
  $washOverlay: baseColors.gray[400],
  $negativeWashOverlay: baseColors.red[400],
  $warningWashOverlay: baseColors.yellow[400],
  $positiveWashOverlay: baseColors.green[400],
  $accentWashOverlay: baseColors.blue[400],
  $specialWashOverlay: baseColors.purple[400],
  $darkSurfaceBackgroundOverlay: baseColors.gray[600],
};

const borderColors = {
  $divider: baseColors.gray[200],
  $stroke: baseColors.gray[300],
  $darkDivider: baseColors.gray[700],
};

export const textColors = {
  $primaryText: baseColors.gray[900],
  $secondaryText: baseColors.gray[600],
  $tertiaryText: baseColors.gray[400],
  $disabledText: baseColors.gray[400],
  $placeholderText: baseColors.gray[400],

  $negativeText: baseColors.red[700],
  $warningText: baseColors.yellow[700],
  $positiveText: baseColors.green[700],
  $accentText: baseColors.blue[500],
  $specialText: baseColors.purple[500],
  $orangeText: baseColors.orange[500],
  $pinkText: baseColors.pink[500],

  $darkPrimaryText: 'white',
  $darkSecondaryText: baseColors.gray[400],
  $darkDisabledText: baseColors.gray[600],
  $darkPlaceholderText: baseColors.gray[600],
};

/**
 * We generate all breakpoint media query util functions based on the baseBreakpoints sizes.
 */
const breakpoints: any = {};
Object.entries(baseBreakpoints).forEach(([key, value]) => {
  const breakpoint = `@media screen and (max-width: ${value})`;
  breakpoints[key] = (value: any) => ({ [breakpoint]: theme(value) });
});

/**
 * @deprecated these are for the old color lib
 */
export type ThemedColorType =
  | keyof typeof alphaColors
  | keyof typeof backgroundColors
  | keyof typeof overlayColors
  | keyof typeof borderColors
  | keyof typeof textColors;

export const { theme, tokens, utils } = createTheme({
  tokens: {
    colors: {
      ...alphaColors,
      ...backgroundColors,
      ...overlayColors,
      ...borderColors,
      ...textColors,
    },
    space,
    sizes,
    radii: {
      $input: '4px',
      $button: '4px',
      $popover: '8px',
      $modal: '8px',
      $pill: '999999px',
    },
    shadows: {
      $clickable: '0 0 1px rgba(0, 0, 0, 0.4), 0 1px 1px rgba(0, 0, 0, 0.15)',
      $draggable: '0 0 1px rgba(0, 0, 0, 0.5), 0 3px 5px rgba(0, 0, 0, 0.15)',
      $popover: '0 0 1px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.2)',
      $modal: '0 0 1px rgba(0, 0, 0, 0.5), 0 20px 40px rgba(0, 0, 0, 0.3)',
      $pinheader: '0px 0px 1px rgba(0, 0, 0, 0.5), 0px 8px 16px rgba(0, 0, 0, 0.2)',
      $pin: '0px 0px 1px rgba(0, 0, 0, 0.5), 0px 0px 16px rgba(0, 0, 0, 0.2)',
    },
  },
  utils: {
    marginX: (value: keyof typeof space | (string & {}) | number) => ({
      marginLeft: space[value as keyof typeof space] || value,
      marginRight: space[value as keyof typeof space] || value,
    }),
    marginY: (value: keyof typeof space | (string & {}) | number) => ({
      marginTop: space[value as keyof typeof space] || value,
      marginBottom: space[value as keyof typeof space] || value,
    }),
    paddingX: (value: keyof typeof space | (string & {}) | number) => ({
      paddingLeft: space[value as keyof typeof space] || value,
      paddingRight: space[value as keyof typeof space] || value,
    }),
    paddingY: (value: keyof typeof space | (string & {}) | number) => ({
      paddingTop: space[value as keyof typeof space] || value,
      paddingBottom: space[value as keyof typeof space] || value,
    }),
    size: (value: keyof typeof sizes | (string & {}) | number) => ({
      width: sizes[value as keyof typeof sizes] || value,
      height: sizes[value as keyof typeof sizes] || value,
    }),
    textStyle: (value: keyof typeof baseTextStyles) => baseTextStyles[value],
    backgroundColor: (value: keyof typeof backgroundColors | (string & {})) => ({
      backgroundColor: backgroundColors[value as keyof typeof backgroundColors] || value,
    }),
    activeOverlay: (value: keyof typeof overlayColors | (string & {})) => ({
      // These need to have some kind of unique selector because multiple
      // `:active` selectors will override each other
      '&:not(.activeOverlay)': {
        '&::after': {
          backgroundColor: overlayColors[value as keyof typeof overlayColors] || value,
          content: '""',
          height: '100%',
          left: 0,
          opacity: 0,
          position: 'absolute',
          pointerEvents: 'none',
          top: 0,
          transition: 'opacity 0.1s ease-in-out',
          width: '100%',
          willChange: 'opacity',
        },
        '&[type="button"]::after': {
          borderRadius: 6,
        },
        '&:hover': {
          '&::after': { opacity: 0.2 },
        },
        '&:active': {
          '&::after': { opacity: 0.4 },
        },
      },
    }),
    activeScale: (value: number | string) => ({
      // These need to have some kind of unique selector because multiple
      // `:active` selectors will override each other
      '&:not(.activeScale)': {
        transition: 'transform 0.1s ease-in-out',
        '&:active': {
          transform: `scale(${value})`,
        },
      },
    }),
    borderColor: (value: keyof typeof borderColors | (string & {})) => ({
      borderColor: borderColors[value as keyof typeof borderColors] || value,
    }),
    borderTopColor: (value: keyof typeof borderColors | (string & {})) => ({
      borderTopColor: borderColors[value as keyof typeof borderColors] || value,
    }),
    borderRightColor: (value: keyof typeof borderColors | (string & {})) => ({
      borderRightColor: borderColors[value as keyof typeof borderColors] || value,
    }),
    borderBottomColor: (value: keyof typeof borderColors | (string & {})) => ({
      borderBottomColor: borderColors[value as keyof typeof borderColors] || value,
    }),
    borderLeftColor: (value: keyof typeof borderColors | (string & {})) => ({
      borderLeftColor: borderColors[value as keyof typeof borderColors] || value,
    }),
    color: (value: keyof typeof textColors | (string & {})) => ({
      color: textColors[value as keyof typeof textColors] || value,
    }),
    /**
     * To use media queries, simply use a key of the device width that you're targeting
     * and write your CSS as you would regularly.
     *
     * You can find all device sizes in the baseBreakpoints atom.
     */
    ...breakpoints,
  },
});

export type ThemedCSSObject = ThemedCSSObjectFromThemed<typeof theme>;

import capsize from 'capsize';
import { CSSObject } from 'styled-components';

const getInterTextStyle = (capHeight: number, lineGap: number) => ({
  fontFamily: '"Inter", sans-serif',
  fontWeight: 400,
  ...capsize({
    fontMetrics: {
      capHeight: 2048,
      ascent: 2728,
      descent: -680,
      lineGap: 0,
      unitsPerEm: 2816,
    },
    capHeight,
    lineGap,
  }),
});

const getPlexMonoTextStyle = (capHeight: number, lineGap: number) => ({
  fontFamily: '"IBM Plex Mono", monospace',
  fontWeight: 400,
  ...capsize({
    fontMetrics: {
      capHeight: 698,
      ascent: 1025,
      descent: -275,
      lineGap: 0,
      unitsPerEm: 1000,
    },
    capHeight,
    lineGap,
  }),
});

const medium = (style: CSSObject) =>
  ({
    ...style,
    fontWeight: 500,
  }) as CSSObject;

const semibold = (style: CSSObject) =>
  ({
    ...style,
    fontWeight: 600,
  }) as CSSObject;

const $headline1 = getInterTextStyle(26, 14);
const $headline1Semibold = semibold($headline1);
const $headline2 = getInterTextStyle(17.5, 11.5);
const $headline2Semibold = semibold($headline2);
const $title1 = getInterTextStyle(14.5, 9.5);
const $title1Semibold = semibold($title1);
const $title2 = getInterTextStyle(13, 9);
const $title2Semibold = semibold($title2);
const $body1 = getInterTextStyle(11.5, 8.5);
const $body1Medium = medium($body1);
const $body2 = getInterTextStyle(10, 8);
const $body2Medium = medium($body2);
const $meta1 = getInterTextStyle(8.5, 7.5);
const $meta1Medium = medium($meta1);
const $meta2 = getInterTextStyle(7.25, 6.75);
const $meta2Medium = medium($meta2);

const $body1Mono = getPlexMonoTextStyle(11, 9);
const $body2Mono = getPlexMonoTextStyle(10, 8);
const $meta1Mono = getPlexMonoTextStyle(8.5, 7.5);
const $meta2Mono = getPlexMonoTextStyle(7, 7);

const textStyles = {
  $headline1,
  $headline1Semibold,
  $headline2,
  $headline2Semibold,
  $title1,
  $title1Semibold,
  $title2,
  $title2Semibold,
  $body1,
  $body1Medium,
  $body2,
  $body2Medium,
  $meta1,
  $meta1Medium,
  $meta2,
  $meta2Medium,

  $body1Mono,
  $body2Mono,
  $meta1Mono,
  $meta2Mono,
};

export default textStyles;

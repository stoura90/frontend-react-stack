// @flow
import { map, pipe, replace } from "ramda";
import breakpointsWithPx from "Src/styles/_settings.breakpoints.scss";

const stripPx = pipe(
  replace("px", ""),
  parseInt
);

const breakpoints = map(stripPx, breakpointsWithPx);

const devices = {
  [breakpoints.mobile]: "iphone6",
  [breakpoints.phablet]: "pixelxl",
  [breakpoints.tablet]: "ipad",
  [breakpoints.desktop]: "responsive",
};

const makeConfig = (size: number) => ({
  chromatic: {
    viewports: [size],
  },
  viewport: {
    defaultViewport: devices[size],
  },
});

export const viewports = map(makeConfig, breakpoints);

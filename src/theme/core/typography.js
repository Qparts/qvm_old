import { pxToRem } from 'src/utils/formatFontSize';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { store } from 'src/redux/store'

// ----------------------------------------------------------------------

function responsiveFontSizes({ sm, md, lg }) {
  const breakpoints = createBreakpoints({});

  return {
    [breakpoints.up('sm')]: {
      fontSize: pxToRem(sm)
    },
    [breakpoints.up('md')]: {
      fontSize: pxToRem(md)
    },
    [breakpoints.up('lg')]: {
      fontSize: pxToRem(lg)
    }
  };
}

let FONT_PRIMARY

store.subscribe(() => {
  FONT_PRIMARY = store.getState().settings.themeDirection
  if (typography) {
    typography.fontFamily = FONT_PRIMARY === 'rtl' ? 'Tajawal, sans-serif' : 'Roboto, Helvetica, Arial, sans-serif';
  }
})

let typography = {
  fontFamily: FONT_PRIMARY === 'rtl' ? 'Tajawal, sans-serif' : 'Roboto, Helvetica, Arial, sans-serif',
  fontWeightRegular: 500,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  generalPadding: '20px',
  h1: {
    fontWeight: 600,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 })
  },
  h2: {
    fontWeight: 600,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 })
  },
  h3: {
    lineHeight: 1.5,
    fontWeight: 600,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 })
  },
  h4: {
    lineHeight: 1.5,
    fontWeight: 600,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 })
  },
  h5: {
    lineHeight: 1.5,
    fontWeight: 600,
    fontSize: pxToRem(17.2),
    ...responsiveFontSizes({ sm: 18.2, md: 19.2, lg: 19.2 })
  },
  h6: {
    fontWeight: 600,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 })
  },
  subtitle1: {
    fontSize: pxToRem(17),
    lineHeight: 1.5,
    fontWeight: 600
  },
  subtitle2: {
    fontSize: pxToRem(14),
    lineHeight: 22 / 14,
    fontWeight: 500
  },
  body1: {
    fontSize: pxToRem(16),
    lineHeight: 1.5
  },
  body2: {
    fontSize: pxToRem(14),
    lineHeight: 22 / 14
  },
  body3: {
    fontSize: pxToRem(15),
    lineHeight: 1.5
  },
  body4: {
    fontSize: pxToRem(13),
    lineHeight: 1.5
  },
  caption: {
    fontSize: pxToRem(12),
    lineHeight: 1.5
  },
  overline: {
    fontSize: pxToRem(12),
    lineHeight: 1.5,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: 'uppercase'
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize'
  }
};

export default typography;

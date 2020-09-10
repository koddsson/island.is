import { styleMap, style, globalStyle } from 'treat'
import * as CSS from 'csstype'
import { themeUtils, Theme, theme } from '@island.is/island-ui/theme'
import { mapToStyleProperty } from '../../utils'
import { responsiveStyleMap } from '../../utils/responsiveStyleMap'
import mapValues from 'lodash/mapValues'

type Spacing = Record<keyof typeof theme.spacing, string>
type Breakpoint = keyof Theme['breakpoints']

export type VariantTypes =
  | 'p'
  | 'pSmall'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'intro'
  | 'eyebrow'
  | 'tag'
  | 'cardCategoryTitle'
  | 'sideMenu'
  | 'placeholderText'
  | 'datepickerHeaderText'

type ResponsiveProps<T> = {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
}

type Variants = {
  [Type in VariantTypes]: CSS.Properties<
    string | ResponsiveProps<string | number>
  >
}

const makePaddingBottom = (breakpoint: Breakpoint) =>
  styleMap(
    mapValues(theme.spacing, (space) =>
      themeUtils.responsiveStyle({ [breakpoint]: { paddingBottom: space } }),
    ),
    `paddingBottom_${breakpoint}`,
  ) as Spacing

const makePaddingTop = (breakpoint: Breakpoint) =>
  styleMap(
    mapValues(theme.spacing, (space) =>
      themeUtils.responsiveStyle({ [breakpoint]: { paddingTop: space } }),
    ),
    `paddingTop_${breakpoint}`,
  ) as Spacing

export const spacing = {
  paddingBottomXs: makePaddingBottom('xs'),
  paddingBottomSm: makePaddingBottom('sm'),
  paddingBottomMd: makePaddingBottom('md'),
  paddingBottomLg: makePaddingBottom('lg'),
  paddingBottomXl: makePaddingBottom('xl'),
  paddingTopXs: makePaddingTop('xs'),
  paddingTopSm: makePaddingTop('sm'),
  paddingTopMd: makePaddingTop('md'),
  paddingTopLg: makePaddingTop('lg'),
  paddingTopXl: makePaddingTop('xl'),
}

export const truncate = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const variants: Variants = {
  h1: {
    fontSize: {
      xs: 32,
      md: 42,
    },
    fontWeight: theme.typography.headingsFontWeight,
    lineHeight: 1.238095,
  },
  h2: {
    fontSize: {
      xs: 26,
      md: 34,
    },
    fontWeight: theme.typography.headingsFontWeight,
    lineHeight: 1.294118,
  },
  h3: {
    fontSize: {
      xs: 20,
      md: 24,
    },
    fontWeight: theme.typography.headingsFontWeight,
    lineHeight: 1.416667,
  },
  h4: {
    fontSize: {
      xs: 18,
      md: 20,
    },
    fontWeight: theme.typography.headingsFontWeight,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: {
      xs: 15,
      md: 18,
    },
    fontWeight: theme.typography.headingsFontWeight,
    lineHeight: 1.5,
  },
  p: {
    fontSize: {
      xs: 15,
      md: 18,
    },
    fontWeight: theme.typography.light,
    lineHeight: 1.5,
  },
  pSmall: {
    fontSize: {
      xs: 12,
      md: 15,
    },
    fontWeight: theme.typography.regular,
    lineHeight: 1.666,
  },
  intro: {
    fontSize: {
      xs: 20,
      md: 24,
    },
    fontWeight: theme.typography.light,
    lineHeight: 1.416667,
  },
  eyebrow: {
    fontSize: {
      xs: 12,
      md: 14,
    },
    fontWeight: theme.typography.medium,
    lineHeight: 1.142857,
  },
  tag: {
    fontSize: {
      xs: 12,
      md: 14,
    },
    fontWeight: theme.typography.semiBold,
    lineHeight: 1.142857,
  },
  cardCategoryTitle: {
    fontSize: {
      xs: 20,
      md: 24,
    },
    fontWeight: theme.typography.headingsFontWeight,
    lineHeight: 1.416667,
  },
  sideMenu: {
    fontSize: {
      xs: 16,
      md: 18,
    },
    fontWeight: theme.typography.medium,
    lineHeight: 1.55,
  },
  placeholderText: {
    fontSize: {
      xs: 20,
      md: 24,
    },
    fontWeight: theme.typography.light,
    lineHeight: 1.416667,
  },
  datepickerHeaderText: {
    fontSize: {
      xs: 18,
      md: 20,
    },
    fontWeight: theme.typography.semiBold,
    lineHeight: 1.666,
  },
}

export const links = style({
  cursor: 'pointer',
})

globalStyle(`${links} a`, {
  color: theme.color.blue400,
  transition: 'color .2s, box-shadow .2s',
  textDecoration: 'none',
  boxShadow: `inset 0 -1px 0 0 ${theme.color.blue400}`,
})

globalStyle(`${links} a:hover`, {
  color: theme.color.blueberry400,
  boxShadow: `inset 0 -2px 0 0 ${theme.color.blueberry400}`,
  textDecoration: 'none',
})

globalStyle(`${links} a svg path`, {
  transition: 'fill .2s, box-shadow .2s',
  fill: theme.color.blue400,
})

globalStyle(`${links} a:hover svg path`, {
  fill: theme.color.blueberry400,
})

export const colors = styleMap(mapToStyleProperty(theme.color, 'color'))

export default (Object.keys(variants) as VariantTypes[]).reduce(
  (acc, variantKey) => {
    acc[variantKey] = responsiveStyleMap(variants[variantKey])
    return acc
  },
  {} as {
    [Type in VariantTypes]: string
  },
)

import { style } from 'treat'
import { theme } from '@island.is/island-ui/theme'

export const menu = style({
  padding: 0,
  margin: 0,
  width: '100%',
  position: 'absolute',
  backgroundColor: theme.color.white,
  maxHeight: 455,
  overflowY: 'auto',
  outline: 0,
  opacity: 0,
  borderColor: theme.color.mint400,
  borderWidth: 3,
  borderStyle: 'solid',
  borderTopWidth: 0,
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
})

export const open = style({
  zIndex: 1,
  opacity: 1,
})

export const hidden = style({
  visibility: 'hidden',
})

import { colors, font, fontSize, spacing } from '../../settings'

import { StyleSheet } from 'react-native'

export const HeadlineStyle = StyleSheet.create({
  base: {
    color: colors.$black,
    marginVertical: spacing.$s
  },
  $xl: {
    fontSize: fontSize.$xl,
    fontFamily: font.$primary__bold
  },
  $l: {
    fontSize: fontSize.$l,
    fontFamily: font.$primary__light
  },
  $m: {
    fontSize: fontSize.$m,
    fontFamily: font.$primary__light
  },
  $s: {
    fontSize: fontSize.$s,
    fontFamily: font.$text__light
  },
  $xs: {
    fontSize: fontSize.$xs,
    fontFamily: font.$text__light
  }
})
